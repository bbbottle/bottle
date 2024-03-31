precision mediump float;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uDevicePixelRatio;
uniform vec2 uCenter;
uniform vec2 uOffset;

#define DefaultColor vec4(0.0, 0.0, 0.0, 0.0)
#define CenterPos uCenter * uDevicePixelRatio / uResolution

#include "effects/grain.frag"
//#include "shapes/circle.frag"


void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // set default color
  gl_FragColor = DefaultColor;

  // draw circle on mouse
  // drawCircleUnderMouse(uv, 0.05);

  // draw grain on nav
  drawGrainOnNav(uv);
}
