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



      {/* main headline */}
      <div className="relative z-10 container-wide h-full grid place-items-center px-4 sm:px-6">
        <div className="w-full max-w-[1400px] text-center">
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
