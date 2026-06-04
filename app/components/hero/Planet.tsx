"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Planet() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 40,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 40,
    damping: 20,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    mouseX.set((x - 0.5) * 10);
    mouseY.set(-(y - 0.5) * 10);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="
        relative

        w-[260px]
        h-[260px]

        md:w-[520px]
        md:h-[520px]

        flex
        items-center
        justify-center
      "
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX,
          rotateY,
        }}
        className="
          relative

          w-[180px]
          h-[180px]

          md:w-[420px]
          md:h-[420px]

          rounded-full

          overflow-hidden

          border
          border-violet-300/20
        "
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 30% 25%, rgba(255,255,255,.25), transparent 20%),
              radial-gradient(circle at 50% 40%, rgba(236,72,153,.18), transparent 35%),
              radial-gradient(circle at 70% 65%, rgba(168,85,247,.2), transparent 30%),
              linear-gradient(
                135deg,
                #8b5cf6,
                #5b21b6,
                #1e1b4b,
                #050505
              )
            `,
          }}
        />

        <div
          className="
            absolute
            inset-[-100px]

            rounded-full

            bg-violet-500/20

            blur-[140px]
          "
        />

        <div
          className="
            absolute

            top-[25%]
            left-[20%]

            w-[30%]
            h-[18%]

            rounded-full

            bg-white/10

            blur-xl
          "
        />

        <div
          className="
            absolute

            bottom-[30%]
            right-[22%]

            w-[18%]
            h-[18%]

            rounded-full

            border

            border-white/10
          "
        />

        <div
          className="
            absolute

            top-[58%]
            left-[30%]

            w-[14%]
            h-[14%]

            rounded-full

            border

            border-white/10
          "
        />
      </motion.div>
    </div>
  );
}