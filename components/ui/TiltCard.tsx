"use client";
import { ReactNode, useRef } from "react";

export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    const glare = el.querySelector<HTMLDivElement>("[data-glare]");
    if (glare) {
      glare.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.6), transparent 40%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    const glare = el.querySelector<HTMLDivElement>("[data-glare]");
    if (glare) glare.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card relative ${className}`}
    >
      {children}
      <div
        data-glare
        className="pointer-events-none absolute inset-0 mix-blend-overlay rounded-[inherit]"
      />
    </div>
  );
}
