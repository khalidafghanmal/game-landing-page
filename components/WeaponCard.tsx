"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export type WeaponData = {
  code: string;
  name: string;
  type: string;
  description: string;
  damage: number;
  accuracy: number;
  mobility: number;
  fireRate: string;
  range: string;
};

function StatBar({ label, value, active }: { label: string; value: number; active: boolean }) {
  return (
    <div className="weapon-stat">
      <div className="weapon-stat-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="weapon-stat-track">
        <motion.div
          className="weapon-stat-fill"
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : `${value * 0.6}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function WeaponCard({
  weapon,
  active,
  onSelect,
  index,
}: {
  weapon: WeaponData;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.article
      className={`weapon-card${active ? " weapon-card--active" : ""}`}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="weapon-card-wire" aria-hidden="true">
        <svg viewBox="0 0 160 40" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="4" y="14" width="90" height="12" rx="1" />
          <rect x="94" y="11" width="50" height="18" rx="1" />
          <line x1="12" y1="20" x2="82" y2="20" />
          <rect x="28" y="26" width="10" height="10" />
          <circle cx="70" cy="20" r="3" />
        </svg>
      </div>

      <span className="weapon-card-code">{weapon.code}</span>
      <h3 className="weapon-card-name">{weapon.name}</h3>
      <span className="weapon-card-type">{weapon.type}</span>

      <StatBar label="DMG" value={weapon.damage} active={active} />
      <StatBar label="ACC" value={weapon.accuracy} active={active} />
      <StatBar label="MOB" value={weapon.mobility} active={active} />

      <div className="weapon-card-meta">
        <span>ROF <strong>{weapon.fireRate}</strong></span>
        <span>RNG <strong>{weapon.range}</strong></span>
      </div>
    </motion.article>
  );
}

export function WeaponDetail({ weapon }: { weapon: WeaponData }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={weapon.code}
        className="weapon-detail"
        initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -30, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="weapon-detail-label">SELECTED PLATFORM</span>
        <h3 className="weapon-detail-code">{weapon.code}</h3>
        <p className="weapon-detail-name">{weapon.name}</p>
        <p className="weapon-detail-desc">{weapon.description}</p>

        <div className="weapon-attachments">
          <span className="weapon-attachments-label">ATTACHMENT SLOTS</span>
          <div className="attachment-slots">
            {["OPTIC", "BARREL", "UNDER", "CELL"].map((slot, i) => (
              <motion.span
                key={slot}
                className={`attachment-slot${slot !== "UNDER" ? " attachment-slot--filled" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {slot}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          className="btn btn--primary weapon-equip"
          whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255,26,26,0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          EQUIP WEAPON
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
