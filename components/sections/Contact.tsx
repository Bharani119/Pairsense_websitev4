"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { IMG } from "@/lib/images";

const applications = [
  "Fine Fragrance",
  "Personal Care",
  "Home Care",
  "Beverages",
  "Food & Snacks",
  "Seasonings",
  "Nutraceuticals",
  "Tobacco / Shisha",
  "Industrial",
  "Other",
];

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [selectedApp, setSelectedApp] = useState<string>("Fine Fragrance");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  };

  return (
    <section id="contact" className="section-border relative overflow-hidden">
      {/* hero CTA band — cream identity preserved, parallax image breathes behind the wash */}
      <div className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ParallaxImage
            src={IMG.contact.ctaBg}
            alt=""
            className="!absolute inset-0 w-full h-full"
            overlay="none"
            speed={0.35}
            scale={1.25}
            focal="50% 40%"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,8,5,0.7) 0%, rgba(10,8,5,0.4) 35%, rgba(10,8,5,0.5) 70%, rgba(10,8,5,0.8) 100%)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-60"
            style={{
              background:
                "radial-gradient(100% 70% at 70% 40%, rgba(201,168,76,0.18) 0%, transparent 60%), radial-gradient(80% 60% at 10% 90%, rgba(201,168,76,0.10) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container-wide py-28 md:py-44 relative">
          <Reveal>
            <div className="eyebrow">
              <span className="rule" />
              Commence · 08
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display mt-6 text-[clamp(48px,9vw,168px)] leading-[0.9]">
              Let&apos;s engineer <br />
              your <span className="italic text-gold">signature</span>.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-14 grid md:grid-cols-3 gap-10 items-end">
              <div className="md:col-span-2">
                <p className="text-[15px] leading-[1.8] text-ink/80 max-w-[52ch]">
                  Briefs are read by a senior formulator within seven working
                  days. Include your product vision, target market, and any
                  regulatory environment — we&apos;ll respond with a formulation
                  roadmap.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss">
                  Direct Line
                </div>
                <a
                  href="mailto:reach@pairsense.co"
                  className="display text-3xl link-underline"
                >
                  reach@pairsense.co
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* form block — main background cream; only the left meta panel is forest-green */}
      <div id="contact-form" className="relative py-24 md:py-32">
        <div className="container-wide relative">
          <div className="grid grid-cols-12 gap-10">
            {/* Left: forest-green meta panel */}
            <div className="col-span-12 lg:col-span-4">
              <div
                className="relative rounded-2xl p-10 md:p-12 overflow-hidden h-full"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(30,22,5,0.98) 0%, rgba(20,15,3,0.95) 60%, rgba(10,8,2,1) 100%)",
                }}
              >
                {/* grain + warm highlight for depth */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(70% 55% at 90% 0%, rgba(201,168,76,0.22) 0%, transparent 65%), radial-gradient(60% 60% at 0% 100%, rgba(201,168,76,0.10) 0%, transparent 70%)",
                  }}
                />

                <div className="relative">
                  <Reveal>
                    <div
                      className="eyebrow"
                      style={{ color: "#e8e2cf" }}
                    >
                      <span
                        className="rule"
                        style={{ background: "#e8e2cf", opacity: 0.85 }}
                      />
                      Brief Intake · 09
                    </div>
                    <h3
                      className="display mt-6 text-[clamp(32px,3.4vw,52px)] leading-[1]"
                      style={{ color: "#f7f3e6", fontWeight: 500 }}
                    >
                      Send a brief.
                      <br />
                      <span className="italic text-gold">We&apos;ll listen first.</span>
                    </h3>
                    <p
                      className="mt-6 text-[14.5px] leading-[1.8] max-w-[40ch]"
                      style={{ color: "rgba(247,243,230,0.92)" }}
                    >
                      All submissions are handled under confidentiality. Our
                      team will reply with a curated formulation path,
                      projected timelines, and sampling options.
                    </p>
                  </Reveal>

                  <div className="mt-10 space-y-6">
                    {[
                      { l: "Turnaround", v: "7 working days — briefs reviewed weekly" },
                      { l: "Languages", v: "English · French · Mandarin · Hindi" },
                    ].map((m) => (
                      <div
                        key={m.l}
                        className="pt-3"
                        style={{ borderTop: "1px solid rgba(247,243,230,0.22)" }}
                      >
                        <div
                          className="mono text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: "#c9c2a9" }}
                        >
                          {m.l}
                        </div>
                        <div
                          className="mt-1 text-[14px]"
                          style={{ color: "#f7f3e6" }}
                        >
                          {m.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: cream form card (original light treatment) */}
            <div className="col-span-12 lg:col-span-8">
              <Reveal delay={120}>
                <form
                  onSubmit={onSubmit}
                  className="grid grid-cols-12 gap-x-8 gap-y-10 bg-bg-warm border border-line rounded-2xl p-8 md:p-12"
                >
                  <Field
                    label="Full Name"
                    id="name"
                    required
                    placeholder="Your full name"
                    className="col-span-12 md:col-span-6"
                  />
                  <Field
                    label="Work Email"
                    id="email"
                    type="email"
                    required
                    placeholder="your@company.com"
                    className="col-span-12 md:col-span-6"
                  />
                  <Field
                    label="Company"
                    id="company"
                    required
                    placeholder="Brand, house, or atelier"
                    className="col-span-12 md:col-span-6"
                  />
                  <Field
                    label="Country / Market"
                    id="market"
                    placeholder="India · UAE · EU · Global"
                    className="col-span-12 md:col-span-6"
                  />

                  {/* application — chip select */}
                  <div className="col-span-12">
                    <label className="mono text-[10px] uppercase tracking-[0.22em] text-moss block mb-4">
                      Application
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {applications.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => setSelectedApp(a)}
                          className={`px-4 py-2 rounded-full border text-[12px] transition-colors duration-300 ${
                            selectedApp === a
                              ? "bg-ink text-bg border-ink"
                              : "border-line hover:border-ink/40"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="application" value={selectedApp} />
                  </div>

                  {/* message */}
                  <div className="col-span-12">
                    <label
                      htmlFor="message"
                      className="mono text-[10px] uppercase tracking-[0.22em] text-moss block mb-3"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Vision, mood, references, regulatory environment, volumes…"
                      className="w-full bg-transparent border-b border-line-strong focus:border-ink outline-none py-3 text-[14px] placeholder:text-ink/35 resize-none"
                    />
                  </div>

                  <Field
                    label="Budget Range (optional)"
                    id="budget"
                    placeholder="— "
                    className="col-span-12 md:col-span-6"
                  />
                  <Field
                    label="Launch Window"
                    id="window"
                    placeholder="Q3 2026"
                    className="col-span-12 md:col-span-6"
                  />

                  <div className="col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-line">
                    <div className="mono text-[11px] text-moss uppercase tracking-[0.22em]">
                      By submitting you accept our{" "}
                      <a href="#" className="link-underline text-ink">
                        confidentiality protocol
                      </a>
                      .
                    </div>
                    <button
                      type="submit"
                      disabled={state !== "idle"}
                      className="btn btn-primary disabled:opacity-60 disabled:cursor-wait"
                    >
                      {state === "idle" && (
                        <>
                          Submit brief
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                          </svg>
                        </>
                      )}
                      {state === "sending" && <>Transmitting…</>}
                      {state === "sent" && <>Received. Thank you.</>}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mono text-[10px] uppercase tracking-[0.22em] text-moss block mb-3"
      >
        {label}
        {required && <span className="text-gold ml-1">·</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-line-strong focus:border-ink outline-none py-3 text-[14px] placeholder:text-ink/35 transition-colors"
      />
    </div>
  );
}
