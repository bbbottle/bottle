precision mediump float;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uDevicePixelRatio;

#define DefaultColor vec4(0.0, 0.0, 0.0, 0.0)

#include "effects/grain.frag"
#include "effects/paper.frag"
#include "effects/spiral.frag"


void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  gl_FragColor = DefaultColor;

  drawPaperTexture(uv);

  drawGrain(uv);

  drawSpiral(uv);
}
