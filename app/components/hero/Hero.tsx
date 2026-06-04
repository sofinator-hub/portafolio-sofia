"use client";

import { motion } from "framer-motion";
import OrbitBackground from "./OrbitBackground";
import Stars from "./Stars";
import Planet from "./Planet";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 space-grid opacity-20" />

      <OrbitBackground />
      <Stars />

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-20">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 items-center">

          {/* TEXTO */}

          <div className="relative z-10 text-center lg:text-left">

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                text-6xl
                sm:text-7xl
                md:text-8xl
                lg:text-[8rem]

                font-bold

                leading-[0.9]
              "
            >
              Hola, soy
              <br />
              Sofia

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="
                  text-violet-400
                  text-[0.8em]
                  ml-1
                  font-light
                "
              >
                |
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                mt-6

                text-lg
                md:text-2xl

                leading-relaxed

                max-w-lg

                mx-auto
                lg:mx-0
              "
            >
              Ingeniera de{" "}
              <span className="text-violet-400 font-semibold">
                Software
              </span>

              <br />

              y{" "}
              <span className="text-violet-400 font-semibold">
                Ciberseguridad
              </span>
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.6,
              }}
              className="mt-10"
            >
              <a
                href="#projects"
                className="
                  inline-flex
                  items-center
                  gap-3

                  text-white/70
                  text-lg

                  hover:text-violet-400

                  transition-all
                  duration-300
                "
              >
                Ver proyectos →
              </a>
            </motion.div>

          </div>

          {/* PLANETA */}

          <div
            className="
              relative

              h-[260px]
              sm:h-[340px]
              md:h-[450px]
              lg:h-[650px]

              flex
              items-center
              justify-center

              mt-8
              lg:mt-0
            "
          >
            <Planet />
          </div>

        </div>
      </div>
    </section>
  );
}