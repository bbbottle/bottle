import {useEffect, useRef} from "react";

export const useMousePosition = () => {
  const posRef = useRef<{x: number, y:number}>({x: 0, y: 0});
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return posRef;
}
