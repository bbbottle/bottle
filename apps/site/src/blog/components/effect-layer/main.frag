precision highp float;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uDevicePixelRatio;

#define DefaultColor vec4(0.0, 0.0, 0.0, 0.0)

#include "effects/grain.frag"
#include "effects/paper.frag"
#include "effects/spiral.frag"
#include "effects/watermark.frag"


void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  gl_FragColor = DefaultColor;

  drawWatermark(uv);

  drawPaperTexture(uv);

  drawGrain(uv);

  drawSpiral(uv);
}
