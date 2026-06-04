"use client";

import { motion } from "framer-motion";

type Props = {
  year: string;
  title: string;
  description: string;
  index: number;
};

export default function MissionLog({
  year,
  title,
  description,
  index,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
      }}
      className="
        relative

        rounded-[32px]

        max-w-4xl

        border
        border-white/10

        bg-white/[0.02]

        backdrop-blur-xl

        p-6
      "
    >
      <div
        className="
          absolute
          -top-3
          left-8

          w-6
          h-6

          rounded-full

          bg-violet-300

          shadow-[0_0_25px_rgba(196,181,253,1)]
        "
      />

      <p
        className="
          text-violet-300

          tracking-[0.2em]

          text-sm

          mb-4
        "
      >
        {year}
      </p>

      <h3
        className="
          text-3xl
          font-bold

          mb-4
        "
      >
        {title}
      </h3>

      <p
        className="
          text-white/60

          leading-relaxed
        "
      >
        {description}
      </p>
    </motion.div>
  );
}