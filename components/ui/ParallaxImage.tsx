"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  scale = 1.18,
  focal = "50% 50%",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  /** overlay prop kept for API compatibility */
  overlay?: string;
  scale?: number;
  focal?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);

  useEffect(() => {
    const el = wrap.current;
    const layer = inner.current;
    if (!el || !layer) return;

    gsap.registerPlugin(ScrollTrigger);

    // Use a gsap quickSetter for smooth GPU-composited updates
    const setY = gsap.quickSetter(layer, "y", "px");

    let targetY = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // progress goes 0 → 1 as element scrolls through viewport
        // remap to -0.5 → +0.5 so image is centred mid-screen
        const prog = self.progress - 0.5;
        // Max safe drift without exposing container background is half of the scaled overflow
        const max = el.offsetHeight * ((scale - 1) / 2);
        targetY = Math.max(-max, Math.min(max, prog * el.offsetHeight * speed));
      },
    });

    // Smooth lerp on every GSAP tick for buttery motion
    const ticker = gsap.ticker.add(() => {
      // lerp current toward target (0.1 = smooth, 0.2 = snappier)
      currentY.current += (targetY - currentY.current) * 0.1;
      setY(currentY.current);
    });

    return () => {
      st.kill();
      gsap.ticker.remove(ticker);
    };
  }, [speed, scale]);

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden parallax-wrap ${className}`}
    >
      {/* Parallax image layer — only y shifts, scale is CSS only */}
      <div
        ref={inner}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "50% 50%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "eager"}
          className="object-cover select-none pointer-events-none"
          style={{ objectPosition: focal }}
          draggable={false}
        />
      </div>



      {children}
    </div>
  );
}
