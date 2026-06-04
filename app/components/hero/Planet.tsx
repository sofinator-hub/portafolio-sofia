"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

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

  const { scrollYProgress } = useScroll();

  const scrollRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180]
  );

  const scrollYMove = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -60]
  );

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

        w-[320px]
        h-[320px]

        md:w-[520px]
        md:h-[520px]

        flex
        items-center
        justify-center
      "
    >

      {/* ORBITA 1 */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[380px]
          h-[220px]

          md:w-[620px]
          md:h-[340px]

          border
          border-violet-300/10

          rounded-full
        "
      />

      {/* ORBITA 2 */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[320px]
          h-[180px]

          md:w-[520px]
          md:h-[280px]

          border
          border-violet-300/10

          rounded-full

          rotate-[35deg]
        "
      />

      {/* ORBITA 3 */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute

          w-[430px]
          h-[260px]

          md:w-[700px]
          md:h-[400px]

          border
          border-white/5

          rounded-full

          rotate-[-25deg]
        "
      />

      {/* PLANETA */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.03,
        }}
        style={{
          rotateX,
          rotateY,
          rotate: scrollRotate,
          y: scrollYMove,
        }}
        className="
          relative

          w-[180px]
          h-[180px]

          md:w-[260px]
          md:h-[260px]

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
        <div
          className="
            absolute
            inset-[-80px]

            rounded-full

            bg-violet-500/20

            blur-[120px]
          "
        />

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

      {/* SATÉLITE */}

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

          w-[320px]
          h-[320px]

          md:w-[520px]
          md:h-[520px]
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