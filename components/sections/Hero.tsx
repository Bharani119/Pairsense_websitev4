"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";

const MolecularField = dynamic(
  () => import("@/components/three/MolecularField"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-bg">
      {/* atmospheric gradient base */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 20%, #2e2814 0%, #1e1a0f 45%, #0a0805 100%)",
        }}
      />

      {/* 3D molecular field */}
      <div className="absolute inset-0 z-0">
        <MolecularField />
      </div>

      {/* ── FRAGRANCE side (Left) ─────────────────────────────────────── */}
      <div 
        className="absolute left-[-5vw] bottom-[5vh] z-10 w-[35vw] max-w-[540px] hidden lg:block opacity-80"
        style={{
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden mb-6">
          <Image
            src="/hero_fragrance.png"
            alt="Luxury perfume bottle with white flowers"
            fill
            className="object-contain mix-blend-lighten"
            priority
          />
        </div>
        <div className="pl-[8vw]">
          <div className="flex items-center gap-2 mb-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
             <span className="mono text-[11px] uppercase tracking-[0.3em] text-ink/80 font-bold">Fragrance</span>
          </div>
          <p className="text-[12px] leading-[1.6] text-ink/40 max-w-[24ch]">
            Engineered aromatic molecules for captivating scents.
          </p>
        </div>
      </div>

      {/* ── FLAVOR side (Right) ────────────────────────────────────────── */}
      <div 
        className="absolute right-[-5vw] bottom-[5vh] z-10 w-[35vw] max-w-[540px] hidden lg:block opacity-80"
        style={{
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden mb-6">
          <Image
            src="/hero_flavor.png"
            alt="Gourmet fruits and vanilla beans"
            fill
            className="object-contain mix-blend-lighten"
            priority
          />
        </div>
        <div className="pr-[8vw] text-right">
          <div className="flex items-center gap-2 mb-2 justify-end">
             <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
             <span className="mono text-[11px] uppercase tracking-[0.3em] text-ink/80 font-bold">Flavor</span>
          </div>
          <p className="text-[12px] leading-[1.6] text-ink/40 max-w-[24ch] ml-auto">
            Precision flavors for unforgettable taste experiences.
          </p>
        </div>
      </div>

      {/* main headline */}
      <div className="relative z-20 container-wide h-full grid place-items-center px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-[1400px] text-center pointer-events-auto">
          <h1 className="display mx-auto max-w-[12ch] text-[clamp(44px,9vw,184px)] leading-[0.92] text-ink">
            <span className="block">
              <SplitText text="Engineering flavors." />
            </span>
            <span className="block italic text-ink-soft">
              <SplitText text="Crafting fragrances." delay={220} />
            </span>
          </h1>

          <Reveal delay={800}>
            <p className="mt-10 mx-auto max-w-[540px] text-[15px] leading-[1.7] text-ink/75">
              A precision formulation house designing high performance
              sensory systems from aroma molecule to market ready
              product for the world&apos;s most ambitious brands.
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
    </section>
  );
}
