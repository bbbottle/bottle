float rand(vec2 co){
    return fract(
        sin(
            dot(
                co.xy,
                vec2(12.9898, 78.233)
            )
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
        rand(uv * abs(sin(uProgress))) * 0.09,
        rand(uv * abs(sin(uProgress))) * 0.09,
        rand(uv * abs(sin(uProgress))) * 0.09,
        rand(uv * abs(sin(uProgress)))
    );

    vec4 result = grain(color, uv);
    result.a *= 0.8;

    return result;
}

void drawGrainOnNav(vec2 uv) {
    float navHeight = 64. * uDevicePixelRatio / uResolution.y;

    if (1. * uDevicePixelRatio - uv.y < navHeight) {
        gl_FragColor = randGrain(uv);
    }
}

