"use client";

import ScrollVideoCanvas from "@/components/three/ScrollVideoCanvas";
import ScrollTextOverlay from "@/components/ui/ScrollTextOverlay";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function ScrollVideoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Frame counts based on the asset list (goes up to frame 240)
  const TOTAL_FRAMES = 240;

  const videoNarrative = [
    {
      start: 0.1,
      end: 0.3,
      subtitle: "Extraction",
      title: "Molecular Essence",
      description: "Pure aroma molecules captured at the peak of their expression through advanced sensory technology."
    },
    {
      start: 0.4,
      end: 0.6,
      subtitle: "Synthesis",
      title: "Digital Artistry",
      description: "Where molecular precision meets artisanal craftsmanship to define a new era of olfactory experience."
    },
    {
      start: 0.7,
      end: 0.9,
      subtitle: "Maturation",
      title: "Ageless Resonance",
      description: "A patient evolution of sensory complexity that transforms brand identities into lasting memories."
    }
  ];
  
  return (
    <main className="bg-black text-white">
      {/* Cinematic Intro */}
      <section className="h-screen flex items-center justify-center container-wide text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-moss mb-4 block">
            Visual Monograph
          </span>
          <h1 className="display text-[clamp(40px,8vw,120px)] leading-[0.9]">
            The Fluidity <br />
            <span className="italic text-ink-soft">of Scent</span>
          </h1>
        </motion.div>
      </section>

      {/* Interactive Scroll Section */}
      <section ref={containerRef} className="relative">
        <ScrollVideoCanvas 
          frameCount={TOTAL_FRAMES}
          baseUrl="/ezgif-frames"
          prefix="ezgif-frame-"
          extension=".jpg"
          padding={3}
          scrollFactor={5}
        />
        
        <ScrollTextOverlay 
          sections={videoNarrative} 
          containerRef={containerRef} 
        />
      </section>

      {/* Outro */}
      <section className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center max-w-xl mx-auto px-6">
          <h2 className="display text-4xl mb-6">Experience Tomorrow.</h2>
          <p className="text-ink/60 text-sm leading-relaxed mb-10">
            Our sensory systems are engineered to transform brand identities into 
            unforgettable olfactory signatures.
          </p>
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
