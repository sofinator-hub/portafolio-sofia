"use client";

import { motion } from "framer-motion";

export default function CommandCenter() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="
        mt-12

        rounded-[28px]

        border
        border-white/10

        bg-black/40

        backdrop-blur-xl

        p-6

        max-w-xl
      "
    >
      <div className="flex gap-2 mb-5">

        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />

      </div>

      <div className="space-y-5 font-mono text-sm">

        <div>
          <p className="text-violet-300">
            &gt; whoami
          </p>

          <p className="mt-2 text-white/80">
            Sofía Miranda
          </p>

          <p className="text-white/50">
            Backend Engineer
          </p>
        </div>

        <div>
          <p className="text-violet-300">
            &gt; specialties
          </p>

          <p className="mt-2 text-white/50">
            Cybersecurity
          </p>

          <p className="text-white/50">
            Automation
          </p>

          <p className="text-white/50">
            Robotics
          </p>
        </div>

        <div>
          <p className="text-violet-300">
            &gt; current_mission
          </p>

          <p className="mt-2 text-white/80">
            Building digital experiences...
          </p>
        </div>

        <div>
          <p className="text-violet-300">
            &gt; status
          </p>

          <p className="mt-2 text-green-400">
            ONLINE
          </p>
        </div>

      </div>
    </motion.div>
  );
}