import { useCallback, useContext, useRef } from 'react';
import { useMousePosition } from '@/hooks/use_mouse_position';
import { useResolution } from '@/components/effect-layer/hooks/useResolution';
import { useWatermarkHover } from '@/components/effect-layer/hooks/useWatermarkHover';
import { GlobalLoadingContext } from '@/context/global_loading_state_provider';

const SPIRAL_ACCEL = 0.005;
const SPIRAL_MAX_SPEED = 0.2;
const FADE_SPEED = 0.04; // ~0→1 in 25 frames (~400ms at 60fps)
const MIN_DURATION = 800;

export const useRender = () => {
  const pos = useMousePosition();
  const resolution = useResolution();
  const { isLoading, isFontLoading } = useContext(GlobalLoadingContext);
  const loadingRef = useRef(false);
  loadingRef.current = isLoading || isFontLoading;

  const spiralSpeedRef = useRef(0);
  const spiralOpacityRef = useRef(0);
  const loadingStartRef = useRef(0);
  const wasLoadingRef = useRef(false);

  const { updateWatermarkHover } = useWatermarkHover();

  const onRender = useCallback((inst: any) => {
    if (inst == null) {
      return;
    }

    inst.uniforms.uResolution.value[0] = inst.gl.canvas.width;
    inst.uniforms.uResolution.value[1] = inst.gl.canvas.height;

    inst.uniforms.uMouse.value[0] = pos.current.x;
    inst.uniforms.uMouse.value[1] = pos.current.y;

    const now = performance.now();
    const loading = loadingRef.current;

    // track when loading starts
    if (loading && !wasLoadingRef.current) {
      loadingStartRef.current = now;
    }
    wasLoadingRef.current = loading;

    // determine if spiral should be visible (loading OR within min duration)
    const elapsed = now - loadingStartRef.current;
    const inMinDuration = !loading && loadingStartRef.current > 0 && elapsed < MIN_DURATION;
    const shouldShow = loading || inMinDuration;

    // fade in/out
    if (shouldShow) {
      spiralOpacityRef.current = Math.min(1, spiralOpacityRef.current + FADE_SPEED);
    } else {
      spiralOpacityRef.current = Math.max(0, spiralOpacityRef.current - FADE_SPEED);
      if (spiralOpacityRef.current === 0) {
        loadingStartRef.current = 0;
      }
    }

    inst.uniforms.uLoading.value[0] = spiralOpacityRef.current > 0 ? 1.0 : 0.0;
    inst.uniforms.uSpiralOpacity.value[0] = spiralOpacityRef.current;

    if (spiralOpacityRef.current > 0) {
      // accelerate to max speed before fade out
      const accel = inMinDuration ? SPIRAL_ACCEL * 4 : SPIRAL_ACCEL;
      spiralSpeedRef.current = Math.min(SPIRAL_MAX_SPEED, spiralSpeedRef.current + accel);
    } else {
      spiralSpeedRef.current = 0;
    }
    inst.uniforms.uSpiralProgress.value[0] += spiralSpeedRef.current;

    updateWatermarkHover(inst);
  }, []);

  return { onRender };
};
