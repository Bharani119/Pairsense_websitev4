"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  { label: "About", href: "#about", n: "01" },
  { label: "Global Reach", href: "#global-reach", n: "02" },
  { label: "Manifesto", href: "#manifesto", n: "03" },
  { label: "Capabilities", href: "#capabilities", n: "04" },
  { label: "Process", href: "#process", n: "05" },
  { label: "Segments", href: "#segments", n: "06" },
  // { label: "Principles", href: "#innovation", n: "07" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "py-2.5 md:py-3 bg-bg/85 backdrop-blur-xl border-b border-line"
            : "py-4 md:py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-85 z-50"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Pairsense"
          >
            <Image
              src="/pairsense-logo.png"
              alt="Pairsense"
              width={240}
              height={88}
              priority
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled ? "h-9 md:h-14" : "h-11 md:h-20"
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

          <nav className="hidden md:flex items-center gap-6">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="mono text-[11px] uppercase tracking-[0.22em] text-ink/70 hover:text-ink transition-colors"
              >
                <span className="numeral mr-2 text-moss">
                  {it.n}
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 z-50 relative focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`h-0.5 w-6 bg-ink rounded-full transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "rotate-45 translate-y-[6px]" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink rounded-full my-1 transition-opacity duration-300 ease-in-out ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink rounded-full transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-6 mb-12">
          {items.map((it, idx) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mono text-[16px] uppercase tracking-[0.25em] text-ink/80 hover:text-ink transition-all duration-300 flex items-center gap-4 py-2"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              <span className="numeral text-xs text-moss">{it.n}</span>
              {it.label}
            </a>
          ))}
        </nav>
        
        <div className="flex flex-col gap-6">
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary w-full justify-center text-center py-4"
          >
            <span>Begin a formulation</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
