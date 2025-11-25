import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_STORAGE_KEY = "div-scroll-positions";

function getScrollPositions(): Record<string, number> {
  const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

function saveScrollPosition(key: string, position: number) {
  const positions = getScrollPositions();
  positions[key] = position;
  sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
}

export function useBlogScrollReset() {
  useEffect(() => {
    const element = document.getElementById("blog");
    if (!element) return;

    element.scrollTop = 0;
  }, []);
}

export function useBlogScroll() {
  const element = document.getElementById("blog");

  const gotoTop = useCallback(() => {
    if (!element) return;

    const id = setTimeout(() => {
      element.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);

    return () => clearTimeout(id);
  }, [element]);

  return {
    gotoTop,
  };
}

export function useBlogScrollRestoration(debounceMs: number = 100) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const scrollTimeoutRef = useRef<number>();
  const element = document.getElementById("blog");
  const scrollKey = `blog`;

  // Restore scroll position on mount
  useEffect(() => {
    if (!isFirstRender.current || !element) return;

    const positions = getScrollPositions();
    const savedPosition = positions[scrollKey];
    if (!savedPosition) {
      return;
    }

    requestAnimationFrame(() => {
      element.scrollTop = savedPosition;
    });
    isFirstRender.current = false;
  }, []);

  // Save scroll position with debouncing
  useEffect(() => {
    if (!element) return;

    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the save operation
      scrollTimeoutRef.current = window.setTimeout(() => {
        if (element) {
          saveScrollPosition(scrollKey, element.scrollTop);
        }
      }, debounceMs);
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
