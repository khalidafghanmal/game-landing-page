"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "modes", label: "Combat Protocols" },
];

const TOTAL_SLIDES = 5;

export default function SectionNav() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrent(index);
        },
        { threshold: 0.45 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function goTo(index: number) {
    if (index < SECTIONS.length) {
      document.getElementById(SECTIONS[index].id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <aside
      className="section-nav"
      aria-label={`Section ${current + 1} of ${TOTAL_SLIDES}`}
    >
      <div className="slide-dots">
        {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`dot${i === current ? " dot--active" : ""}`}
            aria-label={
              i < SECTIONS.length
                ? `Go to ${SECTIONS[i].label}`
                : `Section ${i + 1} coming soon`
            }
            onClick={() => goTo(i)}
            disabled={i >= SECTIONS.length}
          />
        ))}
      </div>
      <span className="slide-num">{String(current + 1).padStart(2, "0")}</span>
      <span className="slide-sep">/</span>
      <span className="slide-total">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
    </aside>
  );
}
