import { useRef } from 'react';
import { useMousePosition } from '@/hooks/use_mouse_position';

// Watermark layout constants (must match watermark.frag)
const WM_PAD_X = 16;
const WM_PAD_Y = 16;
const WM_SCALE = 2;
const WM_CHAR_W = 4 * WM_SCALE; // 8
const WM_CHAR_H = 5 * WM_SCALE; // 10
const WM_GAP = 3;
const WM_CELL_W = WM_CHAR_W + WM_GAP; // 11

// Git hash line (bottom): 7 chars
const WM_N_CHARS = 7;
const WM_TOTAL_W = WM_N_CHARS * WM_CELL_W - WM_GAP; // 74

// Fingerprint line (above): 16 chars
const FP_N_CHARS = 16;
const FP_TOTAL_W = FP_N_CHARS * WM_CELL_W - WM_GAP; // 173
const LINE_GAP = 6; // vertical gap between lines

// Combined bounds
const MAX_W = Math.max(WM_TOTAL_W, FP_TOTAL_W);
const TOTAL_H = WM_CHAR_H * 2 + LINE_GAP; // 26

const WM_HOVER_PADDING = 4; // extra hit-area padding (px)
const WM_HOVER_SPEED = 0.06; // ~0→1 in 17 frames (~280ms at 60fps)

export const useWatermarkHover = () => {
  const pos = useMousePosition();
  const hoverRef = useRef(0);

  const updateWatermarkHover = (inst: any) => {
    // Detect mouse inside watermark bounding box (CSS pixels)
    const viewportH = inst.gl.canvas.height / window.devicePixelRatio;
    const mx = pos.current.x;
    const my = pos.current.y;
    // Convert clientY (top-down) to GL-style bottom-up for comparison
    const myFromBottom = viewportH - my;

    // The fingerprint line is above the git hash line
    // Git hash starts at WM_PAD_Y from bottom
    // Fingerprint starts at WM_PAD_Y + WM_CHAR_H + LINE_GAP from bottom
    const fpPadY = WM_PAD_Y + WM_CHAR_H + LINE_GAP;
    const maxPadY = Math.max(WM_PAD_Y, fpPadY);

    const inWatermark =
      mx >= WM_PAD_X - WM_HOVER_PADDING &&
      mx <= WM_PAD_X + MAX_W + WM_HOVER_PADDING &&
      myFromBottom >= WM_PAD_Y - WM_HOVER_PADDING &&
      myFromBottom <= maxPadY + WM_CHAR_H + WM_HOVER_PADDING;

    if (inWatermark) {
      hoverRef.current = Math.min(1, hoverRef.current + WM_HOVER_SPEED);
    } else {
      hoverRef.current = Math.max(0, hoverRef.current - WM_HOVER_SPEED);
    }

    inst.uniforms.uWatermarkHover.value[0] = hoverRef.current;
  };

  return { updateWatermarkHover };
};
