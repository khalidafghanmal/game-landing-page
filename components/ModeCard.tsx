"use client";

import { motion } from "framer-motion";

export type ModeData = {
  id: string;
  name: string;
  tagline: string;
  players: string;
  playerLabel: string;
  difficulty: number;
  featured?: boolean;
  stats: { label: string; value: string }[];
};

function DifficultyMeter({ level, animate }: { level: number; animate?: boolean }) {
  return (
    <div className="mode-difficulty" aria-label={`Difficulty ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          className={`mode-difficulty-bar${i < level ? " mode-difficulty-bar--on" : ""}`}
          initial={animate ? { scaleY: 0 } : false}
          whileInView={animate ? { scaleY: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

function ModeIcon({ variant }: { variant: "solo" | "squad" | "war" }) {
  if (variant === "solo") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="mode-icon">
        <circle cx="24" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 38c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 22v8M20 28h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (variant === "squad") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className="mode-icon">
        <circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 38c0-5 3.6-9 8-9M40 38c0-5-3.6-9-8-9M18 38c0-4 2.7-7 6-7s6 3 6 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" className="mode-icon">
      <rect x="6" y="14" width="36" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 22h36M14 14V8M34 14V8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 36h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ICON_MAP = {
  "MODE-01": "solo",
  "MODE-02": "squad",
  "MODE-03": "war",
} as const;

export default function ModeCard({ mode, index }: { mode: ModeData; index: number }) {
  const icon = ICON_MAP[mode.id as keyof typeof ICON_MAP] ?? "solo";

  return (
    <motion.article
      className={`mode-card${mode.featured ? " mode-card--featured" : ""}`}
      initial={{ opacity: 0, y: 56, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 0 50px rgba(255, 26, 26, 0.18)",
        borderColor: "rgba(255, 26, 26, 0.55)",
      }}
    >
      <div className="mode-card-scan" aria-hidden="true" />
      <div className="mode-card-corner mode-card-corner--tl" aria-hidden="true" />
      <div className="mode-card-corner mode-card-corner--br" aria-hidden="true" />

      <div className="mode-card-top">
        <ModeIcon variant={icon} />
        <span className="mode-id">{mode.id}</span>
      </div>

      <h3 className="mode-name">{mode.name}</h3>
      <p className="mode-tagline">{mode.tagline}</p>

      <div className="mode-meta">
        <div className="mode-players">
          <motion.span
            className="mode-players-num"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
          >
            {mode.players}
          </motion.span>
          <span className="mode-players-label">{mode.playerLabel}</span>
        </div>
        <DifficultyMeter level={mode.difficulty} animate />
      </div>

      <ul className="mode-stats">
        {mode.stats.map((s) => (
          <li key={s.label}>
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </li>
        ))}
      </ul>

      <motion.button
        type="button"
        className="mode-deploy btn btn--ghost"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        DEPLOY
      </motion.button>

      {mode.featured && <span className="mode-badge">FEATURED</span>}
    </motion.article>
  );
}
