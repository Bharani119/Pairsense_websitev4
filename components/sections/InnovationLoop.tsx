"use client";
import Marquee from "@/components/ui/Marquee";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IMG } from "@/lib/images";

const words = [
  "Absolute Precision",
  "Adaptive Intelligence",
  "Seamless Scalability",
  "True Authenticity",
  "Relentless Innovation",
];

// rotate array so each row starts on a different word — all 5 visible at once
function rotate<T>(arr: T[], n: number): T[] {
  const k = ((n % arr.length) + arr.length) % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

function Row({
  reverse = false,
  speed = 55,
  variant = "solid",
  offset = 0,
}: {
  reverse?: boolean;
  speed?: number;
  variant?: "solid" | "outline";
  offset?: number;
}) {
  const items = rotate(words, offset);
  return (
    <Marquee speed={speed} reverse={reverse}>
      {items.map((w, i) => (
        <div key={i} className="flex items-center gap-16 shrink-0">
          <span
            className={`display text-[clamp(56px,9vw,144px)] leading-none ${
              variant === "outline"
                ? "text-transparent [-webkit-text-stroke:1px_var(--ink)]"
                : "text-ink"
            }`}
          >
            {w}
          </span>
          <span className="display text-4xl text-gold italic">⸺</span>
        </div>
      ))}
    </Marquee>
  );
}

export default function InnovationLoop() {
  return (
    <section id="innovation" className="section section-border overflow-hidden relative">
      {/* parallax lab background behind the title */}
      <div className="absolute inset-x-0 top-0 h-[60%] pointer-events-none">
        <ParallaxImage
          src={IMG.innovation.lab}
          alt="Scientists and formulators working in a research laboratory."
          className="absolute inset-0"
          overlay="none"
          speed={0.3}
          scale={1.2}
          focal="50% 35%"
        />
        {/* soft dual-gradient: readable ink text up top, clean fade into the page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(246,243,234,0.92) 0%, rgba(246,243,234,0.72) 38%, rgba(246,243,234,0.88) 72%, var(--bg) 100%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply opacity-40"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, rgba(15,46,34,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-wide mb-16 flex items-end justify-between relative">
        <div>
          <div className="eyebrow">
            <span className="rule" />
            Operating Principles
          </div>
          <h2 className="display mt-6 text-[clamp(40px,5vw,72px)] max-w-[720px]">
            Five disciplines, <span className="italic text-gold">held in tension</span>.
          </h2>
        </div>
        <div className="mono text-[11px] uppercase tracking-[0.22em] text-moss hidden md:block">
          §02 · Doctrine
        </div>
      </div>

      <div className="relative flex flex-col gap-2 py-6 border-y border-line bg-bg-warm/60 backdrop-blur-sm">
        <Row speed={60} variant="solid" offset={0} />
        <Row speed={75} reverse variant="outline" offset={2} />
        <Row speed={90} variant="solid" offset={4} />
      </div>
    </section>
  );
}
