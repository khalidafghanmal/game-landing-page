"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotion } from "./motion/MotionProvider";

const SECTIONS = [
  { id: "#home", label: "Home" },
  { id: "#modes", label: "Combat Protocols" },
  { id: "#weapons", label: "Arsenal Division" },
  { id: "#operatives", label: "Combat Units" },
  { id: "#media", label: "Signal Feed" },
  { id: "#community", label: "Enlistment" },
];

const TOTAL_SLIDES = 6;

export default function SectionNav() {
  const [current, setCurrent] = useState(0);
  const { scrollTo } = useMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, index) => {
      const el = document.querySelector(section.id);
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
    if (index < SECTIONS.length) scrollTo(SECTIONS[index].id);
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
          >
            {i === current && (
              <motion.span
                className="dot-pulse"
                layoutId="section-dot"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <motion.span
        className="slide-num"
        key={current}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {String(current + 1).padStart(2, "0")}
      </motion.span>
      <span className="slide-sep">/</span>
      <span className="slide-total">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
    </aside>
  );
}
