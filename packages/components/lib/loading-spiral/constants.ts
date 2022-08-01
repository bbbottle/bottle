export enum ATTR {
  PERCENT = "aPercent",
  POINT_SIZE = 'aPointSize'
}

export const VERTEX_SHADER = `
  attribute float ${ATTR.PERCENT};
  attribute float ${ATTR.POINT_SIZE};

  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform float uProgress;

  varying vec3 vColor;
  
  vec3 curve(float _percent, float _length) {
    const float PI2 = 3.141592653589793 * 2.0;
    float radius = 0.028 / 0.15 * _length;

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

  mat4 rotateX(float _angle){
    return mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, cos(_angle), -sin(_angle), 0.0,
      0.0, sin(_angle), cos(_angle), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
  }

  void main(){
    gl_Position = uProjectionMatrix
     * uModelMatrix
     * uViewMatrix
     * rotateX(uProgress)
     * vec4(curve(${ATTR.PERCENT}, 0.8), 1.0);

    gl_PointSize = ${ATTR.POINT_SIZE};
  }
`;

export const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uProgress;
  void main(){
    gl_FragColor = vec4(0.81, 0.83, 0.85, 1.0);
  }
`;
