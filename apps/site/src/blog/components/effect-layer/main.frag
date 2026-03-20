precision mediump float;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uDevicePixelRatio;

#define DefaultColor vec4(0.0, 0.0, 0.0, 0.0)

#include "effects/grain.frag"
#include "effects/paper.frag"
#include "effects/spiral.frag"
//#include "shapes/circle.frag"


void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // set default color
  gl_FragColor = DefaultColor;

  // draw paper texture (base layer)
  drawPaperTexture(uv);

  // draw grain on nav
  drawGrain(uv);

  // draw loading spiral
  drawSpiral(uv);
}
