"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";

const STATS = [
  { label: "OPERATIVES ENLISTED", value: 12847, suffix: "+" },
  { label: "MISSIONS CLEARED", value: 892041, suffix: "" },
  { label: "WARFRONTS ACTIVE", value: 7, suffix: "" },
  { label: "DAYS TO LAUNCH", value: 142, suffix: "" },
];

const PLATFORMS = [
  {
    id: "steam",
    label: "STEAM",
    action: "WISHLIST NOW",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l4.5 2.5-4.5 2.5z" />
      </svg>
    ),
  },
  {
    id: "discord",
    label: "DISCORD",
    action: "JOIN SERVER",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.3 4.4A17.2 17.2 0 0015.5 3a12 12 0 00-.5 1 12 12 0 00-2.9 0A12 12 0 0012 3a17.2 17.2 0 00-4.8 1.4C4.5 8.2 3.6 11.9 4 15.5a17.3 17.3 0 005.2 2.6 12.5 12.5 0 001.1-1.8 11.2 11.2 0 01-1.7-.8l.4-.3a12.4 12.4 0 0010.6 0l.4.3c-.5.3-1.1.6-1.7.8a12.5 12.5 0 001.1 1.8 17.3 17.3 0 005.2-2.6c.6-4.2-.2-7.9-2.7-11.1zM9.5 14.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
      </svg>
    ),
  },
  {
    id: "xbox",
    label: "XBOX",
    action: "PRE-ORDER",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.1 5.5L12 12l7.9-6.5C17.6 3.2 14.9 2 12 2 9.1 2 6.4 3.2 4.1 5.5zm15.8 13C18.4 20.8 15.3 22 12 22c-3.3 0-6.4-1.2-7.9-3.5L12 12l7.9 6.5zM2 12c0-2.5.8-4.8 2.1-6.7L12 12 2 18.7A9.96 9.96 0 012 12z" />
      </svg>
    ),
  },
];

const FOOTER_LINKS = [
  {
    title: "GAME",
    links: ["Modes", "Weapons", "Operatives", "Media"],
  },
  {
    title: "COMMUNITY",
    links: ["Discord", "Forums", "Leaderboards", "Esports"],
  },
  {
    title: "STUDIO",
    links: ["About", "Careers", "Press Kit", "Support"],
  },
];

function animateCounter(el: HTMLElement, target: number, duration = 2) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    onUpdate: () => {
      el.textContent = Math.floor(obj.val).toLocaleString();
    },
  });
}

export default function DeploySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(".deploy-beam", {
        y: 100,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      statRefs.current.forEach((el, i) => {
        if (el) animateCounter(el, STATS[i].value);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="community" className="deploy-section" ref={sectionRef}>
      <div className="deploy-bg" aria-hidden="true">
        <div className="deploy-beam deploy-beam--1" />
        <div className="deploy-beam deploy-beam--2" />
        <div className="deploy-beam deploy-beam--3" />
        <div className="deploy-horizon" />
      </div>

      <div className="deploy-inner">
        <Reveal className="deploy-hero">
          <span className="deploy-eyebrow">06 / FINAL DEPLOYMENT</span>
          <h2 className="deploy-title">
            <span>JOIN THE</span>
            <span className="deploy-title-accent">FRONTLINE</span>
          </h2>
          <p className="deploy-lead">
            Pre-alpha access is opening soon. Enlist now to receive deployment
            alerts, exclusive intel drops, and first-wave operative clearance.
          </p>
        </Reveal>

        <Reveal className="deploy-stats" childSelector=".deploy-stat" stagger={0.1} y={32}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className="deploy-stat">
              <span
                className="deploy-stat-value"
                ref={(el) => { statRefs.current[i] = el; }}
              >
                0
              </span>
              {stat.suffix && <span className="deploy-stat-suffix">{stat.suffix}</span>}
              <span className="deploy-stat-label">{stat.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="deploy-platforms" childSelector=".platform-card" stagger={0.12} y={40}>
          {PLATFORMS.map((platform) => (
            <MagneticButton key={platform.id}>
              <button type="button" className="platform-card">
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-label">{platform.label}</span>
                <span className="platform-action">{platform.action}</span>
              </button>
            </MagneticButton>
          ))}
        </Reveal>

        <Reveal className="deploy-enlist" y={40} delay={0.1}>
          <div className="enlist-panel">
            <span className="enlist-label">ENLISTMENT CHANNEL</span>
            <p className="enlist-desc">
              Enter your signal address. We&apos;ll transmit deployment orders when
              pre-alpha clearance opens.
            </p>
            <form
              className="enlist-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="enlist-input"
                placeholder="OPERATIVE@SIGNAL.NET"
                aria-label="Email address"
              />
              <MagneticButton>
                <button type="submit" className="btn btn--primary enlist-submit">
                  ENLIST
                </button>
              </MagneticButton>
            </form>
          </div>
        </Reveal>

        <div className="deploy-closing">
          <MagneticButton>
            <button type="button" className="btn btn--primary deploy-main-cta">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              PLAY FREE PRE-ALPHA
            </button>
          </MagneticButton>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg className="footer-logo" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 10v12l12 8 12-8V10L16 2z" stroke="#ff1a1a" strokeWidth="1.5" />
              <path d="M16 8l-6 4v8l6 4 6-4v-8l-6-4z" fill="#ff1a1a" opacity="0.6" />
            </svg>
            <span className="footer-name">VOIDSTRIKE</span>
            <span className="footer-tag">FUTURE IS OUR BATTLEFIELD</span>
          </div>

          <div className="footer-links">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="footer-col">
                <span className="footer-col-title">{col.title}</span>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} VOIDSTRIKE. All rights reserved.
          </span>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
          <span className="footer-build">BUILD // PRE-ALPHA v0.1.0</span>
        </div>
      </footer>
    </section>
  );
}
