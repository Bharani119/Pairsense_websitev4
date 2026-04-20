"use client";
import Reveal from "@/components/ui/Reveal";

export default function WhoWeAre() {
  return (
    <section className="section section-border relative overflow-hidden">
      {/* diagonal ornament grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
        }}
      />
      <div className="container-wide relative">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow">
              <span className="rule" />
              Manifesto · 03
            </div>
            <div className="mt-8 mono text-[11px] text-ink/50 leading-[1.8] max-w-[28ch]">
              Pairsense operates as a sensory atelier for category-leading
              brands, engineering profiles that endure at industrial scale
              without compromising on craft.
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h2 className="display text-[clamp(40px,6.6vw,112px)] leading-[0.94]">
                Defining new-gen{" "}
                <span className="italic text-gold">taste</span> and{" "}
                <span className="italic text-moss">scent</span> across the
                world&apos;s most ambitious brands.
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { n: "1200+", l: "Aroma molecules catalogued" },
                  { n: "48", l: "Markets served" },
                  { n: "18", l: "Sector verticals" },
                  { n: "0.01%", l: "Formulation tolerance" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-line pt-5">
                    <div className="display text-[clamp(30px,3.2vw,48px)]">
                      {s.n}
                    </div>
                    <div className="mono text-[10px] uppercase tracking-[0.2em] text-moss mt-2 max-w-[20ch]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
