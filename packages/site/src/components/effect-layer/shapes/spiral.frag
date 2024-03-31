void cosCurve(vec2 uv) {
    float curve = 0.1 * cos((19.25 * uv.x + 3.141592654 * 0.5) + (2.0 * uProgress));

    vec2 p = uv - 0.5;

    float d = length(p);

    gl_FragColor = d > curve ? vec4(1.0) : vec4(0.0);

}

void spiral(vec2 uv) {
    cosCurve(uv);
}
