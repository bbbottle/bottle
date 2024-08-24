import { useCallback, useState } from "react";
import { useMousePosition } from "@/hooks/use_mouse_position";
import { useResolution } from "@/components/effect-layer/hooks/useResolution";

export const useRender = () => {
  const pos = useMousePosition();
  const resolution = useResolution();

  const onRender = useCallback(
    (inst: any) => {
      if (inst == null) {
        return;
      }

      inst.uniforms.uResolution.value[0] = inst.gl.canvas.width;
      inst.uniforms.uResolution.value[1] = inst.gl.canvas.height;

      inst.uniforms.uMouse.value[0] = pos.current.x;
      inst.uniforms.uMouse.value[1] = pos.current.y;
    },
    []
  );

  return { onRender };
};
