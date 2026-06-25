"use client";

import { useState, useEffect, useRef } from "react";
import WeaponCard, { WeaponDetail, type WeaponData } from "./WeaponCard";
import Reveal from "./motion/Reveal";
import { gsap } from "@/lib/gsap";

const WEAPONS: WeaponData[] = [
  {
    code: "VX-R7",
    name: "Vortex Assault Platform",
    type: "MODULAR ASSAULT RIFLE",
    description:
      "The VX-R7 is VOIDSTRIKE's flagship rifle — balanced recoil, swappable cells, and a rail system that accepts any optic in the armory. Built for mid-range dominance.",
    damage: 74,
    accuracy: 82,
    mobility: 68,
    fireRate: "720 RPM",
    range: "MID",
  },
  {
    code: "HX-9",
    name: "Havoc Exchange SMG",
    type: "CLOSE QUARTERS SMG",
    description:
      "Compact frame, brutal output. The HX-9 chews through corridors and breach points. Low weight means faster movement through collapsed structures.",
    damage: 52,
    accuracy: 64,
    mobility: 92,
    fireRate: "1100 RPM",
    range: "CQB",
  },
  {
    code: "PL-44",
    name: "Pulsar Launcher",
    type: "PLASMA HEAVY",
    description:
      "Charges a superheated plasma bolt that melts armor plating. Slow cycle, devastating impact. One shot can turn a firefight.",
    damage: 98,
    accuracy: 71,
    mobility: 38,
    fireRate: "90 RPM",
    range: "LONG",
  },
  {
    code: "SR-21",
    name: "Specter Rail",
    type: "MAGNETIC SNIPER",
    description:
      "Magnetic acceleration with zero muzzle flash. The SR-21 rewards patience — one clean shot from the shadows ends engagements before they start.",
    damage: 95,
    accuracy: 96,
    mobility: 45,
    fireRate: "60 RPM",
    range: "EXTREME",
  },
];

export default function WeaponsSection() {
  const [selected, setSelected] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(".weapons-beam--1", {
        y: 120,
        scrollTrigger: { trigger: section, scrub: 1.2, start: "top bottom", end: "bottom top" },
      });
      gsap.to(".weapons-beam--2", {
        y: -80,
        scrollTrigger: { trigger: section, scrub: 1.5, start: "top bottom", end: "bottom top" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="weapons" className="weapons-section" ref={sectionRef}>
      <div className="weapons-bg" aria-hidden="true">
        <div className="weapons-beam weapons-beam--1" />
        <div className="weapons-beam weapons-beam--2" />
      </div>

      <div className="weapons-inner">
        <Reveal className="weapons-header">
          <span className="weapons-eyebrow">03 / ARSENAL DIVISION</span>
          <h2 className="weapons-title">
            <span>FORGE YOUR</span>
            <span className="weapons-title-accent">LOADOUT</span>
          </h2>
          <p className="weapons-lead">
            Every operative carries a modular weapons platform engineered for
            zero-gravity combat zones. Swap barrels, optics, and power cells in
            the field — no two loadouts need to be the same.
          </p>
          <p className="weapons-desc">
            VOIDSTRIKE&apos;s armory spans ballistic, energy, and hybrid systems.
            Master one weapon or adapt per mission. The battlefield does not
            reward comfort — only precision.
          </p>
        </Reveal>

        <div className="weapons-showcase">
          <div className="weapons-grid">
            {WEAPONS.map((weapon, i) => (
              <WeaponCard
                key={weapon.code}
                weapon={weapon}
                active={selected === i}
                onSelect={() => setSelected(i)}
                index={i}
              />
            ))}
          </div>
          <WeaponDetail weapon={WEAPONS[selected]} />
        </div>

        <Reveal className="weapons-modular" childSelector=".weapons-modular-list li" stagger={0.08}>
          <h3 className="weapons-modular-title">MODULAR FRAMEWORK</h3>
          <p className="weapons-modular-desc">
            Each platform shares a universal coupling system. Barrels, grips,
            cells, and optics snap into place under combat conditions — no
            workshop required. Experiment with builds or run community blueprints
            from the VOIDSTRIKE armory network.
          </p>
          <ul className="weapons-modular-list">
            <li>
              <strong>12+</strong>
              <span>BARREL VARIANTS</span>
            </li>
            <li>
              <strong>24</strong>
              <span>OPTIC TYPES</span>
            </li>
            <li>
              <strong>8</strong>
              <span>POWER CELLS</span>
            </li>
            <li>
              <strong>∞</strong>
              <span>BUILD COMBOS</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
