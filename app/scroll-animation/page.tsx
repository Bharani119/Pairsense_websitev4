"use client";

import ScrollImageSequence from "@/components/three/ScrollImageSequence";
import ScrollTextOverlay from "@/components/ui/ScrollTextOverlay";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function ScrollAnimationPage() {
  const TOTAL_FRAMES = 240;
  const sectionRef = useRef<HTMLElement>(null);

  const narrativeSections = [
    {
      start: 0.1,
      end: 0.25,
      subtitle: "01. The Core",
      title: "Molecular Precision",
      description: "Every sensory system begins at the molecular level, where absolute precision meets artistic intent."
    },
    {
      start: 0.4,
      end: 0.55,
      subtitle: "02. Synthesis",
      title: "Fluid Synthesis",
      description: "A convergence of high-performance formulation and artisanal craftsmanship, engineered for the senses."
    },
    {
      start: 0.7,
      end: 0.85,
      subtitle: "03. Resonance",
      title: "Olfactory Identity",
      description: "Crafting final signatures that linger in memory and define the global brand identities of tomorrow."
    }
  ];
  
  return (
    <main className="bg-black text-white">
      {/* Intro Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono text-[11px] tracking-[0.4em] uppercase text-moss mb-6 block">
            Digital Monograph
          </span>
          <h1 className="display text-[clamp(48px,10vw,140px)] leading-[0.85] tracking-tight">
            Molecular <br />
            <span className="italic text-ink-soft">Fluidity</span>
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="mono text-[9px] tracking-[0.2em] uppercase text-zinc-500">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-moss/50 to-transparent" />
        </motion.div>
      </section>

      {/* Sequence Section */}
      <section ref={sectionRef} className="relative">
        <ScrollImageSequence 
          frameCount={TOTAL_FRAMES}
          baseUrl="/ezgif-frames"
          scrollFactor={5} // Scrolled height will be 500vh
        />
        
        <ScrollTextOverlay 
          sections={narrativeSections} 
          containerRef={sectionRef} 
        />
      </section>

      {/* Outro Section */}
      <section className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="container text-center max-w-2xl">
          <h2 className="display text-5xl mb-8">Ready to create?</h2>
          <p className="text-zinc-400 font-light mb-12 leading-relaxed">
            Partner with Pairsense to engineer your brand&apos;s unique olfactory signature 
            using our proprietary sensory intelligence systems.
          </p>
          <div className="flex justify-center gap-6">
            <a href="/" className="btn btn-primary">Start a Project</a>
            <a href="/" className="btn">View Capabilities</a>
          </div>
        </div>
      </section>
    </main>
  );
}
