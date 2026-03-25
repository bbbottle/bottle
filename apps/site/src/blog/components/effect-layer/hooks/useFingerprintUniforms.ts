import { useRef } from 'react';
import { useFingerprint } from '@/hooks/use_fingerprint';

export const useFingerprintUniforms = () => {
  const { fingerprint, loading } = useFingerprint();

  const charsRef = useRef<number[] | null>(null);
  const appliedRef = useRef(false);

  if (!loading && fingerprint && !charsRef.current) {
    const hash = fingerprint.hash.slice(0, 16);
    const chars = [...hash].map(c => parseInt(c, 16) || 0);
    while (chars.length < 16) chars.push(0);
    charsRef.current = chars;
  }

  const updateFingerprintUniforms = (inst: any) => {
    if (!inst?.uniforms || appliedRef.current || !charsRef.current) {
      return;
    }

    const chars = charsRef.current;

    // Mutate the existing arrays instead of replacing them
    inst.uniforms.uFpChars1.value[0] = chars[0];
    inst.uniforms.uFpChars1.value[1] = chars[1];
    inst.uniforms.uFpChars1.value[2] = chars[2];
    inst.uniforms.uFpChars1.value[3] = chars[3];

    inst.uniforms.uFpChars2.value[0] = chars[4];
    inst.uniforms.uFpChars2.value[1] = chars[5];
    inst.uniforms.uFpChars2.value[2] = chars[6];
    inst.uniforms.uFpChars2.value[3] = chars[7];

    inst.uniforms.uFpChars3.value[0] = chars[8];
    inst.uniforms.uFpChars3.value[1] = chars[9];
    inst.uniforms.uFpChars3.value[2] = chars[10];
    inst.uniforms.uFpChars3.value[3] = chars[11];

    inst.uniforms.uFpChars4.value[0] = chars[12];
    inst.uniforms.uFpChars4.value[1] = chars[13];
    inst.uniforms.uFpChars4.value[2] = chars[14];
    inst.uniforms.uFpChars4.value[3] = chars[15];

    // console.log('[Fingerprint] Uniforms set:', {
    //   uFpChars1: inst.uniforms.uFpChars1.value,
    //   uFpChars2: inst.uniforms.uFpChars2.value,
    //   uFpChars3: inst.uniforms.uFpChars3.value,
    //   uFpChars4: inst.uniforms.uFpChars4.value,
    // });

    appliedRef.current = true;
  };

  return { updateFingerprintUniforms };
};
