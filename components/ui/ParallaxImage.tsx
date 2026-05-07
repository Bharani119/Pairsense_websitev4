"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type OverlayStyle = "forest" | "cream" | "gold" | "duotone" | "none";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.25,
  overlay = "forest",
  scale = 1.3,
  focal = "50% 50%",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: OverlayStyle;
  scale?: number;
  focal?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const layer = inner.current;
    if (!el || !layer) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const prog = self.progress - 0.5;
        const limit = (scale - 1) * 0.48 * el.offsetHeight;
        const y = Math.max(-limit, Math.min(limit, prog * el.offsetHeight * speed));
        gsap.set(layer, {
          y: y,
          scale: scale,
          overwrite: "auto",
        });
      },
    });

    return () => st.kill();
  }, [speed, scale]);

  const overlayBg: Record<OverlayStyle, string> = {
    forest:
      "linear-gradient(165deg, rgba(5,4,2,0.72) 0%, rgba(10,8,5,0.40) 45%, rgba(201,168,76,0.20) 100%)",
    cream:
      "linear-gradient(165deg, rgba(10,8,5,0.55) 0%, rgba(15,12,7,0.35) 50%, rgba(201,168,76,0.25) 100%)",
    gold:
      "linear-gradient(165deg, rgba(201,168,76,0.40) 0%, rgba(10,8,5,0.65) 100%)",
    duotone:
      "linear-gradient(165deg, rgba(5,4,2,0.80) 0%, rgba(138,106,42,0.50) 100%)",
    none: "transparent",
  };

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, 0, 0) scale(${scale})`,
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

      {overlay !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlayBg[overlay] }}
        />
      )}

      {children}
    </div>
  );
}
