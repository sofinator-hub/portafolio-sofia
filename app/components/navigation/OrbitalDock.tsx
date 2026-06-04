"use client";

import { motion } from "framer-motion";

import {
  House,
  Orbit,
  Radar,
} from "lucide-react";

const items = [
  {
    label: "Home",
    href: "#home",
    icon: House,
  },

  {
    label: "Skills",
    href: "#skills",
    icon: Orbit,
  },

  {
    label: "Missions",
    href: "#missions",
    icon: Radar,
  },
];

export default function OrbitalDock() {
  return (
    <div
      className="
        fixed

        bottom-8
        left-1/2

        -translate-x-1/2

        z-[999]
      "
    >
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

    inset-[-18px]

    rounded-full

    border

    border-violet-500/10
  "
/>
      <div
        className="
          flex
          items-center
          gap-3

          rounded-full

          border
          border-white/10

          bg-black/40

          backdrop-blur-xl

          px-3
          py-3
        "
      >

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{
                y: -6,
              }}
              className="
                group

                relative

                flex
                items-center
                justify-center

                w-12
                h-12

                rounded-full

                border
                border-white/10

                bg-white/[0.02]
              "
            >

              <Icon
                size={18}
                className="
                  text-white/70

                  group-hover:text-white

                  transition
                "
              />

              <div
                className="
                  absolute

                  bottom-16
                  left-1/2

                  -translate-x-1/2

                  px-3
                  py-1

                  rounded-full

                  bg-black/80

                  text-xs

                  opacity-0

                  group-hover:opacity-100

                  transition

                  whitespace-nowrap
                "
              >
                {item.label}
              </div>

            </motion.a>
          );
        })}

      </div>
    </div>
  );
}