"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const ScrollImageSequence = dynamic(
  () => import("@/components/three/ScrollImageSequence"),
  { ssr: false }
);

const MOLECULES = [
  {
    id: "citrus",
    num: "01",
    name: "Citrus & Spice",
    color: "#d4870a",
    desc: "Bergamot, yuzu, and saffron-kissed cardamom — luminous top notes engineered for lasting radiance and warmth.",
    style: { left: "2%", top: "30%" },
  },
  {
    id: "marine",
    num: "02",
    name: "Marine & Mineral",
    color: "#2d8db8",
    desc: "Sea fennel, calone, and chalk mineral — a clean contemporary freshness for brands that move at the speed of water.",
    style: { right: "2%", top: "38%" },
  },
  {
    id: "floral",
    num: "03",
    name: "Floral & Gourmand",
    color: "#9b6bb5",
    desc: "Violet petals folded over tonka and vanilla — intimate, deeply layered, and crafted for modern luxury.",
    style: { left: "2%", top: "79%" },
  },
  {
    id: "woody",
    num: "04",
    name: "Woody & Resinous",
    color: "#6b8e4e",
    desc: "Aged oud, labdanum, and Haitian vetiver — the living earth beneath every lasting composition.",
    style: { right: "2%", top: "75%" },
  },
];

export default function Flavours() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleProgress = useCallback((progress: number) => {
    if (!overlayRef.current) return;
    const opacity = Math.max(0, Math.min(1, (progress - 0.72) / 0.18));
    overlayRef.current.style.opacity = String(opacity);
  }, []);

  return (
    <ScrollImageSequence
      frameCount={187}
      baseUrl="/fragrance-animation"
      prefix=""
      padding={4}
      extension=".jpg"
      scrollFactor={6}
      onProgress={handleProgress}
    >
      <div className="relative w-full h-full">
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          {/* Section heading — floats in the central light shaft */}
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
            <p className="mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">
              N° 02 · The Flavour Spectrum
            </p>
            <h2 className="display text-[clamp(20px,3vw,44px)] text-white/90 leading-tight">
              Four pillars.{" "}
              <span className="italic text-white/55">Infinite compositions.</span>
            </h2>
          </div>

          {/* Molecule content cards */}
          {MOLECULES.map((m) => (
            <div
              key={m.id}
              className="absolute pointer-events-none"
              style={{ ...m.style, maxWidth: "210px" }}
            >
              <div
                className="mb-3"
                style={{
                  width: "28px",
                  height: "1px",
                  background: m.color,
                }}
              />
              <p
                className="mono text-[9px] tracking-[0.28em] uppercase mb-1"
                style={{ color: m.color }}
              >
                N° {m.num}
              </p>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white mb-2">
                {m.name}
              </h3>
              <p className="text-[10.5px] leading-[1.65] text-white/60">
                {m.desc}
              </p>
            </div>
          ))}

          {/* Bottom right reference mark */}
          <div className="absolute bottom-6 right-6 text-right pointer-events-none">
            <div className="mono text-[9px] uppercase tracking-[0.22em] text-white/30">
              Molecular palette · PS-0426
            </div>
          </div>
        </div>
      </div>
    </ScrollImageSequence>
  );
}
