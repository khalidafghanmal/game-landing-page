"use client";

import { useEffect, useState } from "react";

const STATS = [
  { label: "CONFLICTS", target: 1204 },
  { label: "OPERATIVES ONLINE", target: 12842 },
  { label: "MISSIONS COMPLETED", target: 98765 },
];

function useAnimatedCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value.toLocaleString();
}

function StatRow({ label, target }: { label: string; target: number }) {
  const value = useAnimatedCounter(target);

  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function HudFooter() {
  return (
    <footer className="hud-footer">
      <div className="hud-panel hud-panel--feed">
        <div className="panel-header">
          <span className="panel-label">LIVE FEED</span>
          <span className="panel-status">
            <span className="blink-dot" /> ACTIVE
          </span>
        </div>
        <div className="feed-body">
          <div className="world-map" aria-hidden="true">
            <svg viewBox="0 0 200 100" className="map-svg">
              <ellipse
                cx="100"
                cy="50"
                rx="95"
                ry="45"
                fill="none"
                stroke="#ff1a1a"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M30,45 Q50,30 70,40 T110,35 T150,50 T170,60"
                fill="none"
                stroke="#ff1a1a"
                strokeWidth="1"
                opacity="0.6"
              />
              <path
                d="M40,60 Q60,55 80,65 T120,58 T160,70"
                fill="none"
                stroke="#ff1a1a"
                strokeWidth="0.8"
                opacity="0.4"
              />
              <circle cx="85" cy="42" r="2" fill="#ff1a1a" className="map-ping" />
              <circle
                cx="130"
                cy="55"
                r="2"
                fill="#ff1a1a"
                className="map-ping map-ping--delay"
              />
              <circle
                cx="55"
                cy="58"
                r="1.5"
                fill="#ff1a1a"
                className="map-ping map-ping--delay2"
              />
            </svg>
          </div>
          <div className="feed-stats">
            {STATS.map((stat) => (
              <StatRow key={stat.label} label={stat.label} target={stat.target} />
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-mouse" aria-hidden="true">
          <div className="scroll-wheel" />
        </div>
        <div className="scroll-arrows" aria-hidden="true">
          <span>&#9660;</span>
          <span>&#9660;</span>
        </div>
      </div>

      <div className="hud-sidebar">
        <div className="hud-widget hud-widget--threat">
          <div className="threat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9.5 2 7.3 3.4 6.2 5.6L2 14h4l1-2h10l1 2h4l-4.2-8.4C16.7 3.4 14.5 2 12 2zm0 3c1.1 0 2.1.5 2.7 1.3L17 12H7l2.3-5.7C10 5.5 10.9 5 12 5zm-3 9v2h6v-2H9z" />
            </svg>
          </div>
          <div className="threat-text">
            <span className="widget-label">THREAT LEVEL</span>
            <span className="widget-value threat-redacted">REDACTED</span>
          </div>
        </div>

        <div className="hud-widget hud-widget--armor">
          <span className="widget-label">ARMOR STATUS</span>
          <div className="armor-gauge">
            <svg viewBox="0 0 80 80" className="gauge-svg">
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="4"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#ff1a1a"
                strokeWidth="4"
                strokeDasharray="213.6"
                strokeDashoffset="27.8"
                strokeLinecap="square"
                transform="rotate(-90 40 40)"
                className="gauge-fill"
              />
            </svg>
            <span className="gauge-value">87%</span>
          </div>
        </div>

        <div className="hud-widget hud-widget--weapon">
          <div className="weapon-wireframe" aria-hidden="true">
            <svg viewBox="0 0 120 40" fill="none" stroke="#ff1a1a" strokeWidth="0.8">
              <rect x="5" y="15" width="70" height="10" rx="1" />
              <rect x="75" y="12" width="35" height="16" rx="1" />
              <line x1="10" y1="20" x2="65" y2="20" />
              <line x1="80" y1="20" x2="105" y2="20" />
              <rect x="20" y="25" width="8" height="12" />
              <circle cx="55" cy="20" r="3" />
            </svg>
          </div>
          <div className="weapon-info">
            <span className="widget-label">PRIMARY WEAPON</span>
            <span className="weapon-name">VX-R7</span>
            <span className="weapon-desc">FULLY MODULAR ASSAULT RIFLE</span>
          </div>
        </div>
      </div>

      <div className="coords">
        <span>23.1189° N, 113.2644° E</span>
      </div>
    </footer>
  );
}
