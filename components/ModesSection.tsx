import ModeCard, { type ModeData } from "./ModeCard";

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

export default function ModesSection() {
  return (
    <section id="modes" className="modes-section">
      <div className="modes-bg" aria-hidden="true">
        <div className="modes-grid-floor" />
        <div className="modes-horizon" />
        <div className="modes-hex modes-hex--1" />
        <div className="modes-hex modes-hex--2" />
        <div className="modes-hex modes-hex--3" />
      </div>

      <div className="modes-inner">
        <header className="modes-header">
          <span className="modes-eyebrow">02 / VOID PROTOCOLS</span>
          <h2 className="modes-title">
            <span>CHOOSE</span>
            <span className="modes-title-accent">YOUR WAR</span>
          </h2>
          <p className="modes-desc">
            Three theaters of operation. Dynamic objectives. Adaptive enemy AI.
            Deploy where the front line demands you most.
          </p>
        </header>

        <div className="modes-layout">
          <div className="modes-grid">
            {MODES.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>

          <aside className="modes-intel">
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
          </aside>
        </div>

        <div className="modes-weapons">
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
        </div>
      </div>
    </section>
  );
}
