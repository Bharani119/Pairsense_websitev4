"use client";
import Marquee from "@/components/ui/Marquee";

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
    <section className="section-border py-20 bg-ink text-bg overflow-hidden relative">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />
      <div className="container-wide mb-10 flex items-end justify-between relative">
        <div>
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-mist">
            <span className="rule" style={{ background: "var(--mist)" }} />
            Global Reach · 07
          </div>
          <h3 className="display text-[clamp(32px,3.4vw,56px)] mt-4 max-w-[800px]">
            Sixteen categories. One disciplined <em className="text-gold not-italic">house</em>.
          </h3>
        </div>
        <div className="mono text-[10px] uppercase tracking-[0.22em] text-mist hidden md:block">
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
