"use client";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IMG } from "@/lib/images";

const items = [
  {
    n: "01",
    title: "Ingredient Sourcing",
    body: "Curating exceptional aroma molecules and refined extracts from global partners to craft a sophisticated and enduring sensory foundation.",
    image: IMG.process.sourcing,
    alt: "Botanical ingredients laid against a muted neutral ground.",
    tag: "Raw Matter · Curation",
    focal: "50% 20%",
  },
  {
    n: "02",
    title: "Custom Formulations",
    body: "Advanced formulation by intelligent flavourists and perfumers, engineering high-precision molecular composition tailored for application-specific performance, consistency and scalability.",
    image: IMG.process.formulation,
    alt: "Laboratory glassware holding amber liquid in soft studio light.",
    tag: "Molecular · Engineering",
    focal: "50% 50%",
  },
  {
    n: "03",
    title: "Sensory Validation",
    body: "Comprehensive evaluation of stability, diffusion, and sensory integrity to ensure consistent performance across real-world applications and production environments.",
    image: IMG.process.validation,
    alt: "Ink dispersing in water, slow diffusion caught mid-bloom.",
    tag: "Performance · Index",
    focal: "50% 50%",
  },
];

export default function Process() {
  return (
    <section id="process" className="section section-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="col-span-1 md:col-span-4">
            <div className="eyebrow">
              <span className="rule" />
              The Method · 05
            </div>
          </div>
          <div className="col-span-1 md:col-span-8">
            <Reveal>
              <h2 className="display text-[clamp(40px,5.4vw,84px)] max-w-[900px]">
                A <span className="italic text-gold">three-movement</span>{" "}
                discipline — from molecule to finished artefact.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 140}>
              <TiltCard className="group h-full" max={4}>
                <article className="relative h-full rounded-2xl border border-line bg-bg-warm overflow-hidden flex flex-col">
                  <ParallaxImage
                    src={it.image}
                    alt={it.alt}
                    className="aspect-[4/5] w-full"
                    overlay="forest"
                    speed={0.35}
                    scale={1.18}
                    focal={it.focal}
                  >
                    {/* overlay chrome on image */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7 text-ink/90">
                      <div className="flex items-start justify-between">
                        <span className="mono text-[10px] uppercase tracking-[0.22em] opacity-90">
                          Movement · {it.n}
                        </span>
                        <span className="mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                          PS · 0{i + 1}
                        </span>
                      </div>
                      <div>
                        <div className="mono text-[10px] uppercase tracking-[0.22em] text-gold opacity-95">
                          {it.tag}
                        </div>
                        <svg
                          className="mt-3 text-ink/60"
                          width="60"
                          height="24"
                          viewBox="0 0 60 24"
                          fill="none"
                          aria-hidden
                        >
                          <path d="M1 12h56M51 6l6 6-6 6" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  </ParallaxImage>

                  <div className="p-8 flex flex-col gap-5">
                    <h3 className="display text-[clamp(28px,2.4vw,42px)] leading-[1]">
                      {it.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] text-ink/75 max-w-[46ch]">
                      {it.body}
                    </p>

                    <div className="mt-4 pt-6 border-t border-line flex items-center justify-between">
                      <span className="mono text-[11px] uppercase tracking-[0.22em] text-moss link-underline">
                        Study in detail
                      </span>
                      <svg width="18" height="18" viewBox="0 0 12 12" fill="none" aria-hidden className="text-ink transition-transform duration-500 group-hover:translate-x-1">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
