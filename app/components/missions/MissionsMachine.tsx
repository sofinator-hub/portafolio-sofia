"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { missions } from "../../data/missions";

// ─── Color palette per project ────────────────────────────────────────────────
const COLORS: Record<string, {
  primary: string; glow: string; light: string; dark: string;
  badge: string; rgb: string; label: string;
  bg1: string; bg2: string; stripe: string;
}> = {
  violet: { primary: "#7c3aed", glow: "rgba(124,58,237,0.6)", light: "#c4b5fd", dark: "#2e1065", badge: "rgba(124,58,237,0.15)", rgb: "124,58,237", label: "#ede9fe", bg1: "#4c1d95", bg2: "#7c3aed", stripe: "#6d28d9" },
  cyan:   { primary: "#0891b2", glow: "rgba(8,145,178,0.6)",  light: "#a5f3fc", dark: "#0c4a6e", badge: "rgba(8,145,178,0.15)",   rgb: "8,145,178",   label: "#e0f2fe", bg1: "#0e7490", bg2: "#06b6d4", stripe: "#0284c7" },
  amber:  { primary: "#d97706", glow: "rgba(217,119,6,0.6)",  light: "#fde68a", dark: "#78350f", badge: "rgba(217,119,6,0.15)",   rgb: "217,119,6",   label: "#fef3c7", bg1: "#b45309", bg2: "#f59e0b", stripe: "#d97706" },
  pink:   { primary: "#be185d", glow: "rgba(190,24,93,0.6)",  light: "#fbcfe8", dark: "#500724", badge: "rgba(190,24,93,0.15)",   rgb: "190,24,93",   label: "#fce7f3", bg1: "#9d174d", bg2: "#ec4899", stripe: "#be185d" },
  emerald:{ primary: "#047857", glow: "rgba(4,120,87,0.6)",   light: "#6ee7b7", dark: "#022c22", badge: "rgba(4,120,87,0.15)",    rgb: "4,120,87",    label: "#d1fae5", bg1: "#065f46", bg2: "#10b981", stripe: "#059669" },
};

// ─── Snack product shapes ─────────────────────────────────────────────────────
// 01 violet → chips bag   02 cyan → choc bar   03 amber → cookies
// 04 pink → energy bar    05 emerald → soda can

function ChipsBag({ c, title, code, isSelected }: { c: typeof COLORS.violet; title: string; code: string; isSelected: boolean }) {
  return (
    <svg viewBox="0 0 54 80" fill="none" width="100%" style={{ filter: isSelected ? `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      {/* Bag body — pinched middle */}
      <path d="M10 16 Q6 40 10 64 Q27 70 44 64 Q48 40 44 16 Q27 10 10 16Z"
        fill={`url(#bag${code})`} stroke={c.primary} strokeWidth="1"/>
      <defs>
        <linearGradient id={`bag${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.bg1}/>
          <stop offset="50%" stopColor={c.bg2}/>
          <stop offset="100%" stopColor={c.bg1}/>
        </linearGradient>
      </defs>
      {/* Bag top crimp */}
      <path d="M12 16 Q27 8 42 16 L40 12 Q27 4 14 12Z" fill={c.stripe} opacity="0.9"/>
      {/* Bag bottom crimp */}
      <path d="M12 64 Q27 72 42 64 L40 68 Q27 76 14 68Z" fill={c.stripe} opacity="0.9"/>
      {/* Shine */}
      <path d="M14 22 Q18 40 14 58" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round"/>
      {/* Label area */}
      <rect x="13" y="28" width="28" height="24" rx="3" fill="rgba(0,0,0,0.25)"/>
      {/* Code */}
      <text x="27" y="38" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontWeight="bold" fontFamily="monospace">{code}</text>
      {/* Title — wrapped */}
      <text x="27" y="48" textAnchor="middle" fill={c.light} fontSize="5.5" fontWeight="bold" fontFamily="monospace">{title.length > 8 ? title.slice(0,8) : title}</text>
      {/* Stars deco */}
      <text x="21" y="56" fill={c.light} fontSize="5" opacity="0.6">★★★</text>
    </svg>
  );
}

function ChocolateBar({ c, title, code, isSelected }: { c: typeof COLORS.violet; title: string; code: string; isSelected: boolean }) {
  return (
    <svg viewBox="0 0 50 80" fill="none" width="100%" style={{ filter: isSelected ? `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id={`bar${code}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.bg2}/>
          <stop offset="100%" stopColor={c.bg1}/>
        </linearGradient>
      </defs>
      {/* Wrapper */}
      <rect x="5" y="4" width="40" height="72" rx="4" fill={`url(#bar${code})`} stroke={c.primary} strokeWidth="1"/>
      {/* Top fold */}
      <rect x="5" y="4" width="40" height="12" rx="4" fill={c.stripe}/>
      <rect x="5" y="12" width="40" height="4" fill={c.stripe}/>
      {/* Bottom fold */}
      <rect x="5" y="68" width="40" height="8" rx="4" fill={c.stripe}/>
      {/* Shine */}
      <rect x="9" y="18" width="4" height="46" rx="2" fill="rgba(255,255,255,0.15)"/>
      {/* Chocolate squares */}
      {[0,1,2].map(row => [0,1].map(col => (
        <rect key={`${row}${col}`}
          x={13 + col * 14} y={22 + row * 13}
          width="11" height="10" rx="1.5"
          fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
      )))}
      {/* Label */}
      <text x="25" y="62" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="6" fontWeight="bold" fontFamily="monospace">{code}</text>
      <text x="25" y="70" textAnchor="middle" fill={c.light} fontSize="4.5" fontFamily="monospace">{title.slice(0,9)}</text>
    </svg>
  );
}

function CookiesPack({ c, title, code, isSelected }: { c: typeof COLORS.violet; title: string; code: string; isSelected: boolean }) {
  return (
    <svg viewBox="0 0 54 80" fill="none" width="100%" style={{ filter: isSelected ? `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id={`cook${code}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.bg2}/>
          <stop offset="100%" stopColor={c.bg1}/>
        </linearGradient>
      </defs>
      {/* Pillow pack */}
      <rect x="4" y="6" width="46" height="68" rx="8" fill={`url(#cook${code})`} stroke={c.primary} strokeWidth="1"/>
      {/* Top seal */}
      <rect x="4" y="6" width="46" height="10" rx="8" fill={c.stripe}/>
      <rect x="4" y="12" width="46" height="4" fill={c.stripe}/>
      {/* Bottom seal */}
      <rect x="4" y="64" width="46" height="10" rx="8" fill={c.stripe}/>
      {/* Cookies illustration */}
      {[{cx:17,cy:32},{cx:37,cy:32},{cx:27,cy:48}].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.cx} cy={pos.cy} r="9" fill="rgba(0,0,0,0.2)"/>
          <circle cx={pos.cx} cy={pos.cy} r="7" fill={c.light} opacity="0.2"/>
          {[0,60,120,180,240,300].map(deg => (
            <circle key={deg} cx={pos.cx + 4 * Math.cos(deg*Math.PI/180)} cy={pos.cy + 4 * Math.sin(deg*Math.PI/180)} r="1.2" fill={c.stripe} opacity="0.7"/>
          ))}
        </g>
      ))}
      {/* Label */}
      <text x="27" y="64" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="6" fontWeight="bold" fontFamily="monospace">{code}</text>
      <text x="27" y="72" textAnchor="middle" fill={c.light} fontSize="4.5" fontFamily="monospace">{title.slice(0,9)}</text>
    </svg>
  );
}

function EnergyBar({ c, title, code, isSelected }: { c: typeof COLORS.violet; title: string; code: string; isSelected: boolean }) {
  return (
    <svg viewBox="0 0 50 80" fill="none" width="100%" style={{ filter: isSelected ? `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id={`energy${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.bg1}/>
          <stop offset="100%" stopColor={c.bg2}/>
        </linearGradient>
      </defs>
      {/* Main bar */}
      <rect x="4" y="6" width="42" height="68" rx="5" fill={`url(#energy${code})`} stroke={c.primary} strokeWidth="1"/>
      {/* Diagonal stripes */}
      {[-2,6,14,22,30,38,46].map((x,i) => (
        <line key={i} x1={x+4} y1={6} x2={x-8} y2={74} stroke={c.stripe} strokeWidth="4" opacity="0.35"/>
      ))}
      {/* Label panel */}
      <rect x="8" y="14" width="34" height="52" rx="3" fill="rgba(0,0,0,0.3)"/>
      {/* Lightning bolt */}
      <path d="M27 22 L21 38 H27 L22 54 L33 35 H27 L31 22Z" fill={c.light} opacity="0.85"/>
      {/* Code */}
      <text x="25" y="62" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="6.5" fontWeight="bold" fontFamily="monospace">{code}</text>
      <text x="25" y="70" textAnchor="middle" fill={c.light} fontSize="4" fontFamily="monospace">{title.slice(0,8)}</text>
    </svg>
  );
}

function SodaCan({ c, title, code, isSelected }: { c: typeof COLORS.violet; title: string; code: string; isSelected: boolean }) {
  return (
    <svg viewBox="0 0 48 80" fill="none" width="100%" style={{ filter: isSelected ? `drop-shadow(0 0 8px rgba(${c.rgb},0.7))` : "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
      <defs>
        <linearGradient id={`can${code}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.bg1}/>
          <stop offset="40%" stopColor={c.bg2}/>
          <stop offset="100%" stopColor={c.bg1}/>
        </linearGradient>
      </defs>
      {/* Can body */}
      <rect x="6" y="10" width="36" height="58" fill={`url(#can${code})`}/>
      {/* Top cap */}
      <ellipse cx="24" cy="10" rx="18" ry="4" fill={c.stripe}/>
      <ellipse cx="24" cy="10" rx="12" ry="2.5" fill="#9ca3af"/>
      {/* Pull tab */}
      <ellipse cx="24" cy="8" rx="5" ry="1.5" fill="#d1d5db" stroke="#6b7280" strokeWidth="0.5"/>
      <rect x="22" y="5" width="4" height="5" rx="1" fill="#d1d5db" stroke="#6b7280" strokeWidth="0.5"/>
      {/* Bottom cap */}
      <ellipse cx="24" cy="68" rx="18" ry="4" fill={c.stripe}/>
      <ellipse cx="24" cy="68" rx="15" ry="2.5" fill={c.bg1}/>
      {/* Shine */}
      <rect x="9" y="12" width="4" height="54" fill="rgba(255,255,255,0.2)" rx="2"/>
      {/* Label band */}
      <rect x="6" y="22" width="36" height="34" fill="rgba(0,0,0,0.15)"/>
      {/* Brand text */}
      <text x="24" y="37" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="7" fontWeight="bold" fontFamily="monospace">{code}</text>
      <text x="24" y="48" textAnchor="middle" fill={c.light} fontSize="4.5" fontFamily="monospace">{title.slice(0,9)}</text>
      {/* Decorative lines */}
      <line x1="8" y1="23" x2="40" y2="23" stroke={c.light} strokeWidth="0.5" opacity="0.4"/>
      <line x1="8" y1="55" x2="40" y2="55" stroke={c.light} strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

const SNACK_SHAPES = ["chips", "chocolate", "cookies", "energy", "can"] as const;

function SnackProduct({ project, isSelected, isFalling, onFallComplete }: {
  project: typeof missions[0];
  isSelected: boolean;
  isFalling: boolean;
  onFallComplete: () => void;
}) {
  const c = COLORS[project.color] ?? COLORS.violet;
  const shape = SNACK_SHAPES[(project.id - 1) % SNACK_SHAPES.length];
  const props = { c, title: project.title, code: project.number, isSelected };

  return (
    <motion.div
      className="relative w-full cursor-default select-none flex items-end justify-center"
      style={{ height: 88 }}
      animate={isFalling ? { y: [0, 10, 180], opacity: [1, 1, 0], rotate: [0, -8, 12] } : { y: 0, opacity: 1, rotate: 0 }}
      transition={isFalling ? { duration: 0.55, ease: [0.4, 0, 1, 1] } : { duration: 0.2 }}
      onAnimationComplete={() => { if (isFalling) onFallComplete(); }}
    >
      {/* Selection highlight glow behind product */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(${c.rgb},0.25), transparent 70%)`,
        }}/>
      )}
      <div className="w-full h-full flex items-center justify-center px-1">
        {shape === "chips"     && <ChipsBag {...props}/>}
        {shape === "chocolate" && <ChocolateBar {...props}/>}
        {shape === "cookies"   && <CookiesPack {...props}/>}
        {shape === "energy"    && <EnergyBar {...props}/>}
        {shape === "can"       && <SodaCan {...props}/>}
      </div>
    </motion.div>
  );
}

// ─── Realistic vending coil ───────────────────────────────────────────────────
function VendingCoil({ color, spinning }: { color: string; spinning: boolean }) {
  const c = COLORS[color] ?? COLORS.violet;
  const coilColor = "#9ca3af";
  const coilShadow = "#6b7280";
  const loops = 6;
  const w = 100;
  const h = 10;
  const r = 4;

  return (
    <motion.svg
      width="100%" height={h} viewBox={`0 0 ${w} ${h}`} fill="none"
      animate={spinning ? { rotateX: [0, 360] } : {}}
      transition={spinning ? { duration: 0.5, repeat: 1, ease: "linear" } : {}}
      style={{ transformOrigin: "center", display: "block" }}
    >
      {/* Back rod */}
      <line x1="2" y1={h/2} x2={w-2} y2={h/2} stroke={coilShadow} strokeWidth="1.5"/>
      {/* Coil loops */}
      {Array.from({ length: loops }).map((_, i) => {
        const cx = 2 + (i + 0.5) * ((w - 4) / loops);
        return (
          <g key={i}>
            {/* Back half of ellipse (shadow) */}
            <path
              d={`M ${cx - r*1.4} ${h/2} A ${r*1.4} ${r} 0 0 1 ${cx + r*1.4} ${h/2}`}
              stroke={coilShadow} strokeWidth="1.2" fill="none"
            />
            {/* Front half */}
            <path
              d={`M ${cx - r*1.4} ${h/2} A ${r*1.4} ${r} 0 0 0 ${cx + r*1.4} ${h/2}`}
              stroke={coilColor} strokeWidth="1.5" fill="none"
            />
          </g>
        );
      })}
    </motion.svg>
  );
}

// ─── Keypad button ────────────────────────────────────────────────────────────
function KeyBtn({ label, onClick, variant = "default" }: {
  label: string; onClick: () => void; variant?: "default" | "clear";
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick(); }}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onClick(); }}
      className="relative font-mono font-bold select-none cursor-pointer rounded-lg transition-all duration-75"
      style={{
        height: 40,
        fontSize: 13,
        background: pressed
          ? "rgba(30,30,40,0.9)"
          : "linear-gradient(180deg, rgba(60,60,80,0.6) 0%, rgba(30,30,45,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.6)"
          : "0 2px 0 rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        color: variant === "clear" ? "#f87171" : "rgba(255,255,255,0.75)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
      }}
    >
      {label}
    </button>
  );
}

// ─── Output Tray ──────────────────────────────────────────────────────────────
function OutputTray({ project }: { project: typeof missions[0] | null }) {
  const c = project ? (COLORS[project.color] ?? COLORS.violet) : COLORS.violet;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #111118 0%, #0c0c12 100%)",
        borderRadius: "0 0 16px 16px",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: "none",
        minHeight: 160,
        boxShadow: "inset 0 6px 20px rgba(0,0,0,0.7)",
      }}
    >
      {/* Tray interior floor texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.012) 20px, rgba(255,255,255,0.012) 21px)",
      }}/>

      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.id}
            initial={{ y: -50, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
            className="p-5"
          >
            <div className="flex items-start gap-4">
              {/* Snack thumbnail */}
              <div className="flex-shrink-0 w-12" style={{ height: 56 }}>
                {(() => {
                  const shape = SNACK_SHAPES[(project.id - 1) % SNACK_SHAPES.length];
                  const pp = { c, title: project.title, code: project.number, isSelected: false };
                  return (
                    <>
                      {shape === "chips"     && <ChipsBag {...pp}/>}
                      {shape === "chocolate" && <ChocolateBar {...pp}/>}
                      {shape === "cookies"   && <CookiesPack {...pp}/>}
                      {shape === "energy"    && <EnergyBar {...pp}/>}
                      {shape === "can"       && <SodaCan {...pp}/>}
                    </>
                  );
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] tracking-[0.3em] mb-0.5" style={{ color: c.primary }}>
                  DISPENSED
                </p>
                <h3 className="font-black tracking-wider text-lg text-white leading-none mb-1.5">
                  {project.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed mb-2.5 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.45)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-xs tracking-widest px-4 py-2 rounded-lg transition-all hover:brightness-110 active:scale-95"
                  style={{
                    background: c.primary,
                    color: "#fff",
                    boxShadow: `0 4px 16px rgba(${c.rgb},0.35)`,
                  }}
                >
                  VISIT WEBSITE
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 8L8 1M8 1H3M8 1v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
            className="flex flex-col items-center justify-center py-10 gap-2"
          >
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" opacity="0.12">
              <rect x="1" y="1" width="26" height="18" rx="3" stroke="white" strokeWidth="1.5"/>
              <line x1="8" y1="1" x2="8" y2="19" stroke="white" strokeWidth="1"/>
              <line x1="1" y1="10" x2="27" y2="10" stroke="white" strokeWidth="1"/>
            </svg>
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/15">ENTER CODE · PRESS DISPENSE</p>
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
  const errorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (input.length === 2) {
      const found = missions.find((m) => m.number === input);
      if (found) { setSelected(found); setError(false); }
      else {
        setSelected(null); setError(true);
        if (errorTimeout.current) clearTimeout(errorTimeout.current);
        errorTimeout.current = setTimeout(() => setError(false), 1200);
      }
    } else { setSelected(null); setError(false); }
  }, [input]);

  const pressNumber = (num: string) => {
    if (dispensing) return;
    if (input.length >= 2) setInput(num);
    else setInput((prev) => prev + num);
  };

  const clearInput = () => {
    if (dispensing) return;
    setInput(""); setSelected(null); setError(false);
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

  return (
    <section id="projects" className="relative py-20 px-4 overflow-hidden">
      <style>{`
        @keyframes flicker { 0%,97%,100%{opacity:1} 98%{opacity:0.8} }
        @keyframes glassSheen {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
      `}</style>

      {/* Very subtle floor shadow beneath machine */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-8 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)" }}/>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-mono text-[10px] tracking-[0.5em] text-white/25 mb-2 uppercase">Proyectos</p>
        <h2 className="font-black text-3xl md:text-4xl tracking-tight text-white">
          Project{" "}
          <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Dispenser
          </span>
        </h2>
      </div>

      {/* ═══════════════ MACHINE ═══════════════ */}
      <div className="relative mx-auto" style={{ maxWidth: 480 }}>

        {/* Machine outer shadow */}
        <div className="absolute -inset-3 rounded-[28px] pointer-events-none"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 10px 30px rgba(0,0,0,0.5)" }}/>

        {/* ── CHASSIS ── */}
        <div
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #2a2a35 0%, #1c1c26 30%, #14141e 100%)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.1)",
              "inset 1px 0 0 rgba(255,255,255,0.05)",
              "inset -1px 0 0 rgba(255,255,255,0.03)",
              "inset 0 -2px 0 rgba(0,0,0,0.4)",
            ].join(", "),
          }}
        >
          {/* ── TOP HEADER STRIP ── */}
          <div
            className="flex items-center justify-between px-5 py-2.5"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2">
              {/* Power LED */}
              <div className="relative w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 5px #22c55e" }}>
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping" style={{ opacity: 0.35 }}/>
              </div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-white/25">PROJECT DISPENSER</span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/18">SOFIA MIRANDA</span>
          </div>

          {/* ── GLASS CABINET ── */}
          <div className="px-4 pt-3 pb-0">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(12,14,28,0.97) 0%, rgba(8,10,20,0.99) 100%)",
                border: "1.5px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 3px 16px rgba(0,0,0,0.7), inset 0 -2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {/* Glass glare — animated sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none" style={{ zIndex: 10 }}>
                <div
                  style={{
                    position: "absolute", top: 0, left: 0, width: "30%", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 50%, transparent)",
                    animation: "glassSheen 8s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Glass top reflection bar */}
              <div className="absolute top-0 left-4 right-4 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 70%, transparent)" }}/>

              {/* Interior ceiling fluorescent light */}
              <div className="mx-6 mt-2.5 mb-2 h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: selected
                      ? `linear-gradient(90deg, transparent, rgba(${selectedColor?.rgb},0.7) 30%, rgba(${selectedColor?.rgb},1) 50%, rgba(${selectedColor?.rgb},0.7) 70%, transparent)`
                      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent)",
                    boxShadow: selected
                      ? `0 0 10px rgba(${selectedColor?.rgb},0.8), 0 0 20px rgba(${selectedColor?.rgb},0.3)`
                      : "0 0 8px rgba(255,255,255,0.2)",
                  }}
                />
              </div>

              {/* Interior ambient when item selected */}
              {selected && (
                <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500" style={{
                  background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${selectedColor?.rgb},0.06), transparent 60%)`,
                }}/>
              )}

              {/* ── PRODUCT ROWS ── */}
              <div className="px-3 pb-2 flex flex-col gap-1">
                {/* Shelf back wall */}
                <div className="grid grid-cols-5 gap-2">
                  {missions.map((project) => {
                    const isSelected = selected?.id === project.id;
                    const isFalling = fallingId === project.id;
                    return (
                      <div key={project.id} className="flex flex-col items-center">
                        {/* Product */}
                        <SnackProduct
                          project={project}
                          isSelected={isSelected}
                          isFalling={isFalling}
                          onFallComplete={handleFallComplete}
                        />
                        {/* Coil directly below product */}
                        <div className="w-full px-0.5 -mt-1">
                          <VendingCoil color={project.color} spinning={isFalling}/>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shelf surface */}
                <div
                  className="h-2 rounded-sm mt-0.5"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(0,0,0,0.3)",
                  }}
                />
              </div>

              {/* Code hints inside glass */}
              <div className="flex justify-around px-3 pb-2.5 pt-0.5">
                {missions.map((m) => {
                  const mc = COLORS[m.color] ?? COLORS.violet;
                  return (
                    <button
                      key={m.id}
                      onClick={() => { if (!dispensing) setInput(m.number); }}
                      className="font-mono text-[8px] font-bold transition-all hover:scale-110"
                      style={{ color: mc.primary, opacity: 0.65 }}
                    >
                      {m.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── CONTROL PANEL ── */}
          <div
            className="mx-4 mt-2.5 rounded-xl px-3 py-3"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.15) 100%)",
              border: "1px solid rgba(255,255,255,0.055)",
            }}
          >
            <div className="flex gap-3 items-start">

              {/* LEFT: Display + keypad */}
              <div className="flex flex-col gap-2 flex-1">
                {/* LCD Display */}
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{
                    background: "#070c10",
                    border: `1px solid ${error ? "rgba(239,68,68,0.45)" : selected ? `rgba(${selectedColor?.rgb},0.35)` : "rgba(255,255,255,0.06)"}`,
                    boxShadow: error
                      ? "inset 0 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(239,68,68,0.2)"
                      : selected
                      ? `inset 0 2px 8px rgba(0,0,0,0.8), 0 0 12px rgba(${selectedColor?.rgb},0.2)`
                      : "inset 0 2px 8px rgba(0,0,0,0.8)",
                    transition: "all 0.25s ease",
                  }}
                >
                  {/* LCD pixel grid */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)",
                  }}/>
                  <div className="relative px-3 py-2 text-center">
                    <p className="font-mono text-[7px] tracking-[0.4em] mb-0.5"
                      style={{ color: error ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.18)" }}>
                      {error ? "INVALID" : "ENTER CODE"}
                    </p>
                    <motion.div
                      className="font-mono font-black text-3xl tracking-[0.25em] leading-none"
                      animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
                      transition={{ duration: 0.25 }}
                      style={{
                        color: error ? "#ef4444" : selected ? selectedColor?.primary : "rgba(255,255,255,0.2)",
                        textShadow: selected ? `0 0 16px rgba(${selectedColor?.rgb},0.9)` : error ? "0 0 12px rgba(239,68,68,0.8)" : "none",
                        fontVariantNumeric: "tabular-nums",
                        animation: "flicker 10s infinite",
                      }}
                    >
                      {input.length === 0 ? "—" : input.length === 1 ? `${input}_` : input}
                    </motion.div>
                    {selected && (
                      <motion.p
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-[8px] tracking-[0.2em] mt-1 truncate"
                        style={{ color: selectedColor?.label, opacity: 0.65 }}
                      >
                        {selected.title}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Keypad grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[1,2,3,4,5,6,7,8,9].map((n) => (
                    <KeyBtn key={n} label={String(n)} onClick={() => pressNumber(String(n))}/>
                  ))}
                  <KeyBtn label="C" onClick={clearInput} variant="clear"/>
                  <KeyBtn label="0" onClick={() => pressNumber("0")}/>
                  <div/>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px self-stretch rounded-full mt-1"
                style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)" }}/>

              {/* RIGHT: Dispense + status */}
              <div className="flex flex-col gap-2 w-[110px] flex-shrink-0">
                {/* Status light row */}
                <div className="flex items-center justify-center gap-2 py-1.5 rounded-lg"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: error ? "#ef4444" : dispensing ? "#fbbf24" : selected ? selectedColor?.primary : "rgba(255,255,255,0.1)",
                      boxShadow: (selected || dispensing || error) ? `0 0 6px ${error ? "#ef4444" : dispensing ? "#fbbf24" : selectedColor?.primary}` : "none",
                    }}
                  />
                  <span className="font-mono text-[8px] tracking-widest transition-all duration-300"
                    style={{ color: error ? "#ef4444" : dispensing ? "#fbbf24" : selected ? selectedColor?.primary : "rgba(255,255,255,0.18)" }}>
                    {error ? "ERROR" : dispensing ? "WORKING" : selected ? "READY" : "STANDBY"}
                  </span>
                </div>

                {/* BIG DISPENSE BUTTON */}
                <motion.button
                  onClick={dispense}
                  disabled={!selected || dispensing}
                  whileTap={selected && !dispensing ? { scale: 0.95 } : {}}
                  className="relative overflow-hidden rounded-xl font-black tracking-widest text-xs"
                  style={{
                    height: 80,
                    background: selected && !dispensing
                      ? `linear-gradient(160deg, ${selectedColor?.bg2}, ${selectedColor?.bg1})`
                      : dispensing
                      ? "linear-gradient(160deg, #fbbf24, #d97706)"
                      : "linear-gradient(160deg, rgba(40,40,55,0.8), rgba(25,25,38,0.9))",
                    border: selected
                      ? `1.5px solid ${selectedColor?.primary}`
                      : "1.5px solid rgba(255,255,255,0.06)",
                    boxShadow: selected && !dispensing
                      ? `0 0 24px rgba(${selectedColor?.rgb},0.4), 0 4px 0 rgba(${selectedColor?.rgb},0.2), inset 0 1px 0 rgba(255,255,255,0.15)`
                      : dispensing
                      ? "0 0 20px rgba(251,191,36,0.4)"
                      : "0 3px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                    color: selected || dispensing ? "#fff" : "rgba(255,255,255,0.12)",
                    cursor: selected && !dispensing ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Button surface gloss */}
                  {(selected || dispensing) && (
                    <div className="absolute inset-0 pointer-events-none rounded-xl"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 50%)" }}/>
                  )}
                  <AnimatePresence mode="wait">
                    {dispensing ? (
                      <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-1.5 h-full">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                        <span className="text-[9px] tracking-widest text-white/80">WORKING</span>
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-1 h-full">
                        <span className="text-2xl leading-none">↓</span>
                        <span className="text-[9px] tracking-[0.2em]">DISPENSE</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                {/* Button physical recess */}
                <div className="h-0.5 mx-3 rounded-full" style={{ background: "rgba(0,0,0,0.4)" }}/>

                <p className="font-mono text-[7.5px] tracking-wider text-white/12 text-center leading-relaxed">
                  TYPE 01–05<br/>THEN DISPENSE
                </p>
              </div>
            </div>
          </div>

          {/* ── DISPENSE SLOT + OUTPUT TRAY ── */}
          <div className="mx-4 mt-2.5 mb-4">
            {/* Slot opening */}
            <div
              className="mx-6 h-2.5 rounded-t"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(5,5,12,0.9) 100%)",
                border: "1px solid rgba(255,255,255,0.055)",
                borderBottom: "none",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              {/* Slot teeth */}
              <div className="flex justify-around px-4 pt-0.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-0.5 h-1.5 rounded-b"
                    style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.04)" }}/>
                ))}
              </div>
            </div>
            <OutputTray project={dispensed}/>
          </div>

          {/* ── CHASSIS BOTTOM STRIP ── */}
          <div
            className="h-5 flex items-center justify-center"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(0,0,0,0.08) 100%)",
            }}
          >
            <div className="flex gap-2 items-center">
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.06)" }}/>
              <p className="font-mono text-[7px] tracking-[0.5em] text-white/10">SOFIA MIRANDA PORTFOLIO</p>
              <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.06)" }}/>
            </div>
          </div>
        </div>

        {/* Machine feet */}
        <div className="flex justify-between px-10 mt-0">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-2 rounded-b-md"
              style={{
                background: "linear-gradient(180deg, #1c1c28, #12121a)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "none",
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            />
          ))}
        </div>

        {/* Floor reflection */}
        <div className="mx-8 h-2 mt-0 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.03), transparent 70%)" }}/>
      </div>
    </section>
  );
}
