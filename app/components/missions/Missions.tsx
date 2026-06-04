"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { missions } from "../../data/missions";

const COLOR_MAP: Record<string, {
  glow: string;
  border: string;
  badge: string;
  badgeText: string;
  scanline: string;
  dot: string;
}> = {
  violet: {
    glow: "rgba(139,92,246,0.4)",
    border: "rgba(139,92,246,0.5)",
    badge: "rgba(139,92,246,0.15)",
    badgeText: "#c4b5fd",
    scanline: "rgba(139,92,246,0.06)",
    dot: "#8b5cf6",
  },
  cyan: {
    glow: "rgba(34,211,238,0.4)",
    border: "rgba(34,211,238,0.5)",
    badge: "rgba(34,211,238,0.12)",
    badgeText: "#67e8f9",
    scanline: "rgba(34,211,238,0.06)",
    dot: "#22d3ee",
  },
  amber: {
    glow: "rgba(251,191,36,0.4)",
    border: "rgba(251,191,36,0.5)",
    badge: "rgba(251,191,36,0.12)",
    badgeText: "#fcd34d",
    scanline: "rgba(251,191,36,0.06)",
    dot: "#fbbf24",
  },
  pink: {
    glow: "rgba(244,114,182,0.4)",
    border: "rgba(244,114,182,0.5)",
    badge: "rgba(244,114,182,0.12)",
    badgeText: "#f9a8d4",
    scanline: "rgba(244,114,182,0.06)",
    dot: "#f472b6",
  },
  emerald: {
    glow: "rgba(52,211,153,0.4)",
    border: "rgba(52,211,153,0.5)",
    badge: "rgba(52,211,153,0.12)",
    badgeText: "#6ee7b7",
    scanline: "rgba(52,211,153,0.06)",
    dot: "#34d399",
  },
};

function PodSlot({
  project,
  index,
  isActive,
  onClick,
}: {
  project: (typeof missions)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const colors = COLOR_MAP[project.color] ?? COLOR_MAP.violet;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="group w-full text-left relative"
      style={{ outline: "none" }}
    >
      {/* Rail track line */}
      <div
        className="absolute left-[22px] top-1/2 -translate-y-1/2 w-[3px] h-[calc(100%+12px)] -z-10"
        style={{
          background: isActive
            ? `linear-gradient(to bottom, transparent, ${colors.dot}, transparent)`
            : "rgba(255,255,255,0.04)",
        }}
      />

      <div
        className="relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${colors.badge}, rgba(0,0,0,0.3))`
            : "rgba(255,255,255,0.02)",
          border: isActive
            ? `1px solid ${colors.border}`
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: isActive
            ? `0 0 30px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
            : "none",
        }}
      >
        {/* Status dot */}
        <div className="relative flex-shrink-0">
          <div
            className="w-[10px] h-[10px] rounded-full"
            style={{
              background: colors.dot,
              boxShadow: isActive ? `0 0 10px ${colors.dot}` : "none",
              opacity: isActive ? 1 : 0.3,
            }}
          />
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: colors.dot }}
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Number */}
        <span
          className="font-mono text-xs tracking-[0.2em] flex-shrink-0 w-6"
          style={{ color: isActive ? colors.badgeText : "rgba(255,255,255,0.25)" }}
        >
          {project.number}
        </span>

        {/* Title */}
        <span
          className="font-bold tracking-widest text-sm flex-1 transition-colors duration-300"
          style={{
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
            letterSpacing: "0.15em",
          }}
        >
          {project.title}
        </span>

        {/* Arrow indicator */}
        <motion.div
          animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke={colors.badgeText}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
}

function ScanlineOverlay({ color }: { color: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full"
          style={{
            height: "1px",
            top: `${i * 5.5}%`,
            background: COLOR_MAP[color]?.scanline ?? "rgba(139,92,246,0.06)",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 0.8, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsub();
    };
  }, [value]);

  return <span>{display}</span>;
}

function DockingDisplay({ project }: { project: (typeof missions)[0] }) {
  const colors = COLOR_MAP[project.color] ?? COLOR_MAP.violet;
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setBooting(true);
    setProgress(0);
    const start = Date.now();
    const duration = 900;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));
      if (pct >= 1) {
        clearInterval(interval);
        setBooting(false);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [project.id]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <ScanlineOverlay color={project.color} />

      {/* Boot loader */}
      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-[inherit]"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
          >
            <p
              className="font-mono text-xs tracking-[0.3em] mb-4"
              style={{ color: colors.badgeText }}
            >
              LOADING POD {project.number}
            </p>
            <div className="w-48 h-[2px] rounded-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: colors.dot,
                  boxShadow: `0 0 8px ${colors.dot}`,
                }}
              />
            </div>
            <p className="font-mono text-xs mt-2 text-white/30">{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!booting && (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-full relative z-[3]"
          >
            {/* Header row */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: colors.dot, boxShadow: `0 0 8px ${colors.dot}` }}
                />
                <span
                  className="font-mono text-[10px] tracking-[0.35em]"
                  style={{ color: colors.badgeText }}
                >
                  POD-{project.number} · DOCKED
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
                CARGO MANIFEST
              </span>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-between p-6 gap-6 overflow-hidden">
              {/* Title */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="font-mono text-[10px] tracking-[0.4em] text-white/30 mb-3"
                >
                  PROJECT DESIGNATION
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-black tracking-[0.12em] leading-none"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    color: "#ffffff",
                    textShadow: `0 0 40px ${colors.glow}`,
                  }}
                >
                  {project.title}
                </motion.h3>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm leading-relaxed text-white/55 max-w-md"
              >
                {project.description}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-mono text-[10px] tracking-[0.35em] text-white/25 mb-3">
                  PAYLOAD SPECS
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide"
                      style={{
                        background: colors.badge,
                        border: `1px solid ${colors.border}`,
                        color: colors.badgeText,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Launch button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.dot}, ${colors.dot}cc)`,
                    color: "#000000",
                    boxShadow: `0 0 30px ${colors.glow}`,
                  }}
                >
                  <span>LAUNCH PROJECT</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                  >
                    <path
                      d="M2 12L12 2M12 2H6M12 2v6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Footer telemetry */}
            <div
              className="px-6 py-3 flex items-center gap-6 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {[
                { label: "STACK SIZE", value: project.technologies.length },
                { label: "STATUS", value: null, text: "ACTIVE" },
                { label: "POD ID", value: null, text: `#${project.number}` },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
                    {item.label}
                  </span>
                  <span
                    className="font-mono text-xs font-bold tracking-wide"
                    style={{ color: colors.badgeText }}
                  >
                    {item.value !== null ? (
                      <AnimatedCounter value={item.value} />
                    ) : (
                      item.text
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Missions() {
  const [selected, setSelected] = useState(missions[0]);
  const colors = COLOR_MAP[selected.color] ?? COLOR_MAP.violet;

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background glow that follows active project */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 1 }}
        style={{ zIndex: 0 }}
      >
        <motion.div
          animate={{ background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${colors.glow.replace("0.4", "0.08")}, transparent 70%)` }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono uppercase tracking-[0.5em] text-white/30 text-xs mb-5"
          >
            ORBITAL CARGO TERMINAL — SECTOR 7
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            Project{" "}
            <span
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: `linear-gradient(135deg, ${colors.dot}, ${colors.badgeText})`,
                transition: "background-image 0.5s",
              }}
            >
              Vault
            </span>
          </motion.h2>
        </div>

        {/* TERMINAL BODY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: "rgba(8,8,12,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 40px 100px rgba(0,0,0,0.6), 0 0 80px ${colors.glow.replace("0.4", "0.1")}`,
          }}
        >
          {/* TOP STATUS BAR */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(40,200,64,0.7)"].map(
                  (c) => (
                    <div
                      key={c}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  )
                )}
              </div>
              <span className="font-mono text-[10px] tracking-[0.35em] text-white/25 ml-2">
                OCT-7 · PROJECT MANIFEST TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: colors.dot }}
              />
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/25">
                <AnimatedCounter value={missions.length} /> PODS DOCKED
              </span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
            {/* LEFT: POD SELECTOR */}
            <div
              className="relative flex flex-col"
              style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
            >
              {/* Column header */}
              <div
                className="px-6 py-4 flex-shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-mono text-[10px] tracking-[0.35em] text-white/25">
                  DOCKING BAY — SELECT POD
                </p>
              </div>

              {/* Pod list */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                {missions.map((project, index) => (
                  <PodSlot
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={selected.id === project.id}
                    onClick={() => setSelected(project)}
                  />
                ))}
              </div>

              {/* Bottom indicator */}
              <div
                className="px-6 py-4 flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <p className="font-mono text-[9px] tracking-[0.25em] text-white/15">
                  TAP POD TO RETRIEVE DATA
                </p>
              </div>
            </div>

            {/* RIGHT: DOCKING DISPLAY */}
            <div
              className="relative min-h-[480px] md:min-h-[520px]"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${colors.badge}, transparent 70%)`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <DockingDisplay project={selected} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* BOTTOM TELEMETRY BAR */}
          <div
            className="flex items-center gap-8 px-8 py-3 overflow-x-auto"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { label: "TERMINAL", value: "OCT-7" },
              { label: "SECTOR", value: "ALPHA-3" },
              { label: "CAPACITY", value: `${missions.length}/${missions.length}` },
              { label: "UPTIME", value: "99.9%" },
              { label: "AUTH", value: "MIRANDA.S" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
                  {item.label}
                </span>
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-white/30"
              />
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
                LIVE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
