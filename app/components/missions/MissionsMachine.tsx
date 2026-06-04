"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { missions } from "../../data/missions";
import React from "react";
import OrbitBackground from "../hero/OrbitBackground";
import Stars from "../hero/Stars";
// ─── Color palette per project ────────────────────────────────────────────────
const COLORS: Record<string, {
  primary: string; glow: string; light: string; dark: string;
  badge: string; rgb: string; label: string;
}> = {
  violet: { primary: "#a855f7", glow: "rgba(168,85,247,0.9)", light: "#d8b4fe", dark: "#3b0764", badge: "rgba(168,85,247,0.18)", rgb: "168,85,247", label: "#e9d5ff" },
  cyan:   { primary: "#06b6d4", glow: "rgba(6,182,212,0.9)",  light: "#a5f3fc", dark: "#0c4a6e", badge: "rgba(6,182,212,0.18)",   rgb: "6,182,212",   label: "#cffafe" },
  amber:  { primary: "#f59e0b", glow: "rgba(245,158,11,0.9)", light: "#fde68a", dark: "#451a03", badge: "rgba(245,158,11,0.18)",  rgb: "245,158,11",  label: "#fef3c7" },
  pink:   { primary: "#ec4899", glow: "rgba(236,72,153,0.9)", light: "#fbcfe8", dark: "#500724", badge: "rgba(236,72,153,0.18)",  rgb: "236,72,153",  label: "#fce7f3" },
  emerald:{ primary: "#10b981", glow: "rgba(16,185,129,0.9)", light: "#6ee7b7", dark: "#022c22", badge: "rgba(16,185,129,0.18)",  rgb: "16,185,129",  label: "#d1fae5" },
};

// ─── Icons per project ────────────────────────────────────────────────────────
function ProjectIcon({ color, size = 28 }: { color: string; size?: number }) {
  const c = COLORS[color] ?? COLORS.violet;
const icons: Record<string, React.ReactElement> = {
    violet: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={c.light} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke={c.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cyan: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke={c.light} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    amber: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8.5 14.5A2.5 2.5 0 0011 17c1.38 0 2.5-1.12 2.5-2.5S12.38 12 11 12" stroke={c.light} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 3h18v2a4 4 0 01-4 4H7a4 4 0 01-4-4V3z" stroke={c.light} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M3 21h18M8 21v-4h8v4" stroke={c.light} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    pink: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A6.07 6.07 0 0116.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" stroke={c.light} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    emerald: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke={c.light} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="7" r="2" stroke={c.light} strokeWidth="1.5"/>
      </svg>
    ),
  };
  return icons[color] ?? icons.violet;
}

// ─── Spiral (coil) SVG ────────────────────────────────────────────────────────
function Spiral({ color, rotate = 0, spinning = false }: { color: string; rotate?: number; spinning?: boolean }) {
  const c = COLORS[color] ?? COLORS.violet;
  return (
    <motion.svg
      width="100%"
      height="14"
      viewBox="0 0 120 14"
      fill="none"
      animate={spinning ? { rotate: [rotate, rotate + 360] } : { rotate }}
      transition={spinning ? { duration: 0.65, ease: "linear" } : { duration: 0 }}
      style={{ transformOrigin: "center" }}
    >
      {/* Coil path — 5 loops */}
      {[0, 20, 40, 60, 80, 100].map((x, i) => (
        <ellipse key={i} cx={x + 10} cy={7} rx={9} ry={4}
          stroke={c.primary} strokeWidth="1.5" fill="none" opacity={0.7 + i * 0.05}/>
      ))}
      <line x1="1" y1="7" x2="119" y2="7" stroke={c.primary} strokeWidth="1" opacity="0.3"/>
    </motion.svg>
  );
}

// ─── Product Package ──────────────────────────────────────────────────────────
function Package({
  project, isSelected, isFalling, onFallComplete,
}: {
  project: typeof missions[0];
  isSelected: boolean;
  isFalling: boolean;
  onFallComplete: () => void;
}) {
  const c = COLORS[project.color] ?? COLORS.violet;
  return (
    <motion.div
      className="relative w-full rounded-xl flex flex-col items-center justify-center py-3 px-2 cursor-default select-none"
      style={{
        background: isFalling
          ? `linear-gradient(160deg, ${c.dark}, #0a0a0f)`
          : isSelected
          ? `linear-gradient(160deg, ${c.dark} 0%, #0d0d18 100%)`
          : "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.3) 100%)",
        border: `1px solid ${isSelected ? c.primary : "rgba(255,255,255,0.08)"}`,
        boxShadow: isSelected
          ? `0 0 20px rgba(${c.rgb},0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
          : "none",
        transition: "all 0.3s ease",
        minHeight: 88,
      }}
      animate={
        isFalling
          ? { y: [0, 12, 200], opacity: [1, 1, 0], scale: [1, 1.05, 0.9] }
          : { y: 0, opacity: 1, scale: 1 }
      }
      transition={isFalling ? { duration: 0.65, ease: [0.4, 0, 0.6, 1] } : {}}
      onAnimationComplete={() => { if (isFalling) onFallComplete(); }}
    >
      {/* Glow when selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${c.rgb},0.35), transparent 70%)` }}
        />
      )}

      {/* Code badge */}
      <div
        className="absolute top-2 right-2 font-mono text-[9px] px-1.5 py-0.5 rounded-md"
        style={{ background: c.badge, color: c.label, border: `1px solid rgba(${c.rgb},0.3)` }}
      >
        {project.number}
      </div>

      {/* Icon */}
      <div className="mb-1.5">
        <ProjectIcon color={project.color} size={24} />
      </div>

      {/* Title */}
      <p
        className="font-black text-[11px] tracking-widest text-center leading-tight"
        style={{ color: c.light }}
      >
        {project.title}
      </p>
    </motion.div>
  );
}

// ─── LED indicator ────────────────────────────────────────────────────────────
function LED({ on, color = "#a855f7", pulse = false }: { on: boolean; color?: string; pulse?: boolean }) {
  return (
    <div className="relative w-2 h-2 rounded-full" style={{ background: on ? color : "rgba(255,255,255,0.08)", boxShadow: on ? `0 0 6px ${color}` : "none" }}>
      {on && pulse && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: color }}
          animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

// ─── Keypad button ────────────────────────────────────────────────────────────
function KeyBtn({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "clear" | "dispense";
}) {
  const [pressed, setPressed] = useState(false);

  const base =
    "relative font-mono font-bold transition-all duration-100 select-none cursor-pointer active:scale-95 rounded-xl overflow-hidden";

  const variants = {
    default: "h-12 text-sm text-white/70 hover:text-white",
    clear: "h-10 text-xs text-red-400 hover:text-red-300",
    dispense: "h-14 text-sm tracking-widest text-black font-black",
  };

  const bg = {
    default: pressed
      ? "rgba(255,255,255,0.12)"
      : "rgba(255,255,255,0.05)",
    clear: "rgba(239,68,68,0.1)",
    dispense: "",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`${base} ${variants[variant]}`}
      style={{
        background:
          variant === "dispense" ? undefined : bg[variant],

        border:
          variant === "dispense"
            ? "none"
            : "1px solid rgba(255,255,255,0.08)",

        boxShadow:
          pressed && variant !== "dispense"
            ? "inset 0 2px 4px rgba(0,0,0,0.5)"
            : variant !== "dispense"
            ? "0 2px 0 rgba(0,0,0,0.4)"
            : "",

        transform: pressed
          ? "translateY(1px)"
          : "translateY(0)",
      }}
    >
      {variant === "dispense" && (
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, #a855f7, #ec4899, #a855f7)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite linear",
          }}
        />
      )}

      <span className="relative z-10">
        {label}
      </span>
    </button>
  );
}

// ─── Output Tray ──────────────────────────────────────────────────────────────
function OutputTray({ project }: { project: typeof missions[0] | null }) {
  const c = project ? (COLORS[project.color] ?? COLORS.violet) : COLORS.violet;
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #060609 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: 180,
        boxShadow: "inset 0 4px 20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Tray slot opening */}
      <div
        className="absolute top-0 left-6 right-6 h-3 rounded-b-full"
        style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "none" }}
      />

      {/* Tray label */}
      <div className="absolute top-4 left-4">
        <p className="font-mono text-[9px] tracking-[0.35em] text-white/20">OUTPUT TRAY</p>
      </div>

      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.id}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="p-5 pt-8"
          >
            <div className="flex items-start gap-4">
              {/* Color chip */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                style={{ background: c.badge, border: `1px solid rgba(${c.rgb},0.4)`, boxShadow: `0 0 16px rgba(${c.rgb},0.25)` }}
              >
                <ProjectIcon color={project.color} size={20} />
              </div>

              <div className="flex-1 min-w-0">
<h2
  className="
    font-black
    text-3xl
    md:text-5xl
    tracking-tight
    text-white
  "
>
  Máquina Expendedora de Proyectos
</h2>
                <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] px-2 py-0.5 rounded-md"
                      style={{ background: c.badge, color: c.label, border: `1px solid rgba(${c.rgb},0.25)` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-black text-xs tracking-widest px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.primary}cc)`, color: "#000", boxShadow: `0 0 20px rgba(${c.rgb},0.5)` }}
                >
                  VISIT WEBSITE
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 8.5l7-7M8.5 1.5h-5M8.5 1.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full py-12 gap-2"
          >
            <div className="w-8 h-1 rounded-full bg-white/10 mb-1" />
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/15">ENTER CODE · PRESS DISPENSE</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Machine ─────────────────────────────────────────────────────────────
export default function MissionsMachine() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<typeof missions[0] | null>(null);
  const [dispensing, setDispensing] = useState(false);
  const [fallingId, setFallingId] = useState<number | null>(null);
  const [dispensed, setDispensed] = useState<typeof missions[0] | null>(null);
  const [error, setError] = useState(false);
  const [powerOn, setPowerOn] = useState(true);
  const errorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Select project when valid input entered
  useEffect(() => {
    if (input.length === 2) {
      const found = missions.find((m) => m.number === input);
      if (found) {
        setSelected(found);
        setError(false);
      } else {
        setSelected(null);
        setError(true);
        if (errorTimeout.current) clearTimeout(errorTimeout.current);
        errorTimeout.current = setTimeout(() => setError(false), 1200);
      }
    } else {
      setSelected(null);
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const pressNumber = (num: string) => {
    if (dispensing) return;
    if (input.length >= 2) {
      setInput(num);
    } else {
      setInput((prev) => prev + num);
    }
  };

  const clearInput = () => {
    if (dispensing) return;
    setInput("");
    setSelected(null);
    setError(false);
  };

  const dispense = () => {
    if (dispensing || !selected) return;
    setDispensing(true);
    setFallingId(selected.id);
  };

  const handleFallComplete = () => {
    const project = missions.find((m) => m.id === fallingId)!;
    setDispensed(project);
    setFallingId(null);
    setDispensing(false);
    setInput("");
    setSelected(null);
  };

  const selectedColor = selected ? (COLORS[selected.color] ?? COLORS.violet) : null;
  const dispensedColor = dispensed ? (COLORS[dispensed.color] ?? COLORS.violet) : null;

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">

  {/* Background espacial */}
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <OrbitBackground />
  </div>

  <div className="absolute inset-0 opacity-50 pointer-events-none">
    <Stars />
  </div>
      {/* Global shimmer animation */}
      <style>{`
        @keyframes shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
        @keyframes flicker { 0%,95%,100% { opacity: 1; } 96%,99% { opacity: 0.85; } }
      `}</style>

      {/* Ambient floor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(88,28,135,0.12), transparent 70%)" }} />

      {/* Section header */}
      <div className="text-center mb-10">
        <p className="font-mono text-[10px] tracking-[0.5em] text-white/25 mb-3 uppercase">Proyectos</p>
        <h2 className="font-black text-4xl md:text-5xl tracking-tight text-white" style={{ textShadow: "0 0 60px rgba(168,85,247,0.3)" }}>
          Project{" "}
          <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Dispenser
          </span>
        </h2>
      </div>

      {/* ═══════════════════ MACHINE CHASSIS ═══════════════════ */}
      <div className="relative max-w-4xl mx-auto flex justify-center">

        {/* Drop shadow + outer glow */}
        <div
          className="absolute -inset-4 rounded-[48px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(88,28,135,0.25), transparent 70%)", filter: "blur(20px)" }}
        />

        {/* Main chassis body */}
        <div
         className="relative rounded-[36px] overflow-hidden w-full max-w-[950px]"
          style={{
            background: "linear-gradient(180deg, #1a1a28 0%, #0d0d18 40%, #080810 100%)",
            border: "2px solid rgba(255,255,255,0.1)",
            boxShadow: [
              "0 40px 100px rgba(0,0,0,0.8)",
              "0 0 0 1px rgba(255,255,255,0.04)",
              "inset 0 1px 0 rgba(255,255,255,0.08)",
              "inset 0 -1px 0 rgba(0,0,0,0.5)",
            ].join(", "),
          }}
        >
          {/* Chassis top ridge */}
          <div
            className="h-8 w-full flex items-center justify-between px-8"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Branding strip */}
            <div className="flex items-center gap-2">
              <LED on={powerOn} color="#a855f7" pulse />
              <LED on={powerOn} color="#06b6d4" />
              <LED on={powerOn} color="#10b981" />
              <span className="font-mono text-[9px] tracking-[0.4em] text-white/25 ml-2">PROJECT DISPENSER v2.0</span>
            </div>
            <div className="flex items-center gap-3">
              <LED on={!!selected} color={selectedColor?.primary ?? "#fff"} pulse={!!selected} />
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
                {selected ? "READY" : dispensing ? "DISPENSING" : "STANDBY"}
              </span>
            </div>
          </div>

          {/* ──── GLASS CABINET ──── */}
          <div className="px-5 pt-4 pb-0">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(20,20,40,0.95) 0%, rgba(8,8,20,0.98) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 2px 12px rgba(0,0,0,0.6), inset 0 -4px 16px rgba(0,0,0,0.4)",
              }}
            >
              {/* Glass reflection highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-2xl"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)" }}
              />
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" style={{ zIndex: 3 }}>
                <div
                  className="absolute left-0 right-0 h-16 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.015) 50%, transparent)",
                    animation: "scanline 6s linear infinite",
                    top: 0,
                  }}
                />
              </div>

              {/* Cabinet interior light */}
              {selected && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-500"
                  style={{
                    background: `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(${selectedColor?.rgb},0.08), transparent 60%)`,
                  }}
                />
              )}

              {/* Ceiling LED strip inside cabinet */}
              <div
                className="relative mx-4 mt-3 mb-3 h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: "100%",
                    background: selected
                      ? `linear-gradient(90deg, transparent 0%, rgba(${selectedColor?.rgb},0.6) 30%, rgba(${selectedColor?.rgb},0.9) 50%, rgba(${selectedColor?.rgb},0.6) 70%, transparent 100%)`
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent)",
                    boxShadow: selected ? `0 0 12px rgba(${selectedColor?.rgb},0.6)` : "none",
                  }}
                />
              </div>

              {/* Products grid — 5 slots in a row */}
              <div className="grid grid-cols-5 gap-2 px-3 pb-1">
                {missions.map((project) => {
                  const c = COLORS[project.color] ?? COLORS.violet;
                  const isSelected = selected?.id === project.id;
                  const isFalling = fallingId === project.id;
                  return (
                    <div key={project.id} className="flex flex-col gap-1">
                      <Package
                        project={project}
                        isSelected={isSelected}
                        isFalling={isFalling}
                        onFallComplete={handleFallComplete}
                      />
                      {/* Vending spiral below each package */}
                      <div className="px-1">
                        <Spiral
                          color={project.color}
                          rotate={0}
                          spinning={isFalling}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Glass bottom shelf */}
              <div
                className="mx-4 mb-3 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)" }}
              />
            </div>
          </div>

          {/* ──── CONTROL PANEL BEZEL ──── */}
          <div
            className="mx-5 mt-3 rounded-xl px-4 py-3"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">

              {/* LEFT: Digital display + keypad */}
              <div className="flex flex-col gap-3">
                {/* Digital display */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background: "#030308",
                    border: `1px solid ${error ? "rgba(239,68,68,0.5)" : selected ? `rgba(${selectedColor?.rgb},0.4)` : "rgba(255,255,255,0.06)"}`,
                    boxShadow: error
                      ? "0 0 12px rgba(239,68,68,0.3), inset 0 2px 8px rgba(0,0,0,0.8)"
                      : selected
                      ? `0 0 16px rgba(${selectedColor?.rgb},0.35), inset 0 2px 8px rgba(0,0,0,0.8)`
                      : "inset 0 2px 8px rgba(0,0,0,0.8)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* CRT scanlines on display */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)" }} />

                  <div className="relative px-4 py-3 text-center">
                    <p className="font-mono text-[8px] tracking-[0.4em] mb-1" style={{ color: error ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.2)" }}>
                      {error ? "INVALID CODE" : "ENTER CODE"}
                    </p>
                    <motion.div
                      className="font-mono font-black text-4xl tracking-[0.2em] leading-none"
                      animate={error ? { x: [-3, 3, -3, 3, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      style={{
                        color: error ? "#ef4444" : selected ? selectedColor?.primary : "rgba(255,255,255,0.25)",
                        textShadow: selected ? `0 0 20px rgba(${selectedColor?.rgb},0.8)` : error ? "0 0 20px rgba(239,68,68,0.8)" : "none",
                        fontVariantNumeric: "tabular-nums",
                        animation: powerOn ? "flicker 8s infinite" : "none",
                      }}
                    >
                      {input.length === 0 ? "—" : input.length === 1 ? `${input}_` : input}
                    </motion.div>
                    {selected && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[9px] tracking-[0.25em] mt-1.5 truncate"
                        style={{ color: selectedColor?.label, opacity: 0.7 }}
                      >
                        {selected.title}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Numeric keypad */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <KeyBtn key={n} label={String(n)} onClick={() => pressNumber(String(n))} />
                  ))}
                  <KeyBtn label="CLR" onClick={clearInput} variant="clear" />
                  <KeyBtn label="0" onClick={() => pressNumber("0")} />
                  <div />
                </div>

                {/* Code hint */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {missions.map((m) => {
                    const mc = COLORS[m.color] ?? COLORS.violet;
                    return (
                      <button
                        key={m.id}
                        onClick={() => { if (!dispensing) { setInput(m.number); } }}
                        className="font-mono text-[9px] px-2 py-0.5 rounded-md transition-all hover:scale-105"
                        style={{ background: mc.badge, color: mc.label, border: `1px solid rgba(${mc.rgb},0.2)` }}
                      >
                        {m.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CENTER: Divider + decorative */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <div className="w-px h-24 rounded-full" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: selected ? selectedColor?.primary : "rgba(255,255,255,0.06)", boxShadow: selected ? `0 0 10px rgba(${selectedColor?.rgb},0.8)` : "none", transition: "all 0.4s" }} />
                <div className="w-px h-24 rounded-full" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
              </div>

              {/* RIGHT: Dispense button + status */}
              <div className="flex flex-col gap-3">
                {/* Status readout */}
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="font-mono text-[8px] tracking-[0.3em] text-white/20 mb-1">STATUS</p>
                  <div className="flex items-center justify-center gap-2">
                    <LED
                      on={!dispensing}
                      color={error ? "#ef4444" : selected ? selectedColor?.primary : "#10b981"}
                      pulse={!!selected && !dispensing}
                    />
                    <span
                      className="font-mono text-xs font-bold tracking-widest transition-all duration-300"
                      style={{ color: error ? "#ef4444" : dispensing ? "#fbbf24" : selected ? selectedColor?.primary : "rgba(255,255,255,0.2)" }}
                    >
                      {error ? "INVALID" : dispensing ? "WORKING" : selected ? "READY" : "STANDBY"}
                    </span>
                  </div>
                </div>

                {/* Dispensed counter */}
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="font-mono text-[8px] tracking-[0.3em] text-white/20 mb-1">STOCK</p>
                  <div className="flex items-center justify-center gap-1.5">
                    {missions.map((m) => {
                      const mc = COLORS[m.color] ?? COLORS.violet;
                      return (
                        <div key={m.id} className="w-2 h-2 rounded-full" style={{ background: mc.primary, opacity: 0.7 }} />
                      );
                    })}
                  </div>
                </div>

                {/* BIG DISPENSE BUTTON */}
                <motion.button
                  onClick={dispense}
                  disabled={!selected || dispensing}
                  whileTap={selected && !dispensing ? { scale: 0.93 } : {}}
                  className="relative w-full rounded-2xl overflow-hidden font-black text-sm tracking-[0.25em] text-black transition-all duration-300"
                  style={{
                    height: 72,
                    background: selected && !dispensing
                      ? `linear-gradient(135deg, ${selectedColor?.primary}, ${selectedColor?.primary}bb)`
                      : dispensing
                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                      : "rgba(255,255,255,0.04)",
                    border: selected
                      ? `1px solid ${selectedColor?.primary}`
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: selected && !dispensing
                      ? `0 0 40px rgba(${selectedColor?.rgb},0.5), 0 4px 0 rgba(${selectedColor?.rgb},0.3), inset 0 1px 0 rgba(255,255,255,0.2)`
                      : dispensing
                      ? "0 0 30px rgba(251,191,36,0.5)"
                      : "0 2px 0 rgba(0,0,0,0.3)",
                    color: selected || dispensing ? "#000" : "rgba(255,255,255,0.12)",
                    cursor: selected && !dispensing ? "pointer" : "default",
                    transform: selected && !dispensing ? "translateY(0)" : "translateY(0)",
                  }}
                >
                  {/* Button surface gloss */}
                  {(selected || dispensing) && (
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }} />
                  )}

                  <AnimatePresence mode="wait">
                    {dispensing ? (
                      <motion.div
                        key="spinning"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center gap-1"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 rounded-full border-2 border-black border-t-transparent"
                        />
                        <span className="text-[10px] font-black tracking-widest">DISPENSING</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-0.5"
                      >
                        <span className="text-lg">↓</span>
                        <span className="text-[11px] tracking-[0.25em]">DISPENSE</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Button recess shadow */}
                <div className="h-1 -mt-2 mx-2 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }} />

                {/* Instruction text */}
                <p className="font-mono text-[8px] tracking-[0.2em] text-white/15 text-center leading-relaxed">
                  TYPE 01–05<br />THEN PRESS DISPENSE
                </p>
              </div>
            </div>
          </div>

          {/* ──── OUTPUT TRAY ──── */}
          <div className="mx-5 mt-3 mb-5">
            {/* Tray opening slot */}
            <div
              className="mx-8 h-2 -mb-1 rounded-full relative z-10"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.9), rgba(20,20,30,0.95), rgba(0,0,0,0.9))", border: "1px solid rgba(255,255,255,0.05)", borderBottom: "none" }}
            >
              {/* Slot line */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-px" style={{ background: "rgba(0,0,0,0.8)" }} />
            </div>

            <OutputTray project={dispensed} />
          </div>

          {/* Chassis bottom strip */}
          <div
            className="h-6 flex items-center justify-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-px bg-white/8" />
              <p className="font-mono text-[8px] tracking-[0.4em] text-white/10">SOFIA MIRANDA — PORTFOLIO</p>
              <div className="w-12 h-px bg-white/8" />
            </div>
          </div>
        </div>

        {/* Machine feet */}
        <div className="flex justify-between px-12 mt-0.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-2 rounded-b-lg"
              style={{ background: "linear-gradient(180deg, #1a1a28, #0d0d18)", border: "1px solid rgba(255,255,255,0.06)", borderTop: "none" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
