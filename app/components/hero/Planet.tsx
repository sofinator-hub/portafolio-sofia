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

  const scrollYMove = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -40]
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.08]
  );

  const orbitRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 30]
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
        style={{
          rotate: orbitRotate,
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
          y: [0, -10, 0],
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
          y: scrollYMove,
          scale: scrollScale,
        }}
        className="
          relative

          w-[180px]
          h-[180px]

          md:w-[260px]
          md:h-[260px]

          rounded-full

          overflow-hidden

          border
          border-white/10

          backdrop-blur-xl
        "
      >

        {/* BASE */}

        <div
          className="
            absolute
            inset-0
            rounded-full
          "
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 25%),
              radial-gradient(circle at 70% 70%, rgba(168,85,247,0.15), transparent 40%),
              linear-gradient(
                135deg,
                rgba(139,92,246,0.55),
                rgba(88,28,135,0.35),
                rgba(0,0,0,0.9)
              )
            `,
          }}
        />

        {/* BANDA ATMOSFÉRICA */}

        <motion.div
          animate={{
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute

            top-[35%]
            left-[-10%]

            w-[120%]
            h-8

            rounded-full

            bg-violet-300/10

            blur-xl

            rotate-[-12deg]
          "
        />

        {/* SUPERFICIE */}

        <div
          className="
            absolute

            top-[25%]
            left-[20%]

            w-20
            h-14

            rounded-full

            bg-violet-400/10

            blur-md
          "
        />

        <div
          className="
            absolute

            bottom-[25%]
            right-[20%]

            w-16
            h-12

            rounded-full

            bg-fuchsia-400/10

            blur-md
          "
        />

        {/* CRÁTERES */}

        <div
          className="
            absolute

            top-[55%]
            left-[28%]

            w-8
            h-8

            rounded-full

            border
            border-white/10
          "
        />

        <div
          className="
            absolute

            top-[35%]
            right-[28%]

            w-5
            h-5

            rounded-full

            border
            border-white/10
          "
        />

        {/* ILUMINACIÓN */}

        <div
          className="
            absolute

            top-6
            left-8

            w-24
            h-24

            rounded-full

            bg-white/10

            blur-2xl
          "
        />

        {/* GLOW */}

        <div
          className="
            absolute

            inset-[-80px]

            rounded-full

            bg-violet-500/20

            blur-[120px]
          "
        />

        {/* ANILLO */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute

            inset-[-12px]

            rounded-full

            border

            border-violet-400/10
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