"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="section-border">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          <div className="col-span-2 md:col-span-4">
            <Image
              src="/pairsense-logo.png"
              alt="Pairsense"
              width={260}
              height={92}
              className="h-16 md:h-20 w-auto object-contain mb-6"
            />
            <p className="mono text-[11px] uppercase tracking-[0.22em] text-moss max-w-[28ch]">
              A sensory formulation house engineering flavors and fragrances
              for the world&apos;s most ambitious brands.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss mb-5">
              Connect
            </div>
            <ul className="space-y-2 text-[13px]">
              <li><a href="https://www.instagram.com/pairsense?igsh=eG10MWx1bWxra3l5&utm_source=qr" className="link-underline" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/sachinpairsense" className="link-underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://x.com/pairsensex?s=21&t=MvjSov5NKGuHZPEQXU6ylA" className="link-underline" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
              <li><a href="https://www.facebook.com/share/1AhYd6ea5a/?mibextid=wwXIfr" className="link-underline" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss mb-5">
              Practice
            </div>
            <ul className="space-y-2 text-[13px]">
              <li><a href="#capabilities" className="link-underline">Capabilities</a></li>
              <li><a href="#about" className="link-underline">About</a></li>
              <li><a href="#segments" className="link-underline">Segments</a></li>
              <li><a href="#process" className="link-underline">Process</a></li>
              <li><a href="#contact" className="link-underline">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss mb-5">
              Newsletter · One brief per quarter
            </div>
            <form className="flex border-b border-line-strong pb-2">
              <input
                type="email"
                placeholder="your@address.com"
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-ink/40"
              />
              <button type="submit" aria-label="Subscribe" className="text-ink">
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss">
            © {new Date().getFullYear()} Pairsense · All rights reserved
          </div>
          <div className="mono text-[10px] uppercase tracking-[0.22em] text-moss">
            Crafted with precision
          </div>
        </div>
      </div>
    </footer>
  );
}
