"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SignalPanel from "./SignalPanel";
import Magnetic from "../ui/Magnetic";
import { skills, connections } from "../../data/skills";

export default function SkillsConstellation() {
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] =
    useState<any>(null);

  const revealConnections = (skillId: string) => {
    const found = connections
      .filter(
        ([from, to]) =>
          from === skillId || to === skillId
      )
      .map(([from, to]) => `${from}-${to}`);

    setDiscovered((prev) => [
      ...new Set([...prev, ...found]),
    ]);
  };

  const getSkill = (id: string) =>
    skills.find((s) => s.id === id);

  return (
    <section className="py-40 px-6">
      <div className="max-w-9xl mx-auto">

        <div className="mb-20">
          <p className="uppercase tracking-[0.3em] text-white/40 mb-4">
            CONSTELACIÓN DE HABILIDADES
          </p>
        </div>

        <div
          className="
            relative
            h-[850px]
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.015]
            overflow-hidden
          "
        >

          <SignalPanel skill={selectedSkill} />

          {/* Glow de fondo */}

          <div
            className="
              absolute
              inset-0

              bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)]
            "
          />

          {/* Conexiones */}

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connections.map(([from, to]) => {
              const start = getSkill(from);
              const end = getSkill(to);

              if (!start || !end) return null;

              const id = `${from}-${to}`;

              const visible =
                discovered.includes(id);

              return (
                <motion.line
                  key={id}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="rgba(196,181,253,0.12)"
                  strokeWidth="0.10"
                  strokeDasharray="0.6 1.2"
                  animate={{
                    opacity: visible ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                />
              );
            })}
          </svg>

          {/* NODOS */}

          {skills.map((skill) => (
            <div
              key={skill.id}
              className="absolute"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform:
                  "translate(-50%, -50%)",
              }}
            >
              <Magnetic>

                <motion.div
                  onHoverStart={() =>
                    revealConnections(skill.id)
                  }
                  onClick={() =>
                    setSelectedSkill(skill)
                  }
                  whileHover={{
                    scale: 1.15,
                  }}
                  className="
                    cursor-pointer
                    select-none
                  "
                >

                  <div className="flex items-center gap-3">

                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="
                        w-3
                        h-3

                        rounded-full

                        bg-violet-300

                        shadow-[0_0_25px_rgba(196,181,253,1)]
                      "
                    />

                    <span
                      className="
                        text-white/80
                        transition
                        hover:text-white
                      "
                    >
                      {skill.name}
                    </span>

                  </div>

                </motion.div>

              </Magnetic>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}