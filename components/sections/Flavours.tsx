"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const ScrollImageSequence = dynamic(
  () => import("@/components/three/ScrollImageSequence"),
  { ssr: false }
);

const HERO_VIDEOS = [
  { src: "/fragrance.mp4",   portion: 187 / 667 },
  { src: "/flavour.mp4",     portion: 240 / 667 },
  { src: "/flavor-two.mp4",  portion: 240 / 667 },
];

const PORTION_1 = 187 / 667;
const PORTION_2 = (187 + 240) / 667;

export default function Flavours() {
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const block5Ref = useRef<HTMLDivElement>(null);
  const block6Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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
    // Distribute all 6 phases evenly before the end of the second video
    const step = PORTION_2 / 6;
    
    fade(block1Ref, 0, step);
    fade(block2Ref, step, step * 2);
    fade(block3Ref, step * 2, step * 3);
    fade(block4Ref, step * 3, step * 4);
    fade(block5Ref, step * 4, step * 5);
    // Extend Phase 06 slightly past the video boundary so it stays visible until the blast hits
    fade(block6Ref, step * 5, PORTION_2 + 0.06);

    if (finalRef.current) {
      // Delay the finale text until the fruit/food scene in the third video (~85% scroll progress)
      const startFinale = 0.85;
      const fadeIn = Math.max(0, Math.min(1, (progress - startFinale) / 0.06));
      finalRef.current.style.opacity = String(fadeIn);
      finalRef.current.style.transform = `translate(-50%, calc(-50% - 40px + ${20 - (progress - startFinale) * 60}px))`;
    }

    if (scrollIndicatorRef.current) {
      // Fade out indicator quickly as user begins scrolling the sequence
      scrollIndicatorRef.current.style.opacity = String(Math.max(0, 1 - progress * 15));
    }
  }, []);

  return (
    <ScrollImageSequence
      videos={HERO_VIDEOS}
      scrollFactor={10}
      onProgress={handleProgress}
    >
      <div className="relative h-full w-full">
        {/* Scroll Indicator */}
        {/* <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none transition-transform duration-700"> */}
          {/* <div className="glass px-6 py-5 rounded-[28px] flex flex-col items-center gap-4 shadow-2xl backdrop-blur-2xl border-white/15"> */}
            {/* <span className="mono text-[11px] font-medium uppercase tracking-[0.35em] text-[#eedb9f] ml-1">Scroll to explore</span> */}
            {/* <div className="w-[1.5px] h-[44px] bg-white/20 relative overflow-hidden rounded-full"> */}
              {/* <div className="absolute inset-0 bg-[#eedb9f] animate-scroll-down" style={{ boxShadow: "0 0 12px #eedb9f" }} /> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Sequence 01: Left */}
        <div ref={block1Ref} className="absolute left-[8%] top-[25%] z-20 pointer-events-none" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 01</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Fragrance</h2>
          <div className="flex flex-col gap-5">
              <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Top Notes</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Bergamot, Yuzu, and saffron-kissed Cardamom.</p>
             </div>
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Heart Notes</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Violet petals, Sea fennel, and Chalk mineral.</p>
             </div>
          </div>
        </div>

        {/* Sequence 01: Right (Now Phase 02) */}
        <div ref={block2Ref} className="absolute right-[8%] top-[40%] z-20 pointer-events-none text-right" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6 ml-auto" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60 drop-shadow-md">Phase 02</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8 drop-shadow-lg">Resonance</h2>
          <div className="flex flex-col gap-5 items-end">
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Base Notes</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Aged oud, Haitian vetiver, and Tonka bean.</p>
             </div>
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Sillage</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">A long, seamless finish that suggests modern luxury.</p>
             </div>
          </div>
        </div>

        {/* Sequence 02: Left */}
        <div ref={block3Ref} className="absolute left-[8%] top-[25%] z-20 pointer-events-none" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 03</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8">Synthesis</h2>
          <div className="flex flex-col gap-5">
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Sensory Integration</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Merging olfactory and gustatory elements for a full spectrum experience.</p>
             </div>
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Molecular Balance</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Achieving perfect harmony at the molecular level, bridging taste and smell.</p>
             </div>
          </div>
        </div>

        {/* Sequence 02: Right (Now Phase 04) */}
        <div ref={block4Ref} className="absolute right-[8%] top-[40%] z-20 pointer-events-none text-right" style={{ opacity: 0 }}>
          <div className="h-px w-16 bg-white/40 mb-6 ml-auto" />
          <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60 drop-shadow-md">Phase 04</p>
          <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-8 drop-shadow-lg">Palate</h2>
          <div className="flex flex-col gap-5 items-end">
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Savory Profiles</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Smoked Hickory, Black Truffle, and Sea Salt.</p>
             </div>
             <div>
                <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Umami Essence</p>
                <p className="text-[15px] text-white/90 leading-relaxed max-w-[280px] drop-shadow-md font-medium">Roasted shiitake, aged black garlic, and kelp.</p>
             </div>
          </div>
        </div>

        {/* Sequence 03: Center Top */}
        <div className="absolute left-0 right-0 top-[15%] z-20 pointer-events-none flex justify-center">
          <div ref={block5Ref} className="text-center flex flex-col items-center w-full px-5" style={{ opacity: 0 }}>
            <div className="h-px w-16 bg-white/40 mb-6" />
            <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60">Phase 05</p>
            <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-6">Flavour</h2>
             <div className="flex flex-col gap-6 items-center">
               <div className="flex flex-col items-center text-center">
                  <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Botanical Extracts</p>
                  <p className="text-[15px] text-white/90 leading-relaxed max-w-[380px] drop-shadow-md font-medium">Madagascar Vanilla, Wild Mint, and Lemongrass.</p>
               </div>
               <div className="flex flex-col items-center text-center">
                  <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Fruit Essences</p>
                  <p className="text-[15px] text-white/90 leading-relaxed max-w-[380px] drop-shadow-md font-medium">Sicilian Lemon, Ripe Peach, and Wild Berries.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Sequence 03: Center Bottom (Now Phase 06) */}
        <div className="absolute left-0 right-0 top-[15%] z-20 pointer-events-none flex justify-center">
          <div ref={block6Ref} className="text-center flex flex-col items-center w-full px-5" style={{ opacity: 0 }}>
            <div className="h-px w-16 bg-white/40 mb-6" />
            <p className="mono mb-2 text-[11px] uppercase tracking-[0.4em] text-white/60 drop-shadow-md">Phase 06</p>
            <h2 className="display text-[clamp(48px,6vw,90px)] leading-[0.9] text-white mb-6 drop-shadow-lg">Identity</h2>
            <div className="flex flex-col gap-6 items-center">
               <div className="flex flex-col items-center text-center">
                  <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Brand Signature</p>
                  <p className="text-[15px] text-white/90 leading-relaxed max-w-[380px] drop-shadow-md font-medium">A recognisable, repeatable sensory identity tailored to perfection.</p>
               </div>
               <div className="flex flex-col items-center text-center">
                  <p className="text-[11px] mono uppercase tracking-widest text-[#eedb9f] mb-1 drop-shadow-md">Market Delivery</p>
                  <p className="text-[15px] text-white/90 leading-relaxed max-w-[380px] drop-shadow-md font-medium">Engineered for the world&apos;s most ambitious brands and discerning palates.</p>
               </div>
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
