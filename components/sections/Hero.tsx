"use client";
import dynamic from "next/dynamic";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";

const MolecularField = dynamic(
  () => import("@/components/three/MolecularField"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden">
      {/* atmospheric gradient base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 20%, #141008 0%, #0a0805 45%, #060401 100%)",
        }}
      />

      {/* 3D molecular field */}
      <div className="absolute inset-0">
        <MolecularField />
      </div>

      {/* top meta strip */}
      <div className="relative z-10 container-wide pt-32">
        <div className="flex items-center justify-between mono text-[11px] tracking-[0.22em] uppercase text-moss">
          <span>
            <span className="numeral mr-2">N°</span>
            01 · Sensory Systems
          </span>
          <span className="hidden md:inline">
            Est. Mumbai · Geneva · Singapore
          </span>
          <span>2026 Edition</span>
        </div>
      </div>

      {/* main headline */}
      <div className="relative z-10 container-wide h-full grid place-items-center px-4 sm:px-6">
        <div className="-mt-16 w-full max-w-[1400px] text-center">
          <h1 className="display mx-auto max-w-[12ch] text-[clamp(44px,9vw,184px)] leading-[0.92]">
            <span className="block">
              <SplitText text="Engineering flavors." />
            </span>
            <span className="block italic text-ink-soft">
              <SplitText text="Crafting fragrances." delay={220} />
            </span>
          </h1>

          <Reveal delay={800}>
            <p className="mt-10 mx-auto max-w-[540px] text-[15px] leading-[1.7] text-ink/75">
              A precision formulation house designing high-performance
              sensory systems — from aroma molecule to market-ready
              product — for the world&apos;s most ambitious brands.
            </p>
          </Reveal>

          <Reveal delay={1000}>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <a href="#process" className="btn btn-primary">
                Explore the process
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 2v8M2 6l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <a href="#contact" className="btn">
                Commission a scent
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* bottom corner marks */}
      <div className="absolute left-0 right-0 bottom-6 z-10 container-wide">
        <div className="flex items-end justify-between">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss">
            Scroll
            <span className="block mt-2 h-8 w-px bg-line-strong mx-auto animate-pulse" />
          </div>
          <div className="hidden md:block text-right">
            <div className="numeral mb-1">Reference · PS-0426</div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss">
              A monograph of the modern sensory house
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
