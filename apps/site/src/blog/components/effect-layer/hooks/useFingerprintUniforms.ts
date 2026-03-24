import { useEffect, useRef } from 'react';
import { useFingerprint } from '@/hooks/use_fingerprint';

export const useFingerprintUniforms = (inst: any) => {
  const { fingerprint, loading } = useFingerprint();
  const appliedRef = useRef(false);

  useEffect(() => {
    if (loading || !fingerprint || !inst?.uniforms || appliedRef.current) {
      return;
    }

    const hash = fingerprint.hash.slice(0, 16);
    const chars = [...hash].map(c => parseInt(c, 16) || 0);

    while (chars.length < 16) chars.push(0);

    inst.uniforms.uFpChars1.value = [chars[0], chars[1], chars[2], chars[3]];
    inst.uniforms.uFpChars2.value = [chars[4], chars[5], chars[6], chars[7]];
    inst.uniforms.uFpChars3.value = [chars[8], chars[9], chars[10], chars[11]];
    inst.uniforms.uFpChars4.value = [chars[12], chars[13], chars[14], chars[15]];

    appliedRef.current = true;
  }, [fingerprint, loading, inst]);
};
