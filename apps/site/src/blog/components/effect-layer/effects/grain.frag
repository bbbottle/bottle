// Integer-based hash, stable on mediump float and immune to precision loss
float rand(vec2 co) {
    vec2 seed = co * uResolution + fract(uProgress * vec2(12.453, 78.379));
    vec3 p = fract(vec3(seed.xyx) * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}

vec4 randGrain(vec2 uv) {
    float n = rand(uv);
    float intensity = (n - 0.5) * 0.05;
    return vec4(vec3(0.0), abs(intensity) + 0.02);
}

void drawGrain(vec2 uv) {
    vec4 grain = randGrain(uv);
    gl_FragColor = grain + gl_FragColor * (1.0 - grain.a);
}
