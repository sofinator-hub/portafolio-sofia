"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Planet() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 50,
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

    mouseX.set((x - 0.5) * 12);
    mouseY.set(-(y - 0.5) * 12);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="
        relative

        w-[520px]
        h-[520px]

        flex
        items-center
        justify-center
      "
    >

      {/* ORBITA 1 */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[620px]
          h-[340px]

          border
          border-violet-300/10

          rounded-full
        "
      />

      {/* ORBITA 2 */}

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[520px]
          h-[280px]

          border
          border-violet-300/10

          rounded-full

          rotate-[35deg]
        "
      />

      {/* ORBITA 3 */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[700px]
          h-[400px]

          border
          border-white/5

          rounded-full

          rotate-[-25deg]
        "
      />

      {/* PLANETA */}

      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="
          relative

          w-[260px]
          h-[260px]

          rounded-full

          bg-gradient-to-br
          from-violet-500/30
          via-violet-700/20
          to-black

          border
          border-white/10

          backdrop-blur-xl
        "
      >

        {/* glow */}

        <div
          className="
            absolute
            inset-[-80px]

            rounded-full

            bg-violet-500/20

            blur-[120px]
          "
        />

        {/* brillo */}

        <div
          className="
            absolute

            top-8
            left-10

            w-24
            h-24

            rounded-full

            bg-white/10

            blur-2xl
          "
        />

        {/* detalle */}

        <div
          className="
            absolute

            bottom-10
            right-10

            w-16
            h-16

            rounded-full

            border
            border-white/10
          "
        />

      </motion.div>

      {/* SATELITE */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[520px]
          h-[520px]
        "
      >

        <div
          className="
            absolute

            top-0
            left-1/2

            -translate-x-1/2

            w-4
            h-4

            rounded-full

            bg-white

            shadow-[0_0_20px_white]
          "
        />

      </motion.div>

    </div>
  );
}