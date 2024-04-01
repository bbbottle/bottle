import { useCallback, useState } from "react";
import { useMousePosition } from "@/hooks/use_mouse_position";
import { useResolution } from "@/components/effect-layer/hooks/useResolution";

export const useRender = () => {
  const [inst, setInst] = useState<any>(null);
  const pos = useMousePosition();
  const resolution = useResolution();

  const onRender = useCallback(
    (p: any) => {
      if (inst === null) {
        setInst(p);
        return;
      }

      inst.uniforms.uResolution.value[0] = resolution.current[0];
      inst.uniforms.uResolution.value[1] = resolution.current[1];

      inst.uniforms.uMouse.value[0] = pos.current.x;
      inst.uniforms.uMouse.value[1] = pos.current.y;
    },
    [inst]
  );

  return { inst, onRender };
};
