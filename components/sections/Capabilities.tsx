"use client";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IMG } from "@/lib/images";

const caps = [
  {
    n: "01",
    title: "Concept to Creation",
    body: "Bringing brand ideas to life through carefully developed flavor and fragrance compositions aligned with your product vision.",
    image: IMG.capabilities.concept,
    alt: "Minimal sketch studies on paper.",
    tag: "Atelier",
  },
  {
    n: "02",
    title: "Ingredient Intelligence",
    body: "Selecting and combining aroma molecules and functional ingredients to achieve balanced, application-ready formulations.",
    image: IMG.capabilities.ingredients,
    alt: "Close macro texture suggesting molecular structure.",
    tag: "Substance",
  },
  {
    n: "03",
    title: "Application Compatibility",
    body: "Ensuring each creation delivers a consistent and stable sensory experience within its intended product environment.",
    image: IMG.capabilities.application,
    alt: "Liquid captured in motion as it meets glass.",
    tag: "Integration",
  },
  {
    n: "04",
    title: "Sectors We Serve",
    body: "Serving personal care, home care, lifestyle, tobacco, shisha, and industrial sectors globally.",
    image: IMG.capabilities.sectors,
    alt: "Topographic abstract suggesting global footprint.",
    tag: "Global",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section section-border bg-bg-alt/60">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="col-span-1 md:col-span-5">
            <div className="eyebrow">
              <span className="rule" />
              Core Capabilities · 04
            </div>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(40px,5vw,72px)]">
                What we <span className="italic text-gold">do</span>, measured.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-1 md:col-span-7 md:pl-10">
            <Reveal delay={120}>
              <p className="text-[14px] leading-[1.8] text-ink/70 max-w-[58ch]">
                Four interlocking disciplines that together produce a reliable,
                reproducible sensory signature — engineered for the demands of
                modern manufacturing and the discernment of modern consumers.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caps.map((c, i) => (
            <Reveal key={c.n} delay={i * 100}>
              <TiltCard max={4}>
                <article className="group relative rounded-2xl border border-line bg-bg-warm overflow-hidden h-full flex flex-col">
                  <ParallaxImage
                    src={c.image}
                    alt={c.alt}
                    className="aspect-[16/10] w-full"
                    overlay="forest"
                    speed={0.3}
                    scale={1.5}
                  >
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-ink">
                      <div className="flex items-start justify-between">
                        <div className="numeral" style={{ color: "rgba(246,243,234,0.98)" }}>
                          {c.n} / 04
                        </div>
                        <div className="mono text-[10px] uppercase tracking-[0.22em] opacity-90">
                          Pairsense · Capability
                        </div>
                      </div>
                      <div className="mono text-[10px] uppercase tracking-[0.22em] text-gold">
                        {c.tag}
                      </div>
                    </div>
                  </ParallaxImage>

                  <div className="p-10 flex flex-col gap-5">
                    <h3 className="display text-[clamp(26px,2.4vw,40px)] leading-[1]">
                      {c.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] text-ink/75 max-w-[52ch]">
                      {c.body}
                    </p>
                  </div>

                  <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
