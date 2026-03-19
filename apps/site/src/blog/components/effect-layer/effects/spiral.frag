uniform float uLoading;
uniform float uSpiralProgress;
uniform float uSpiralOpacity;

const float PI2 = 3.141592653589793 * 2.0;

vec3 spiralCurve(float _percent) {
  const float _length = 0.3;
  const float radius = 0.056;
  float t = mod(_percent, 0.25) / 0.25;
  t = mod(_percent, 0.25) - (2.0 * (1.0 - t) * t * -0.0185 + t * t * 0.25);
  float x = _length * sin(PI2 * _percent);
  float y = radius * cos(PI2 * 3.0 * _percent);

  if (
    floor(_percent / 0.25) == 0.0
    || floor(_percent / 0.25) == 2.0
  ) {
    t = t * -1.0;
  }
  float z = radius * sin(PI2 * 2.0 * (_percent - t));
  return vec3(x, y, z);
}

vec3 rotateXVec3(vec3 v, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    v.x,
    v.y * c - v.z * s,
    v.y * s + v.z * c
  );
}

void drawSpiral(vec2 uv) {
  if (uLoading < 0.5) {
    return;
  }

  float aspect = uResolution.x / uResolution.y;
  vec2 center = vec2(0.5, 0.6);
  vec2 p = uv - center;
  p.x *= aspect;

  // Clamp scale so the spiral never grows beyond ~480px equivalent
  float maxSpiralPx = 480.0;
  float baseScale = 4.0;
  float minDim = min(uResolution.x, uResolution.y) / uDevicePixelRatio;
  float scale = max(baseScale, minDim / maxSpiralPx * baseScale);
  p *= scale;

  // early exit: spiral fits within radius ~0.35 in curve space
  if (length(p) > 0.5) {
    return;
  }

  float minDist = 1.0;

  const int SAMPLES = 80;
  vec2 prevProjected;
  for (int i = 0; i < SAMPLES; i++) {
    float pct = float(i) / float(SAMPLES);
    vec3 pos3d = spiralCurve(pct);
    vec3 rotated = rotateXVec3(pos3d, uSpiralProgress);
    vec2 projected = rotated.xy;

    if (i > 0) {
      // distance from point to line segment
      vec2 ab = projected - prevProjected;
      vec2 ap = p - prevProjected;
      float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
      vec2 closest = prevProjected + t * ab;
      float d = distance(p, closest);
      minDist = min(minDist, d);
    }

    prevProjected = projected;
  }

  // close the loop: connect last sample back to first
  vec3 firstPos = spiralCurve(0.0);
  vec3 firstRotated = rotateXVec3(firstPos, uSpiralProgress);
  vec2 firstProjected = firstRotated.xy;
  vec2 ab = firstProjected - prevProjected;
  vec2 ap = p - prevProjected;
  float tc = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
  vec2 closest = prevProjected + tc * ab;
  float dc = distance(p, closest);
  minDist = min(minDist, dc);

  float lineWidth = 0.005;
  float alpha = 1.0 - smoothstep(0.0, lineWidth, minDist);

  float spiralAlpha = alpha * 0.8 * uSpiralOpacity;
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.0), spiralAlpha);
  gl_FragColor.a = max(gl_FragColor.a, spiralAlpha);
}
