"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";

const DOSSIER = {
  code: "EN-04",
  name: "HEAVY ENFORCER",
  faction: "SKULL DIVISION",
  role: "FRONTLINE BREACHER",
  description:
    "Full-plate shock trooper built for door-kicking and sustained fire. Segmented pauldrons, reinforced knee guards, and a dual-configuration bullpup platform make the Enforcer the first unit through every breach point.",
  loadout:
    "Integrated respirator helm with thermal optic array. Thigh-mounted breach rig carries five high-yield charges. Skull Division insignia marks elite clearance.",
  stats: [
    { label: "ARMOR", value: 94 },
    { label: "FIREPOWER", value: 88 },
    { label: "MOBILITY", value: 42 },
    { label: "BREACH", value: 91 },
  ],
};

const HUD_MARKERS = [
  { id: "optic", label: "OPTIC ARRAY", detail: "THERMAL / ORANGE SPECTRUM", top: "18%", left: "52%" },
  { id: "insignia", label: "SKULL DIVISION", detail: "ELITE CLEARANCE", top: "32%", left: "68%" },
  { id: "weapon", label: "BULLPUP PLATFORM", detail: "DUAL-CONFIG RIFLE", top: "48%", left: "38%" },
  { id: "breach", label: "BREACH RIG", detail: "5x HIGH-YIELD CHARGES", top: "62%", left: "58%" },
];

const ROSTER = [
  { code: "RC-02", name: "RECON SCOUT", role: "STEALTH / FLANK", armor: 58, active: false },
  { code: "EN-04", name: "HEAVY ENFORCER", role: "BREACH / ASSAULT", armor: 94, active: true },
  { code: "SN-07", name: "SPECTER SNIPER", role: "OVERWATCH / ELIM", armor: 51, active: false },
];

export default function OperativesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(".operatives-scan", {
        backgroundPosition: "0 120px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".operatives-unit", {
        y: -24,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(".operatives-optic-glow", {
        scale: 0.8,
        opacity: 0.4,
        scrollTrigger: {
          trigger: ".operatives-visual",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        duration: 1.4,
        ease: "power2.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="operatives" className="operatives-section" ref={sectionRef}>
      <div className="operatives-bg" aria-hidden="true">
        <div className="operatives-scan" />
        <div className="operatives-ring operatives-ring--1" />
        <div className="operatives-ring operatives-ring--2" />
      </div>

      <div className="operatives-inner">
        <Reveal className="operatives-header">
          <span className="operatives-eyebrow">04 / COMBAT UNITS</span>
          <h2 className="operatives-title">
            <span>DEPLOY THE</span>
            <span className="operatives-title-accent">ENFORCER</span>
          </h2>
          <p className="operatives-lead">
            Elite shock troops in full battle plate. Orange optic arrays cut through
            smoke. Skull Division insignia marks units cleared for zero-margin
            breach operations.
          </p>
        </Reveal>

        <div className="operatives-showcase">
          <Reveal className="operatives-visual" y={48}>
            <div className="operatives-frame">
              <span className="operatives-frame-label">UNIT RENDER // EN-04</span>
              <div className="operatives-optic-glow" aria-hidden="true" />
              <Image
                className="operatives-unit"
                src="/enforcer.png"
                alt="Heavy Enforcer operative in full tactical armor with bullpup rifle and skull division insignia"
                width={520}
                height={780}
                priority={false}
              />
              <div className="operatives-reticle" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="operatives-reticle-svg">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,107,26,0.2)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,107,26,0.35)" strokeWidth="0.8" strokeDasharray="6 4" />
                  <line x1="100" y1="8" x2="100" y2="28" stroke="rgba(255,107,26,0.5)" />
                  <line x1="100" y1="172" x2="100" y2="192" stroke="rgba(255,107,26,0.5)" />
                  <line x1="8" y1="100" x2="28" y2="100" stroke="rgba(255,107,26,0.5)" />
                  <line x1="172" y1="100" x2="192" y2="100" stroke="rgba(255,107,26,0.5)" />
                </svg>
              </div>
              {HUD_MARKERS.map((marker) => (
                <div
                  key={marker.id}
                  className={`operatives-marker operatives-marker--${marker.id}`}
                  style={{ top: marker.top, left: marker.left }}
                >
                  <span className="operatives-marker-dot" />
                  <div className="operatives-marker-card">
                    <span className="operatives-marker-label">{marker.label}</span>
                    <span className="operatives-marker-detail">{marker.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="operatives-dossier" y={40} delay={0.15}>
            <div className="dossier-panel">
              <div className="dossier-top">
                <span className="dossier-label">OPERATIVE DOSSIER</span>
                <span className="dossier-faction">{DOSSIER.faction}</span>
              </div>

              <div className="dossier-id">
                <span className="dossier-code">{DOSSIER.code}</span>
                <h3 className="dossier-name">{DOSSIER.name}</h3>
                <span className="dossier-role">{DOSSIER.role}</span>
              </div>

              <p className="dossier-desc">{DOSSIER.description}</p>
              <p className="dossier-loadout">{DOSSIER.loadout}</p>

              <ul className="dossier-stats">
                {DOSSIER.stats.map((stat) => (
                  <li key={stat.label}>
                    <div className="dossier-stat-head">
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                    <div className="dossier-stat-bar">
                      <span className="dossier-stat-fill" style={{ width: `${stat.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>

              <MagneticButton>
                <button className="btn btn--primary dossier-deploy" type="button">
                  DEPLOY ENFORCER
                </button>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal className="operatives-roster" childSelector=".roster-card" stagger={0.1} y={32}>
          <span className="operatives-roster-label">UNIT ROSTER</span>
          <div className="roster-row">
            {ROSTER.map((unit) => (
              <div
                key={unit.code}
                className={`roster-card${unit.active ? " roster-card--active" : ""}`}
              >
                {unit.active && <span className="roster-badge">ACTIVE</span>}
                <span className="roster-code">{unit.code}</span>
                <span className="roster-name">{unit.name}</span>
                <span className="roster-role">{unit.role}</span>
                <div className="roster-armor">
                  <span>ARMOR</span>
                  <strong>{unit.armor}</strong>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}