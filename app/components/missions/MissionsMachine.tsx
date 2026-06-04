"use client";

import { motion } from "framer-motion";
import { missions } from "../../data/missions";

export default function MissionsMachine() {
  return (
    <section
      id="projects"
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="mb-24">

          <p
            className="
              text-xs
              tracking-[0.4em]
              uppercase
              text-white/40
              mb-4
            "
          >
            Proyectos
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-none
            "
          >
            Selected Work
          </h2>

          <p
            className="
              mt-6
              max-w-xl
              text-white/50
              text-lg
            "
          >
            Sitios web, experiencias digitales y proyectos
            desarrollados con enfoque en diseño, rendimiento
            y conversión.
          </p>

        </div>

        <div className="space-y-10">

          {missions.map((project, index) => (

            <motion.a
              key={project.id}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"

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
                delay: index * 0.08,
              }}

              whileHover={{
                x: 12,
              }}

              className="
                group

                block

                border-b
                border-white/10

                pb-10

                transition-all
              "
            >

              <div
                className="
                  flex

                  flex-col
                  md:flex-row

                  md:items-center
                  md:justify-between

                  gap-6
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      text-violet-400

                      tracking-[0.3em]

                      mb-3
                    "
                  >
                    {project.number}
                  </p>

                  <h3
                    className="
                      text-3xl
                      md:text-5xl

                      font-black

                      transition-all

                      group-hover:text-violet-300
                    "
                  >
                    {project.title}
                  </h3>

                  <p
                    className="
                      mt-4

                      text-white/50

                      max-w-2xl
                    "
                  >
                    {project.description}
                  </p>

                  <div
                    className="
                      flex
                      flex-wrap

                      gap-2

                      mt-5
                    "
                  >
                    {project.technologies.map(
                      (tech) => (
                        <span
                          key={tech}
                          className="
                            px-3
                            py-1

                            rounded-full

                            border
                            border-white/10

                            text-xs

                            text-white/60
                          "
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                </div>

                <div
                  className="
                    flex

                    items-center

                    gap-3

                    text-white/40

                    group-hover:text-white

                    transition-all
                  "
                >

                  <span
                    className="
                      uppercase
                      text-sm
                      tracking-[0.2em]
                    "
                  >
                    Visit
                  </span>

                  <span
                    className="
                      text-3xl

                      group-hover:translate-x-2

                      transition-all
                    "
                  >
                    ↗
                  </span>

                </div>

              </div>

            </motion.a>

          ))}

        </div>

      </div>
    </section>
  );
}