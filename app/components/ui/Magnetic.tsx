"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticProps {
  children: ReactNode;
}

export default function Magnetic({
  children,
}: MagneticProps) {
  const {
    ref,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  } = useMagnetic();

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}