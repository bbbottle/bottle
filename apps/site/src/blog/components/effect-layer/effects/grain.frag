float rand(vec2 co){
    return fract(
        sin(
            dot(
                co.xy,
                vec2(12.9898, 78.233) * 2.
            ) * uProgress
        ) * 43758.5453
    );
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
    vec4 color = vec4(
        rand(uv) * 0.1,
        rand(uv) * 0.1,
        rand(uv) * 0.1,
        0.1
    );

    vec4 result = grain(color, uv) * 0.4;

    result.a *= 0.2;

    return result;
}

void drawGrainOnNav(vec2 uv) {
//    float navHeight = 64. * uDevicePixelRatio / uResolution.y;
//
//    if (1. - uv.y < navHeight) {
        gl_FragColor = randGrain(uv);
//    }
}

