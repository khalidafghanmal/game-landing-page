"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  childSelector?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  x = 0,
  scale = 1,
  duration = 1,
  stagger = 0,
  childSelector,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const tween = gsap.from(targets, {
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      y,
      x,
      scale: scale === 1 ? undefined : scale * 0.92,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, x, scale, duration, stagger, childSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
