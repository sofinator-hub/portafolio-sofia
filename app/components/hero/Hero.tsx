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
      <div className="absolute inset-0 space-grid opacity-10" />

      <OrbitBackground />
      <Stars />

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-20">
        <div className="grid lg:grid-cols-2 items-center gap-8">

          {/* TEXTO */}

          <div className="relative z-10 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                mb-8
                uppercase
                tracking-[0.3em]
                text-violet-400
                text-xs
                md:text-sm
              "
            >
              // Bienvenido a mi portafolio
            </motion.p>

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
                lg:text-[7rem]

                font-bold
                leading-[0.9]
              "
            >
              Hola, soy
              <br />

              <span className="text-violet-400">
                Sofia
              </span>

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="
                  ml-2
                  font-light
                  text-violet-400
                "
              >
                |
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                mt-8

                text-2xl
                md:text-4xl

                leading-tight

                max-w-[700px]

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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="
                mt-8

                text-white/60

                text-base
                md:text-lg

                leading-relaxed

                max-w-[520px]

                mx-auto
                lg:mx-0
              "
            >
              Creo experiencias digitales,
              sitios web modernos,
              automatizaciones y soluciones
              tecnológicas enfocadas en resultados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10"
            >
              <a
                href="#projects"
                className="
                  inline-flex
                  items-center
                  justify-center

                  px-8
                  py-4

                  rounded-2xl

                  border
                  border-violet-400/30

                  bg-white/[0.02]

                  backdrop-blur-sm

                  text-white

                  tracking-[0.2em]
                  uppercase
                  text-sm

                  hover:border-violet-400
                  hover:bg-violet-500/10

                  transition-all
                  duration-300
                "
              >
                Ver proyectos
              </a>
            </motion.div>

          </div>

          {/* PLANETA */}

          <div
            className="
              relative

              h-[280px]
              sm:h-[400px]
              md:h-[500px]
              lg:h-[650px]

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