"use client";

import ParallaxScene from "@/components/three/ParallaxScene";
import type { SceneSection, SequenceConfig } from "@/components/three/ParallaxScene";
import { motion } from "framer-motion";

// ─── Static data outside component to avoid identity churn ───────────────────

const mainSequences: SequenceConfig[] = [
  { frameCount: 240, baseUrl: "/ezgif-frames" },
];

const mainNarrative: SceneSection[] = [
  {
    start: 0.1,
    end: 0.3,
    eyebrow: "Extraction",
    title: "Molecular Essence",
    description:
      "Pure aroma molecules captured at the peak of their expression through advanced sensory technology.",
  },
  {
    start: 0.4,
    end: 0.6,
    eyebrow: "Synthesis",
    title: "Digital Artistry",
    description:
      "Where molecular precision meets artisanal craftsmanship to define a new era of olfactory experience.",
  },
  {
    start: 0.7,
    end: 0.9,
    eyebrow: "Maturation",
    title: "Ageless Resonance",
    description:
      "A patient evolution of sensory complexity that transforms brand identities into lasting memories.",
  },
];

// testing_one (132 frames) + testing_two (240 frames) = 372 total
// testing_one occupies progress 0 → 132/372 ≈ 0.355
// testing_two occupies progress 0.355 → 1.0
const combinedSequences: SequenceConfig[] = [
  { frameCount: 132, baseUrl: "/testing_one" },
  { frameCount: 240, baseUrl: "/testing_two" },
];

const combinedNarrative: SceneSection[] = [
  {
    // testing_one early section
    start: 0.04,
    end: 0.17,
    eyebrow: "Origins",
    title: "Source Material",
    description:
      "The rarest botanicals, ethically harvested at precise seasonal intervals to capture peak aromatic potential.",
  },
  {
    // testing_one late section
    start: 0.22,
    end: 0.33,
    eyebrow: "Alchemy",
    title: "The Transformation",
    description:
      "Ancient distillation techniques refined through modern molecular science create compounds of singular beauty.",
  },
  {
    // testing_two early section
    start: 0.44,
    end: 0.63,
    eyebrow: "Refinement",
    title: "Pure Essence",
    description:
      "Each molecule is scrutinized for purity and resonance before earning its place in the final composition.",
  },
  {
    // testing_two late section
    start: 0.72,
    end: 0.93,
    eyebrow: "Expression",
    title: "Identity Signature",
    description:
      "A brand's olfactory identity becomes its most intimate and enduring communication with the world.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ScrollVideoPage() {
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
            <span className="italic text-zinc-500">of Scent</span>
          </h1>
        </motion.div>
      </section>

      {/* Main Scroll Scene — 240-frame molecular sequence */}
      <ParallaxScene
        sequences={mainSequences}
        scrollFactor={5}
        sections={mainNarrative}
        textAlign="center"
      />

      {/* Combined Scene — testing_one (132 frames) then testing_two (240 frames) */}
      <ParallaxScene
        sequences={combinedSequences}
        scrollFactor={5}
        sections={combinedNarrative}
        textAlign="center"
      />

      {/* Outro */}
      <section className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center max-w-xl mx-auto px-6">
          <h2 className="display text-4xl mb-6">Experience Tomorrow.</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-10">
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
