// Fine book paper texture — static, subtle fiber pattern
// Simulates delicate diffuse micro-fiber scattering on white paper

float paperHash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(443.897, 441.423, 437.195));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

float paperNoise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    // smooth interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = paperHash(i);
    float b = paperHash(i + vec2(1.0, 0.0));
    float c = paperHash(i + vec2(0.0, 1.0));
    float d = paperHash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// fBm with 5 octaves for dense, fine fiber detail
float paperFBM(vec2 uv) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
        value += amplitude * paperNoise(uv);
        uv *= 2.5;
        amplitude *= 0.4;
    }
    return value;
}

void drawPaperTexture(vec2 uv) {
    // Scale to physical pixels so texture density stays consistent across screens
    vec2 texCoord = uv * uResolution / uDevicePixelRatio;

    // Single high-frequency FBM — fine, uniform, no visible banding
    float fiber = paperFBM(texCoord * 3.0);

    // abs() for full symmetric coverage; low multiplier as quiet base layer
    float alpha = abs(fiber - 0.5) * 0.05;

    // Soft neutral gray (premultiplied) instead of pure black — avoids dirty look
    float tone = 0.55;
    vec4 paper = vec4(vec3(tone * alpha), alpha);
    gl_FragColor = paper + gl_FragColor * (1.0 - alpha);
}
