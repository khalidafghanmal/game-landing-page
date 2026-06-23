"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import HudFooter from "./HudFooter";
import MagneticButton from "./motion/MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, letterSpacing: "0.6em", duration: 1 })
        .from(
          ".title-line",
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -28,
            transformOrigin: "50% 100%",
            stagger: 0.14,
            duration: 1.1,
          },
          "-=0.6"
        )
        .from(".hero-desc", { y: 36, opacity: 0, duration: 0.9 }, "-=0.55")
        .from(".hero-actions > *", { y: 28, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-operative",
          { x: 100, opacity: 0, scale: 0.94, duration: 1.3, ease: "power3.out" },
          "-=1.1"
        )
        .from(".hud-footer > *", { y: 24, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.7");

      gsap.to(".hero-operative", {
        y: -18,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(content, {
        y: 80,
        opacity: 0.35,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero-grid">
        <div className="hero-content" ref={contentRef}>
          <span className="hero-eyebrow">01 / DEPLOYMENT READY</span>
          <h1 className="hero-title hero-title--3d">
            <span className="title-line">FUTURE IS</span>
            <span className="title-line">OUR BATTLEFIELD</span>
          </h1>
          <p className="hero-desc">
            Step into the next generation of combat. Advanced weapons.
            Ruthless enemies. One mission: <strong>Survive.</strong>
          </p>
          <div className="hero-actions">
            <MagneticButton>
              <button className="btn btn--primary" type="button">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Trailer
              </button>
            </MagneticButton>
            <MagneticButton>
              <button className="btn btn--ghost" type="button">
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Wishlist Now
              </button>
            </MagneticButton>
          </div>
        </div>

        <div className="hero-character">
          <div className="hero-operative-glow" aria-hidden="true" />
          <Image
            className="hero-operative"
            src="/operative.png"
            alt="VOIDSTRIKE operative in tactical gear and helmet"
            width={613}
            height={899}
            priority
          />
        </div>
      </div>
      <HudFooter />
    </section>
  );
}
