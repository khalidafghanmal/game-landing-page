"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "HOME", active: true },
  { href: "#modes", label: "MODES" },
  { href: "#weapons", label: "WEAPONS" },
  { href: "#", label: "MEDIA" },
  { href: "#", label: "COMMUNITY" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`header${scrolled ? " header--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <Link href="/" className="logo">
        <svg
          className="logo-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2L4 10v12l12 8 12-8V10L16 2z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 8l-6 4v8l6 4 6-4v-8l-6-4z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <span>VOIDSTRIKE</span>
      </Link>

      <nav className="nav">
        {NAV_LINKS.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
          >
            <Link
              href={link.href}
              className={`nav-link${link.active ? " nav-link--active" : ""}`}
            >
              {link.active ? (
                <>
                  <span className="nav-bracket">[</span>
                  {link.label}
                  <span className="nav-bracket">]</span>
                </>
              ) : (
                link.label
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="badge-pre-alpha"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <span className="badge-stripe" aria-hidden="true" />
        <span>PRE-ALPHA</span>
      </motion.div>
    </motion.header>
  );
}
