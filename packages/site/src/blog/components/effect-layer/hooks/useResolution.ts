import { useEffect, useRef } from "react";

export const useResolution = () => {
  const resolution = useRef<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);

  const updateResolution = () => {
    resolution.current = [window.innerWidth, window.innerHeight];
  };

  useEffect(() => {
    window.addEventListener("resize", updateResolution);

    return () => {
      window.removeEventListener("resize", updateResolution);
    };
  }, []);

  return resolution;
};
