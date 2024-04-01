import { useEffect, useRef } from "react";

export const useResolution = () => {
  const resolution = useRef<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const updateResolution = () => {
      resolution.current = [window.innerWidth, window.innerHeight];
    };

    window.addEventListener("resize", updateResolution);

    // touch move
    window.addEventListener("touchmove", updateResolution);

    // scroll
    window.addEventListener("scroll", updateResolution);

    return () => {
      window.removeEventListener("resize", updateResolution);
      window.removeEventListener("touchmove", updateResolution);
      window.removeEventListener("scroll", updateResolution);
    };
  }, []);

  return resolution;
};
