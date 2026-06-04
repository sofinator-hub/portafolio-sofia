"use client";

import MissionLog from "./MissionLog";

export default function MissionControl() {
  return (
    <section
      id="mission-control"
      className="relative py-28 px-6"
    >
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)]
        "
      />

      <div className="max-w-4xl mx-auto relative z-10">

        <div className="mb-24">

          <p
            className="
              uppercase

              tracking-[0.35em]

              text-white/40

              mb-4
            "
          >
            MISSION CONTROL
          </p>

          <h2
            className="
              text-6xl
              md:text-8xl

              font-bold
            "
          >
            Bitácora
            <br />
            de exploración.
          </h2>

        </div>

        <div className="relative">

          <div
            className="
              absolute

              left-4
              top-0
              bottom-0

              w-px

              bg-gradient-to-b
              from-violet-500/50
              to-transparent
            "
          />

          <div className="space-y-12">

          </div>

        </div>

      </div>
    </section>
  );
}