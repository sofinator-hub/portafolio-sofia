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
      <div className="absolute inset-0 space-grid opacity-30" />

      <OrbitBackground />
      <Stars />

      <div className="max-w-[1500px] mx-auto w-full px-8 md:px-20">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* TEXTO */}

          <div className="relative z-10">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                inline-flex
                items-center

                px-5
                py-3

                rounded-full

                border
                border-white/10

                bg-white/5

                text-sm

                mb-8
              "
            >
              Disponible para proyectos
            </motion.div>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                uppercase

                tracking-[0.45em]

                text-white/40

                mb-8
              "
            >
              Backend • Cybersecurity • Robotics
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                text-5xl
                md:text-[9rem]

                font-bold

                leading-[0.9]
              "
            >
              Hola, soy
              <br />
              Sofia
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
                mt-8

                max-w-xl

                text-white/60
                text-lg
                md:text-xl

                leading-relaxed
              "
            >
              Ingeniera enfocada en desarrollo backend,
              ciberseguridad, automatización y experiencias
              digitales modernas.
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
                href="#skills"
                className="
                  inline-flex

                  px-8
                  py-4

                  rounded-full

                  border
                  border-white/15

                  hover:border-violet-400

                  transition
                "
              >
                Ver habilidades
              </a>
            </motion.div>

          </div>

          {/* PLANETA */}

          <div
            className="
              relative

              h-[700px]

              flex
              items-center
              justify-center
            "
          >
            <Planet />
          </div>

        </div>

      </div>
    </section>
  );
}