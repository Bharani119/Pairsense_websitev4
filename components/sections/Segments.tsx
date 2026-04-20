"use client";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TiltCard from "@/components/ui/TiltCard";
import { IMG } from "@/lib/images";

const segments = [
  {
    n: "I",
    title: "Fine Fragrances",
    body: "Fine fragrances designed for depth, character, and long-lasting performance across premium applications.",
    tag: "Couture",
    image: IMG.segments.fine,
    alt: "Amber perfume bottle in soft cinematic light.",
  },
  {
    n: "II",
    title: "Food & Beverage",
    body: "Beverages, dairy, bakery and confectionery, snacks and savory, processed foods, and nutraceutical applications.",
    tag: "Epicure",
    image: IMG.segments.food,
    alt: "Flat-lay of raw ingredients, softly lit.",
  },
  {
    n: "III",
    title: "Seasoning Solutions",
    body: "Crafting refined seasoning blends for snacks and savory applications, delivering depth, balance, and a consistent taste experience.",
    tag: "Umami",
    image: IMG.segments.seasoning,
    alt: "Earth-toned spice powders held in careful arrangement.",
  },
  {
    n: "IV",
    title: "Beverage Solutions",
    body: "Developing tailored flavor systems for beverages, designed to deliver clarity, balance, and consistent taste across diverse formulations.",
    tag: "Clarity",
    image: IMG.segments.beverage,
    alt: "Beverage macro — condensation on glass.",
  },
];

export default function Segments() {
  return (
    <section id="segments" className="section section-border">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow">
              <span className="rule" />
              Industry Segments · 06
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(40px,5.4vw,80px)] max-w-[920px]">
                Where our <span className="italic text-gold">signatures</span>{" "}
                go to live in the world.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <TiltCard max={3.5}>
                <article className="group relative rounded-2xl overflow-hidden border border-line h-full bg-bg-warm">
                  <ParallaxImage
                    src={s.image}
                    alt={s.alt}
                    className="aspect-[4/3] w-full"
                    overlay="forest"
                    speed={0.35}
                    scale={1.18}
                  >
                    {/* content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-8 text-bg">
                      <div className="flex items-start justify-between">
                        <div className="display text-3xl md:text-4xl italic text-gold">
                          {s.n}
                        </div>
                        <div className="mono text-[9.5px] uppercase tracking-[0.22em] opacity-90">
                          {s.tag} · Volume {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div>
                        <h3 className="display text-[clamp(24px,2.4vw,38px)] leading-[1] mb-3 transition-transform duration-700 group-hover:-translate-y-1">
                          {s.title}
                        </h3>
                        <p className="text-[12.5px] leading-[1.7] max-w-[42ch] text-bg/85">
                          {s.body}
                        </p>

                        <div className="mt-5 flex items-center gap-3 mono text-[9.5px] uppercase tracking-[0.22em] text-gold">
                          <span className="inline-block w-6 h-px bg-gold" />
                          View applications
                        </div>
                      </div>
                    </div>
                  </ParallaxImage>

                  {/* hover lift indicator corner */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-bg/40 grid place-items-center text-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M1 11L11 1M11 1H3M11 1v8" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
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
