"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxStars() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -500]);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 17) % 100,
    top: (i * 13) % 100,
    size: (i % 3) + 1,
  }));

  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        {stars.map((star) => (
          <div
            key={`layer2-${star.id}`}
            className="absolute rounded-full bg-violet-300/30"
            style={{
              left: `${(star.left + 20) % 100}%`,
              top: `${(star.top + 10) % 100}%`,
              width: `${star.size + 1}px`,
              height: `${star.size + 1}px`,
            }}
          />
        ))}
      </motion.div>
    </>
  );
}