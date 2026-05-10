"use client";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";

const categories = [
  "Fine Fragrance",
  "Personal Care",
  "Home Care",
  "Air Care",
  "Fabric Care",
  "Beverages",
  "Dairy",
  "Bakery",
  "Confectionery",
  "Snacks",
  "Seasonings",
  "Nutraceuticals",
  "Hospitality",
  "Tobacco",
  "Shisha",
  "Industrial",
];

export default function CategoryStrip() {
  return (
    <section id="global-reach" className="section-border py-20 bg-bg-alt text-ink overflow-hidden relative">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="container-wide mb-10 flex items-end justify-between relative">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-gold/60">
            <span className="rule" style={{ background: "var(--gold)" }} />
            Global Reach · 02
          </div>
          <Reveal>
            <h3 className="display text-[clamp(32px,3.4vw,56px)] mt-4 max-w-[800px]">
              Sixteen categories. One disciplined <em className="text-gold not-italic">house</em>.
            </h3>
          </Reveal>
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.22em] text-gold/60 hidden md:block">
          continuous index ·
        </div>
      </div>

      <Marquee speed={65}>
        {categories.map((c) => (
          <div key={c} className="flex items-center gap-16 shrink-0">
            <span className="display text-[clamp(40px,6vw,96px)] leading-none">
              {c}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="3" fill="var(--gold)" />
            </svg>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
