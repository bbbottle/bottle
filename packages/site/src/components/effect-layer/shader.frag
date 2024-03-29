precision mediump float;

uniform vec2 uResolution;
uniform float uProgress;
uniform float uDevicePixelRatio;

float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec4 grain(vec4 fragColor, vec2 uv){
  vec4 color = fragColor;
  float diff = (rand(uv) - 0.0) * 0.09;
  color.r += diff;
  color.g += diff;
  color.b += diff;
  return color;
}

vec4 randGrain(vec2 uv) {
  vec4 color = vec4(0.0, 0.0, 0.0, 0.1);
  color.a = rand(uv + uProgress) * 0.1;
  return grain(color, uv);
}

void main() {
  vec2 uv = gl_FragCoord.xy/uResolution;

  float navHeight = 64. * uDevicePixelRatio / uResolution.y;

  if (uv.y <= navHeight) {
      gl_FragColor = randGrain(uv);
  } else {
      gl_FragColor = vec4(0., 0., 0., 0.);
  }

}
