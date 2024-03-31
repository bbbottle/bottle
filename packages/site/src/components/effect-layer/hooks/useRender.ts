import {useCallback, useState} from "react";
import {useMousePosition} from "@/hooks/use_mouse_position";

export const useRender = () => {
  const [inst, setInst] = useState<any>(null)
  const pos = useMousePosition();

  const onRender = useCallback((p: any) => {
    if (inst === null) {
      setInst(p)
      return;
    }

    inst.uniforms.uMouse.value[0] = pos.current.x;
    inst.uniforms.uMouse.value[1] = pos.current.y;
  }, [inst]);

  return { inst, onRender }
}
