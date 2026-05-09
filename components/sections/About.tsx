"use client";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IMG } from "@/lib/images";

export default function About() {
  return (
    <section id="about" className="section section-border">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-10 items-stretch">
          {/* Image (Moved to right on desktop) */}
          <div className="col-span-12 lg:col-span-5 lg:order-last">
            <ParallaxImage
              src={IMG.about}
              alt="Ink blooming through water — a study in diffusion."
              className="aspect-[4/5] w-full rounded-2xl border border-line"
              overlay="forest"
              speed={0.5}
              scale={1.2}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 left-6 right-6 flex justify-between mono text-[10px] uppercase tracking-[0.22em] text-bg">
                  <span>Specimen · PS-4121</span>
                  <span>Diffusion field</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between mono text-[10px] uppercase tracking-[0.22em] text-bg">
                  <span>λ 410 · 620 nm</span>
                  <span>Index 1.428</span>
                </div>
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-bg/80"
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  aria-hidden
                >
                  <circle cx="90" cy="90" r="88" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 4" />
                  <circle cx="90" cy="90" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
                  <circle cx="90" cy="90" r="2" fill="currentColor" />
                  <line x1="0" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="0.3" />
                  <line x1="90" y1="0" x2="90" y2="180" stroke="currentColor" strokeWidth="0.3" />
                </svg>
              </div>
            </ParallaxImage>
          </div>

          {/* Content (Moved to left on desktop) */}
          <div className="col-span-12 lg:col-span-7 lg:pr-8 lg:order-first">
            <div className="eyebrow">
              <span className="rule" />
              About · 01
            </div>

            <Reveal>
              <h2 className="display mt-6 text-[clamp(40px,5.4vw,84px)] leading-[0.95]">
                Shaping the future of{" "}
                <span className="italic text-gold">flavor</span> and{" "}
                <span className="italic text-gold">fragrance</span>.
              </h2>
            </Reveal>

            <div className="mt-10 grid md:grid-cols-2 gap-8 text-[14.5px] leading-[1.8] text-ink/80">
              <Reveal delay={120}>
                <p>
                  We are a flavor and fragrance company focused on developing
                  high-performance sensory solutions tailored to real-world
                  products. From concept to production, we work closely with
                  brands to create distinctive flavor and fragrance profiles
                  that align with their vision, application, and market
                  positioning.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p>
                  Our approach combines advanced formulation techniques with
                  carefully selected aroma chemicals and specialty ingredients
                  to ensure consistency, stability, and scalability across every
                  batch. Whether building a new product or refining an existing
                  one, we serve as a dedicated partner in bringing reliable,
                  market-ready sensory experiences to life.
                </p>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <div className="mt-12 flex items-center gap-6 border-t border-line pt-8">
                <a href="#contact-form" className="btn btn-primary">
                  Begin a partnership
                </a>
                <a
                  href="#segments"
                  className="mono text-[11px] uppercase tracking-[0.22em] text-ink link-underline"
                >
                  Explore applications
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
