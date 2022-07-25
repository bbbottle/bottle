import { useEffect, useRef } from "react";

export const useResizedCanvasRef = (maxSize: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    const canvasSize = Math.min(width, height);
    const size = Math.min(canvasSize, maxSize);

    canvas.setAttribute("width", `${size}`);
    canvas.setAttribute("height", `${size}`);
  }, []);

  return {
    canvasRef,
    containerRef,
  };
};
