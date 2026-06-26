"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ModeCard, { type ModeData } from "./ModeCard";
import Reveal from "./motion/Reveal";

const MODES: ModeData[] = [
  {
    id: "MODE-02",
    name: "STRIKE TEAM",
    tagline: "Four operatives. One objective. Zero margin for error.",
    players: "4",
    playerLabel: "SQUAD",
    difficulty: 4,
    featured: true,
    stats: [
      { label: "MAPS", value: "18" },
      { label: "RANKED", value: "LIVE" },
      { label: "REWARDS", value: "2X XP" },
    ],
  },
  {
    id: "MODE-01",
    name: "SENTINEL RUN",
    tagline: "Solo extinction protocol against endless machine swarms.",
    players: "1",
    playerLabel: "OPERATIVE",
    difficulty: 5,
    stats: [
      { label: "WAVES", value: "∞" },
      { label: "AVG RUN", value: "47 MIN" },
      { label: "CLEAR RATE", value: "12%" },
    ],
  },
  {
    id: "MODE-03",
    name: "NEXUS WAR",
    tagline: "Territory domination across shattered megastructures.",
    players: "64",
    playerLabel: "OPERATIVES",
    difficulty: 3,
    stats: [
      { label: "ZONES", value: "7" },
      { label: "VEHICLES", value: "ON" },
      { label: "PERSIST", value: "72H" },
    ],
  },
];

const WEAPONS = [
  { code: "VX-R7", type: "ASSAULT RIFLE", dmg: "74", rof: "720", range: "MID" },
  { code: "HX-9", type: "SMG", dmg: "52", rof: "1100", range: "CQB" },
  { code: "PL-44", type: "PLASMA LAUNCHER", dmg: "98", rof: "90", range: "LONG" },
];

const HEADER_META = [
  { label: "THEATERS", value: "03", detail: "ACTIVE OPS" },
  { label: "RANKED", value: "LIVE", detail: "SEASON 1" },
  { label: "ENEMY AI", value: "ADAPTIVE", detail: "DYNAMIC" },
];

export default function ModesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (header) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power4.out" },
        });

        tl.from(".modes-eyebrow", { opacity: 0, letterSpacing: "0.55em", duration: 0.9 })
          .from(
            ".modes-title-line--choose",
            {
              yPercent: 110,
              opacity: 0,
              rotateX: -24,
              transformOrigin: "50% 100%",
              duration: 1,
            },
            "-=0.5"
          )
          .from(
            ".modes-title-line--war",
            {
              yPercent: 120,
              opacity: 0,
              rotateX: -28,
              transformOrigin: "50% 100%",
              duration: 1.1,
            },
            "-=0.65"
          )
          .from(".modes-header-rule", { scaleX: 0, opacity: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.5")
          .from(".modes-lead", { y: 28, opacity: 0, duration: 0.8 }, "-=0.45")
          .from(".modes-desc", { y: 20, opacity: 0, duration: 0.7 }, "-=0.55")
          .from(".modes-meta-card", { y: 24, opacity: 0, stagger: 0.1, duration: 0.65 }, "-=0.5");
      }

      gsap.to(".modes-grid-floor", {
        backgroundPosition: "0px 120px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(".modes-horizon", {
        scaleX: 0,
        opacity: 0,
        scrollTrigger: {
          trigger: ".modes-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 1.2,
        ease: "power3.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="modes" className="modes-section" ref={sectionRef}>
      <div className="modes-bg" aria-hidden="true">
        <div className="modes-grid-floor" />
        <div className="modes-horizon" />
        <div className="modes-hex modes-hex--1" />
        <div className="modes-hex modes-hex--2" />
        <div className="modes-hex modes-hex--3" />
      </div>

      <div className="modes-inner">
        <div className="modes-header" ref={headerRef}>
          <div className="modes-header-band">
            <div className="modes-header-main">
              <span className="modes-eyebrow">02 / COMBAT PROTOCOLS</span>

              <div className="modes-title-wrap">
                <span className="modes-title-watermark" aria-hidden="true">
                  WAR
                </span>
                <h2 className="modes-title modes-title--3d">
                  <span className="modes-title-line modes-title-line--choose">CHOOSE</span>
                  <span className="modes-title-line modes-title-line--war">
                    <span className="modes-title-accent">YOUR WAR</span>
                  </span>
                </h2>
              </div>

              <div className="modes-header-rule" aria-hidden="true">
                <span className="modes-header-rule-line" />
                <span className="modes-header-rule-dot" />
              </div>

              <div className="modes-header-copy">
                <p className="modes-lead">
                  Three theaters of operation. Dynamic objectives. Adaptive enemy AI.
                  <strong> Deploy where the front line demands you most.</strong>
                </p>
                <p className="modes-desc">
                  Every mode rewrites the rules of engagement — solo extinction runs,
                  coordinated strike teams, and full-scale territory wars across
                  shattered megastructures.
                </p>
              </div>
            </div>

            <div className="modes-header-meta">
              {HEADER_META.map((item) => (
                <div key={item.label} className="modes-meta-card">
                  <span className="modes-meta-label">{item.label}</span>
                  <span className="modes-meta-value">{item.value}</span>
                  <span className="modes-meta-detail">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modes-layout">
          <div className="modes-grid">
            {MODES.map((mode, i) => (
              <ModeCard key={mode.id} mode={mode} index={i} />
            ))}
          </div>

          <Reveal className="modes-intel" y={40} delay={0.2}>
            <div className="intel-panel">
              <span className="intel-label">TACTICAL BRIEFING</span>
              <div className="intel-map" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="intel-map-svg">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,26,26,0.15)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,26,26,0.2)" strokeWidth="0.5" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,26,26,0.35)" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,26,26,0.1)" />
                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,26,26,0.1)" />
                  <circle cx="72" cy="88" r="4" fill="#ff1a1a" className="intel-ping" />
                  <circle cx="128" cy="112" r="3" fill="#ff1a1a" className="intel-ping intel-ping--d1" />
                  <circle cx="100" cy="68" r="2.5" fill="#ff1a1a" className="intel-ping intel-ping--d2" />
                  <path d="M72,88 L128,112" stroke="rgba(255,26,26,0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
                </svg>
              </div>
              <ul className="intel-feed">
                <li><span className="intel-time">00:14</span> Hostile movement detected — Sector 7</li>
                <li><span className="intel-time">00:31</span> Strike Team Alpha deployed</li>
                <li><span className="intel-time">00:52</span> Nexus perimeter breach imminent</li>
                <li><span className="intel-time">01:08</span> Reinforcements inbound — ETA 4m</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="modes-weapons" childSelector=".weapon-chip" stagger={0.1} y={32}>
          <span className="modes-weapons-label">LOADOUT MATRIX</span>
          <div className="weapons-row">
            {WEAPONS.map((w) => (
              <div key={w.code} className="weapon-chip">
                <svg viewBox="0 0 100 24" fill="none" stroke="#ff1a1a" strokeWidth="0.6" className="weapon-chip-svg" aria-hidden="true">
                  <rect x="2" y="8" width="60" height="8" rx="1" />
                  <rect x="62" y="6" width="30" height="12" rx="1" />
                  <line x1="8" y1="12" x2="55" y2="12" />
                </svg>
                <div className="weapon-chip-info">
                  <span className="weapon-chip-code">{w.code}</span>
                  <span className="weapon-chip-type">{w.type}</span>
                </div>
                <div className="weapon-chip-stats">
                  <span>DMG <strong>{w.dmg}</strong></span>
                  <span>ROF <strong>{w.rof}</strong></span>
                  <span>RNG <strong>{w.range}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
