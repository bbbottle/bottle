/**
 * 设备指纹采集器
 * 基于浏览器静态特征生成稳定标识，用于匿名身份识别和反滥用
 */
export interface FingerprintData {
  hash: string; // 主要指纹哈希
  components: FingerprintComponents;
  confidence: number; // 0-1 唯一性置信度
  generatedAt: number;
}

export interface FingerprintComponents {
  // 基础环境
  userAgent: string;
  language: string;
  timezone: string;
  platform: string;
  cookieEnabled: boolean;

  // 硬件特征
  hardwareConcurrency: number;
  deviceMemory?: number;
  maxTouchPoints: number;

  // 屏幕特征
  screenResolution: string;
  screenColorDepth: number;
  pixelRatio: number;
  viewportSize: string;

  // 渲染特征（高熵值）
  canvas: string;
  webgl: WebGLInfo;
  fonts: string[];

  // 高级特征
  audio?: string;
  webdriver: boolean;
}

interface WebGLInfo {
  vendor: string;
  renderer: string;
  version: string;
  shadingLanguageVersion: string;
  params: Record<string, string>;
}

// 稳定哈希函数（FNV-1a 64位变体）
function fnv1a64(str: string): string {
  let h1 = 0xdeadbeef,
    h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x01000193);
    h2 = Math.imul(h2 ^ ch, 0x01000197);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 0x85ebca6b);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 0xc2b2ae35);
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}

// Canvas 指纹（跨显卡渲染差异）
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 'no-2d-context';

    canvas.width = 280;
    canvas.height = 60;

    // 背景渐变（测试颜色插值）
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f44336');
    grad.addColorStop(0.5, '#2196f3');
    grad.addColorStop(1, '#4caf50');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 复杂文本渲染（测试字体和抗锯齿）
    ctx.textBaseline = 'alphabetic';
    ctx.font = 'bold 20px "Arial", "Helvetica", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('DeviceFingerprint 设备指纹', 10, 35);

    // 几何图形（测试路径渲染）
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(240, 30, 15, 0, Math.PI * 2);
    ctx.stroke();

    // 像素级噪声（测试混合模式）
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(50, 10, 30, 40);

    return canvas.toDataURL('image/png').slice(-64); // 取数据签名部分
  } catch (e) {
    return `error:${(e as Error).message}`;
  }
}

// WebGL 指纹（显卡型号和驱动）
function getWebGLInfo(): WebGLInfo {
  const result: WebGLInfo = {
    vendor: 'unknown',
    renderer: 'unknown',
    version: 'unknown',
    shadingLanguageVersion: 'unknown',
    params: {},
  };

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return result;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      result.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'unknown';
      result.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown';
    }

    result.version = gl.getParameter(gl.VERSION) || 'unknown';
    result.shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION) || 'unknown';

    // 采集关键参数
    const params = [
      'MAX_TEXTURE_SIZE',
      'MAX_VIEWPORT_DIMS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
    ];

    params.forEach(p => {
      try {
        const val = gl.getParameter((gl as any)[p]);
        result.params[p] = Array.isArray(val) ? val.join(',') : String(val);
      } catch {
        result.params[p] = 'unsupported';
      }
    });
  } catch (e) {
    result.vendor = `error:${(e as Error).message}`;
  }

  return result;
}

// 字体枚举（系统字体差异）
function getFontList(): string[] {
  const baseFonts = ['monospace', 'sans-serif', 'serif', 'Arial'];
  const testFonts = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Impact',
    'Gill Sans',
    'Candara',
    'Optima',
    'Geneva',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    '-apple-system',
    'BlinkMacSystemFont',
    'PingFang SC',
    'Microsoft YaHei',
    'WenQuanYi Micro Hei',
    'Noto Sans CJK SC',
    'Source Han Sans SC',
  ];

  const testString = 'mmmmmmmmlliWWWwwwwww';
  const testSize = '72px';
  const detected: string[] = [];

  const span = document.createElement('span');
  span.style.cssText = `position:absolute;left:-9999px;font-size:${testSize};line-height:normal;`;
  span.textContent = testString;
  document.body.appendChild(span);

  const defaultWidths: Record<string, number> = {};
  baseFonts.forEach(base => {
    span.style.fontFamily = base;
    defaultWidths[base] = span.offsetWidth;
  });

  testFonts.forEach(font => {
    baseFonts.forEach(base => {
      span.style.fontFamily = `"${font}",${base}`;
      if (span.offsetWidth !== defaultWidths[base] && !detected.includes(font)) {
        detected.push(font);
      }
    });
  });

  document.body.removeChild(span);
  return detected.sort();
}

// 音频指纹（频率响应差异）
async function getAudioFingerprint(): Promise<string | undefined> {
  try {
    const AudioContext = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
    if (!AudioContext) return undefined;

    const ctx = new AudioContext(1, 44100, 44100);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const compressor = ctx.createDynamicsCompressor();

    osc.type = 'triangle';
    osc.frequency.value = 1000;

    // 压缩器配置
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    osc.connect(compressor);
    compressor.connect(gain);
    gain.connect(ctx.destination);

    osc.start(0);
    gain.gain.setValueAtTime(0, 0);
    gain.gain.linearRampToValueAtTime(1, 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, 0.5);
    osc.stop(0.5);

    const buffer = await ctx.startRendering();
    const channel = buffer.getChannelData(0);

    // 取特征片段哈希
    let hash = 0;
    for (let i = 4500; i < 4600; i++) {
      hash = Math.imul(hash ^ Math.round(channel[i] * 10000), 0x5bd1e995);
    }
    return hash.toString(16);
  } catch {
    return undefined;
  }
}

// 主采集函数
async function getFingerprint(): Promise<FingerprintData> {
  const components: Partial<FingerprintComponents> = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    screenResolution: `${screen.width}x${screen.height}`,
    screenColorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    webdriver: navigator.webdriver || false,
  };

  // 同步特征
  components.canvas = getCanvasFingerprint();
  components.webgl = getWebGLInfo();
  components.fonts = getFontList();

  // 异步特征（音频）
  components.audio = await getAudioFingerprint();

  // 计算熵值并哈希
  const hashStr = JSON.stringify(components, Object.keys(components).sort());
  const hash = fnv1a64(hashStr);

  // 置信度计算（特征丰富度）
  let confidence = 0.5;
  if (components.webgl.renderer !== 'unknown') confidence += 0.2;
  if (components.audio) confidence += 0.15;
  if (components.fonts.length > 10) confidence += 0.1;
  if (components.hardwareConcurrency! > 0) confidence += 0.05;

  return {
    hash,
    components: components as FingerprintComponents,
    confidence: Math.min(confidence, 0.99),
    generatedAt: Date.now(),
  };
}

// 稳定设备 ID（结合指纹与存储）
export async function getStableDeviceId(): Promise<{ id: string; fp: FingerprintData }> {
  const STORAGE_KEY = '__anon_device_id__';

  // 尝试读取已存储
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // 30天内有效且同一浏览器（简单UA匹配）
      if (
        Date.now() - parsed.ts < 30 * 86400 * 1000 &&
        parsed.ua === navigator.userAgent.slice(0, 50)
      ) {
        return { id: parsed.id, fp: await getFingerprint() };
      }
    } catch {
      /* 解析失败则重新生成 */
    }
  }

  // 生成新ID
  const fp = await getFingerprint();
  const id = fp.hash.slice(0, 16);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      id,
      ts: Date.now(),
      ua: navigator.userAgent.slice(0, 50),
    })
  );

  return { id, fp };
}
