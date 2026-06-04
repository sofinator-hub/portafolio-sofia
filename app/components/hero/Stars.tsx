"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: (i % 3) + 1,
  left: (i * 13) % 100,
  top: (i * 17) % 100,
  duration: 2 + (i % 5),
}));

export default function Stars() {
  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
          }}
        />
      ))}
    </>
  );
}