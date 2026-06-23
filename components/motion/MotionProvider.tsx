"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

type MotionContextValue = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement) => void;
};

const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  function scrollTo(target: string | number | HTMLElement) {
    if (!lenis) return;
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el instanceof HTMLElement) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      return;
    }
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  }

  return (
    <MotionContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </MotionContext.Provider>
  );
}
