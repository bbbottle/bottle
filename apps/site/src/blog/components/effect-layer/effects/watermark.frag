// Bitmap-font watermark — 4×5 pixel hex glyphs (0-9, a-f)
// Rendered at the bottom-left corner; meant to be drawn BEFORE grain
// so that film-grain noise is composited on top of the text.

uniform vec4 uHashChars;   // hex digit values for chars 0–3 (each 0.0–15.0)
uniform vec4 uHashChars2;  // hex digit values for chars 4–6 (.w unused)

// Each glyph is a 4-wide × 5-tall bitmap packed into 20 bits of a float.
// Bit layout (MSB → LSB): row0-col0 … row0-col3, row1-col0 … row4-col3
// Row 0 = top of glyph.  Requires highp for exact integer representation.

highp float charBitmap(float c) {
    //        .##.  #..#  #..#  #..#  .##.
    if (c < 0.5)  return 432534.0;  // 0
    //        .#..  ##..  .#..  .#..  ###.
    if (c < 1.5)  return 312398.0;  // 1
    //        .##.  #..#  ..#.  .#..  ####
    if (c < 2.5)  return 430671.0;  // 2
    //        ###.  ...#  .##.  ...#  ###.
    if (c < 3.5)  return 923166.0;  // 3
    //        #..#  #..#  ####  ...#  ...#
    if (c < 4.5)  return 630545.0;  // 4
    //        ####  #...  ###.  ...#  ###.
    if (c < 5.5)  return 1019422.0; // 5
    //        .##.  #...  ###.  #..#  .##.
    if (c < 6.5)  return 429718.0;  // 6
    //        ####  ...#  ..#.  .#..  .#..
    if (c < 7.5)  return 987716.0;  // 7
    //        .##.  #..#  .##.  #..#  .##.
    if (c < 8.5)  return 431766.0;  // 8
    //        .##.  #..#  .###  ...#  .##.
    if (c < 9.5)  return 431894.0;  // 9
    //        .##.  #..#  ####  #..#  #..#
    if (c < 10.5) return 434073.0;  // a
    //        ###.  #..#  ###.  #..#  ###.
    if (c < 11.5) return 958110.0;  // b
    //        .###  #...  #...  #...  .###
    if (c < 12.5) return 493703.0;  // c
    //        ###.  #..#  #..#  #..#  ###.
    if (c < 13.5) return 956830.0;  // d
    //        ####  #...  ###.  #...  ####
    if (c < 14.5) return 1019535.0; // e
    //        ####  #...  ###.  #...  #...
    return 1019528.0;               // f
}

float sampleChar(float c, vec2 p) {
    // p in bitmap-pixel coords: x ∈ [0,4), y ∈ [0,5), origin = bottom-left
    if (p.x < 0.0 || p.x >= 4.0 || p.y < 0.0 || p.y >= 5.0) return 0.0;

    highp float bits = charBitmap(c);
    float col = floor(p.x);       // 0 = left
    float row = floor(p.y);       // 0 = bottom  (screen coords)
    // Map to bit position: row 0 (bottom) → bits 3-0, row 4 (top) → bits 19-16
    highp float idx = row * 4.0 + (3.0 - col);
    return mod(floor(bits / exp2(idx)), 2.0);
}

float getHashChar(float i) {
    if (i < 0.5) return uHashChars.x;
    if (i < 1.5) return uHashChars.y;
    if (i < 2.5) return uHashChars.z;
    if (i < 3.5) return uHashChars.w;
    if (i < 4.5) return uHashChars2.x;
    if (i < 5.5) return uHashChars2.y;
    return uHashChars2.z;
}

void drawWatermark(vec2 uv) {
    // Work in CSS (logical) pixels
    vec2 pixel = gl_FragCoord.xy / uDevicePixelRatio;

    float scale  = 2.0;              // each bitmap pixel = 2 CSS px
    float charW  = 4.0 * scale;      // 8 px per glyph
    float charH  = 5.0 * scale;      // 10 px per glyph  (≈ 12 px visual)
    float gap    = 3.0;              // 3 px gap between glyphs
    float cellW  = charW + gap;      // 11 px per cell
    float nChars = 7.0;

    // Padding from the bottom-left corner of the viewport
    float padX = 16.0;
    float padY = 16.0;

    vec2 pos = pixel - vec2(padX, padY);

    // Early-exit bounding box
    float totalW = nChars * cellW - gap;
    if (pos.x < 0.0 || pos.x >= totalW || pos.y < 0.0 || pos.y >= charH) return;

    // Which character slot?
    float ci = floor(pos.x / cellW);
    if (ci >= nChars) return;

    // Local x within character cell; skip the inter-glyph gap
    float localX = pos.x - ci * cellW;
    if (localX >= charW) return;

    // Convert to bitmap-pixel coordinates
    vec2 bp = vec2(localX, pos.y) / scale;

    float charCode = getHashChar(ci);
    float on = sampleChar(charCode, bp);

    if (on > 0.5) {
        // #f1f1f1 ≈ 0.945 with subtle watermark alpha
        float a   = 0.4;
        vec3  col = vec3(0.945);
        // Standard alpha-blend (pre-multiplied style)
        gl_FragColor = vec4(col * a, a) + gl_FragColor * (1.0 - a);
    }
}