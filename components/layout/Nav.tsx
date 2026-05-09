"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Segments", href: "#segments" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background,border] duration-700 ${
        scrolled
          ? "py-3 bg-bg/70 backdrop-blur-xl border-b border-line"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-85"
          aria-label="Pairsense"
        >
          <Image
            src="/pairsense-logo.png"
            alt="Pairsense"
            width={240}
            height={88}
            priority
            className={`w-auto object-contain transition-all duration-500 ${
              scrolled ? "h-12 md:h-14" : "h-16 md:h-20"
            }`}
          />
          <span
            aria-hidden
            className="hidden lg:inline-block h-6 w-px bg-line-strong"
          />
          <span
            aria-hidden
            className="hidden lg:inline-block mono text-[9.5px] uppercase tracking-[0.28em] text-moss"
          >
            Sensory <br />Systems · Est. ’26
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {items.map((it, i) => (
            <a
              key={it.href}
              href={it.href}
              className="mono text-[11px] uppercase tracking-[0.22em] text-ink/70 hover:text-ink transition-colors"
            >
              <span className="numeral mr-2 text-moss">
                0{i + 1}
              </span>
              {it.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary hidden md:inline-flex">
          <span>Begin a formulation</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </div>
    </header>
  );
}
