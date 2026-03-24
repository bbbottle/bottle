import { useEffect, useState, useCallback } from 'react';
import { getFingerprint, getStableDeviceId, FingerprintData } from '@/utils/fingerprints';

interface UseFingerprintReturn {
  deviceId: string | null;
  fingerprint: FingerprintData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useFingerprint(): UseFingerprintReturn {
  const [state, setState] = useState<{
    deviceId: string | null;
    fingerprint: FingerprintData | null;
    loading: boolean;
    error: Error | null;
  }>({
    deviceId: null,
    fingerprint: null,
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { id, fp } = await getStableDeviceId();
      setState({
        deviceId: id,
        fingerprint: fp,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err : new Error('Failed to get fingerprint'),
      }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    deviceId: state.deviceId,
    fingerprint: state.fingerprint,
    loading: state.loading,
    error: state.error,
    refresh,
  };
}
