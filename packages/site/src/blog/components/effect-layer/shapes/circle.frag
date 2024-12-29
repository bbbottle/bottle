uniform vec2 uMouse;

vec4 sdfCircle(vec2 uv, float r, vec2 center) {
    float x = uv.x;
    float y = uv.y;

    float d = distance(vec2(x, y), center) - r;

    return d > 0. ? DefaultColor : vec4(1.0, 0.0, 1.0, 1.0);
}

vec4 sdfSquare(vec2 uv, vec4 rect) {
    float x = uv.x;
    float y = uv.y;

    float dx = max(abs(x - rect.x) - rect.z, 0.);
    float dy = max(abs(y - rect.y) - rect.w, 0.);

    float d = max(dx, dy);

    return d > 0. ? DefaultColor : vec4(1.0, 0.0, 1.0, 1.0);

}

void drawCircleUnderMouse(vec2 uv, float r) {
    // flip uMouse vertically
    vec2 normalizedMouse = vec2(uMouse.x, uResolution.y - uMouse.y) * uDevicePixelRatio / uResolution;

    // sdfCircle transition to sdfSquare

    // gl_FragColor = sdfSquare(uv, vec4(normalizedMouse, 0.1, 0.1));
}
