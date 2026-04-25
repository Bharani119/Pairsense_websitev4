"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const ScrollImageSequence = dynamic(
  () => import("@/components/three/ScrollImageSequence"),
  { ssr: false }
);

const HERO_SEQUENCES = [
  {
    frameCount: 187,
    baseUrl: "/fragrance-animation",
    prefix: "",
    padding: 4,
    extension: ".jpg",
  },
  {
    frameCount: 240,
    baseUrl: "/flavour-animation",
    prefix: "ezgif-frame-",
    padding: 3,
    extension: ".png",
  },
  {
    frameCount: 240,
    baseUrl: "/flavor-two-animation",
    prefix: "ezgif-frame-",
    padding: 3,
    extension: ".jpg",
  },
] as const;

const TOTAL_FRAMES = HERO_SEQUENCES.reduce((sum, sequence) => sum + sequence.frameCount, 0);
const PORTION_1 = HERO_SEQUENCES[0].frameCount / TOTAL_FRAMES;
const PORTION_2 = (HERO_SEQUENCES[0].frameCount + HERO_SEQUENCES[1].frameCount) / TOTAL_FRAMES;

export default function Flavours() {
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const block5Ref = useRef<HTMLDivElement>(null);
  const block6Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const handleProgress = useCallback((progress: number) => {
    const fade = (ref: React.RefObject<HTMLDivElement>, start: number, end: number) => {
      if (ref.current) {
        let fadeIn = Math.max(0, Math.min(1, (progress - start) / 0.03));
        if (start === 0) fadeIn = Math.max(0, Math.min(1, progress / 0.03));
        const fadeOut = Math.max(0, Math.min(1, (end - progress) / 0.03));
        ref.current.style.opacity = String(Math.min(fadeIn, fadeOut));
        ref.current.style.transform = `translateY(${20 - (progress - start) * 100}px)`;
      }
    };

    fade(block1Ref, 0, PORTION_1);
    fade(block2Ref, 0, PORTION_1);
    
    fade(block3Ref, PORTION_1, PORTION_2);
    fade(block4Ref, PORTION_1, PORTION_2);
    
    fade(block5Ref, PORTION_2, 0.94);
    fade(block6Ref, PORTION_2, 0.94);

    if (finalRef.current) {
      const fadeIn = Math.max(0, Math.min(1, (progress - 0.94) / 0.04));
      finalRef.current.style.opacity = String(fadeIn);
      finalRef.current.style.transform = `translate(-50%, calc(-50% + ${40 - (progress - 0.94) * 200}px))`;
    }
  }, []);

  return (
    <ScrollImageSequence
      sequences={[...HERO_SEQUENCES]}
      scrollFactor={10}
      onProgress={handleProgress}
    >
      <div className="relative h-full w-full">
        {/* Sequence 01: Left */}
        <div ref={block1Ref} className="absolute left-[8%] top-[25%] z-20 pointer-events-none" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 01</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Fragrance</h2>
          <div className="flex flex-col gap-5">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Top Notes</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Bergamot, Yuzu, and saffron-kissed Cardamom.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Heart Notes</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Violet petals, Sea fennel, and Chalk mineral.</p>
             </div>
          </div>
        </div>

        {/* Sequence 01: Right */}
        <div ref={block2Ref} className="absolute right-[8%] top-[55%] z-20 pointer-events-none text-right" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6 ml-auto" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 01</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Resonance</h2>
          <div className="flex flex-col gap-5 items-end">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Base Notes</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Aged oud, Haitian vetiver, and Tonka bean.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Sillage</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">A long, seamless finish that suggests modern luxury.</p>
             </div>
          </div>
        </div>

        {/* Sequence 02: Left */}
        <div ref={block3Ref} className="absolute left-[8%] top-[25%] z-20 pointer-events-none" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 02</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Synthesis</h2>
          <div className="flex flex-col gap-5">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Sensory Integration</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Merging olfactory and gustatory elements for a full spectrum experience.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Molecular Balance</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Achieving perfect harmony at the molecular level, bridging taste and smell.</p>
             </div>
          </div>
        </div>

        {/* Sequence 02: Right */}
        <div ref={block4Ref} className="absolute right-[8%] top-[55%] z-20 pointer-events-none text-right" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6 ml-auto" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 02</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Palate</h2>
          <div className="flex flex-col gap-5 items-end">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Savory Profiles</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Smoked Hickory, Black Truffle, and Sea Salt.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Umami Essence</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Roasted shiitake, aged black garlic, and kelp.</p>
             </div>
          </div>
        </div>

        {/* Sequence 03: Left */}
        <div ref={block5Ref} className="absolute left-[8%] top-[25%] z-20 pointer-events-none" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 03</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Flavour</h2>
          <div className="flex flex-col gap-5">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Botanical Extracts</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Madagascar Vanilla, Wild Mint, and Lemongrass.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Fruit Essences</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Sicilian Lemon, Ripe Peach, and Wild Berries.</p>
             </div>
          </div>
        </div>

        {/* Sequence 03: Right */}
        <div ref={block6Ref} className="absolute right-[8%] top-[55%] z-20 pointer-events-none text-right" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6 ml-auto" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 03</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Identity</h2>
          <div className="flex flex-col gap-5 items-end">
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Brand Signature</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">A recognisable, repeatable sensory identity tailored to perfection.</p>
             </div>
             <div>
                <p className="text-[10px] mono uppercase tracking-widest text-white/70 mb-1">Market Delivery</p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-[240px]">Engineered for the world&apos;s most ambitious brands and discerning palates.</p>
             </div>
          </div>
        </div>

        {/* Final Centered Text */}
        <div ref={finalRef} className="absolute left-1/2 top-1/2 z-30 pointer-events-none text-center flex flex-col items-center w-full px-5" style={{ opacity: 0, transform: 'translate(-50%, -50%)' }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-4 text-[11px] uppercase tracking-[0.4em] text-white/60">The Finale</p>
          <h2 className="display text-[clamp(50px,8vw,110px)] leading-[0.9] text-white mb-6">
            Absolute <br/>
            <span className="italic text-white/50">Harmony.</span>
          </h2>
          <p className="text-[14px] text-white/50 leading-relaxed max-w-[400px]">
            Where precise engineering meets the art of the senses, creating experiences that linger far beyond the moment.
          </p>
        </div>
      </div>
    </ScrollImageSequence>
  );
}
