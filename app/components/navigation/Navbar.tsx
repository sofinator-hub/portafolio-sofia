"use client";

import { motion } from "framer-motion";

const links = [
  { label: "INICIO", href: "#home" },
  { label: "SOBRE MÍ", href: "#about" },
  { label: "PROYECTOS", href: "#projects" },
  { label: "HABILIDADES", href: "#skills" },
  { label: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        fixed
        top-0
        left-0
        right-0

        z-50
      "
    >
      <div
        className="
          max-w-[1600px]
          mx-auto

          px-6
          md:px-12

          py-8

          flex
          items-center
          justify-between
        "
      >
        <a
          href="#home"
          className="
            text-sm

            tracking-[0.3em]

            font-semibold

            text-white
          "
        >
          SOFIA.MR
          <span className="text-violet-400 ml-1">
            •
          </span>
        </a>

        <nav
          className="
            flex

            items-center
            gap-10
          "
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                text-xs

                tracking-[0.2em]

                text-white/70

                hover:text-violet-400

                transition-colors
              "
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}