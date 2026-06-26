"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";

const MEDIA_ITEMS = [
  {
    id: "M-01",
    label: "COMBAT FOOTAGE",
    tag: "4K / 60FPS",
    image: "/operative.png",
    span: "wide",
  },
  {
    id: "M-02",
    label: "UNIT RENDER",
    tag: "CONCEPT ART",
    image: "/enforcer.png",
    span: "tall",
  },
  {
    id: "M-03",
    label: "BREACH SEQUENCE",
    tag: "ALPHA BUILD",
    image: "/enforcer.png",
    span: "normal",
  },
  {
    id: "M-04",
    label: "FIELD OPS",
    tag: "IN-GAME",
    image: "/operative.png",
    span: "normal",
  },
];

const TRANSMISSIONS = [
  { time: "06.19", code: "TX-001", msg: "Pre-alpha combat systems online. First breach tests scheduled." },
  { time: "06.21", code: "TX-014", msg: "Operative class renders finalized. Enforcer unit cleared for showcase." },
  { time: "06.23", code: "TX-028", msg: "Arsenal modular framework deployed to internal test branch." },
  { time: "06.25", code: "TX-041", msg: "Cinematic trailer pipeline locked. Signal feed going public." },
];

export default function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(".media-wave", {
        x: -120,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(".media-trailer-frame", {
        scale: 0.92,
        opacity: 0,
        scrollTrigger: {
          trigger: ".media-trailer",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 1.2,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="media" className="media-section" ref={sectionRef}>
      <div className="media-bg" aria-hidden="true">
        <div className="media-wave media-wave--1" />
        <div className="media-wave media-wave--2" />
        <div className="media-grid-bg" />
      </div>

      <div className="media-inner">
        <Reveal className="media-header">
          <span className="media-eyebrow">05 / SIGNAL FEED</span>
          <h2 className="media-title">
            <span>WITNESS THE</span>
            <span className="media-title-accent">WARFRONT</span>
          </h2>
          <p className="media-lead">
            Classified footage, operative renders, and live dev transmissions
            straight from the front line. Every frame is combat-grade.
          </p>
        </Reveal>

        <div className="media-layout">
          <Reveal className="media-trailer" y={40}>
            <div className="media-trailer-frame">
              <div className="media-trailer-screen">
                <Image
                  src="/operative.png"
                  alt="Cinematic combat footage preview"
                  fill
                  className="media-trailer-bg"
                  sizes="(max-width: 1100px) 100vw, 65vw"
                />
                <div className="media-trailer-vignette" aria-hidden="true" />
                <AnimatePresence>
                  {!playing && (
                    <motion.button
                      type="button"
                      className="media-play"
                      onClick={() => setPlaying(true)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      whileHover={{ scale: 1.08 }}
                      aria-label="Play cinematic trailer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>PLAY TRAILER</span>
                    </motion.button>
                  )}
                </AnimatePresence>
                {playing && (
                  <motion.div
                    className="media-trailer-live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="media-live-dot" />
                    <span>TRAILER // COMING SOON</span>
                  </motion.div>
                )}
              </div>
              <div className="media-trailer-meta">
                <div>
                  <span className="media-trailer-label">CINEMATIC REEL</span>
                  <span className="media-trailer-sub">VOIDSTRIKE — DEPLOYMENT TRAILER</span>
                </div>
                <div className="media-trailer-specs">
                  <span>4K</span>
                  <span>2:47</span>
                  <span>HDR</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="media-feed" y={40} delay={0.15}>
            <div className="transmission-panel">
              <span className="transmission-label">DEV TRANSMISSIONS</span>
              <ul className="transmission-list">
                {TRANSMISSIONS.map((tx, i) => (
                  <motion.li
                    key={tx.code}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="transmission-head">
                      <span className="transmission-time">{tx.time}</span>
                      <span className="transmission-code">{tx.code}</span>
                    </div>
                    <p>{tx.msg}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="media-gallery" childSelector=".media-card" stagger={0.08} y={36}>
          <span className="media-gallery-label">INTEL ARCHIVE</span>
          <div className="media-grid">
            {MEDIA_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                className={`media-card media-card--${item.span}${activeMedia === i ? " media-card--active" : ""}`}
                onClick={() => setActiveMedia(i)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="media-card-img"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="media-card-overlay" />
                <div className="media-card-info">
                  <span className="media-card-id">{item.id}</span>
                  <span className="media-card-label">{item.label}</span>
                  <span className="media-card-tag">{item.tag}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </Reveal>

        <Reveal className="media-cta" y={24}>
          <MagneticButton>
            <button className="btn btn--ghost media-archive-btn" type="button">
              VIEW FULL ARCHIVE
            </button>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
