"use client";

import { useRef } from "react";
import { useMotionValue } from "framer-motion";

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent
  ) => {
    const element = ref.current;

    if (!element) return;

    const rect =
      element.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const distanceX =
      e.clientX - centerX;

    const distanceY =
      e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  };
}