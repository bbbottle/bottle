import { useCallback, useContext, useRef } from 'react';
import { useMousePosition } from '@/hooks/use_mouse_position';
import { useResolution } from '@/components/effect-layer/hooks/useResolution';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';

const SPIRAL_ACCEL = 0.005;
const SPIRAL_MAX_SPEED = 0.3;

export const useRender = () => {
  const pos = useMousePosition();
  const resolution = useResolution();
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const loadingRef = useRef(false);
  loadingRef.current = isLoading || isFontLoading;

  const spiralSpeedRef = useRef(0);

  const onRender = useCallback((inst: any) => {
    if (inst == null) {
      return;
    }

    inst.uniforms.uResolution.value[0] = inst.gl.canvas.width;
    inst.uniforms.uResolution.value[1] = inst.gl.canvas.height;

    inst.uniforms.uMouse.value[0] = pos.current.x;
    inst.uniforms.uMouse.value[1] = pos.current.y;

    inst.uniforms.uLoading.value[0] = loadingRef.current ? 1.0 : 0.0;

    if (loadingRef.current) {
      spiralSpeedRef.current = Math.min(SPIRAL_MAX_SPEED, spiralSpeedRef.current + SPIRAL_ACCEL);
    } else {
      spiralSpeedRef.current = 0;
    }
    inst.uniforms.uSpiralProgress.value[0] += spiralSpeedRef.current;
  }, []);

  return { onRender };
};
