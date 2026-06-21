"use client";

import { useState } from "react";

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

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="weapon-stat">
      <div className="weapon-stat-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="weapon-stat-track">
        <div className="weapon-stat-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function WeaponCard({
  weapon,
  active,
  onSelect,
}: {
  weapon: WeaponData;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={`weapon-card${active ? " weapon-card--active" : ""}`}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      role="button"
      tabIndex={0}
      aria-pressed={active}
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

      <StatBar label="DMG" value={weapon.damage} />
      <StatBar label="ACC" value={weapon.accuracy} />
      <StatBar label="MOB" value={weapon.mobility} />

      <div className="weapon-card-meta">
        <span>ROF <strong>{weapon.fireRate}</strong></span>
        <span>RNG <strong>{weapon.range}</strong></span>
      </div>
    </article>
  );
}

export function WeaponDetail({ weapon }: { weapon: WeaponData }) {
  return (
    <div className="weapon-detail">
      <span className="weapon-detail-label">SELECTED PLATFORM</span>
      <h3 className="weapon-detail-code">{weapon.code}</h3>
      <p className="weapon-detail-name">{weapon.name}</p>
      <p className="weapon-detail-desc">{weapon.description}</p>

      <div className="weapon-attachments">
        <span className="weapon-attachments-label">ATTACHMENT SLOTS</span>
        <div className="attachment-slots">
          <span className="attachment-slot attachment-slot--filled">OPTIC</span>
          <span className="attachment-slot attachment-slot--filled">BARREL</span>
          <span className="attachment-slot">UNDER</span>
          <span className="attachment-slot attachment-slot--filled">CELL</span>
        </div>
      </div>

      <button type="button" className="btn btn--primary weapon-equip">
        EQUIP WEAPON
      </button>
    </div>
  );
}
