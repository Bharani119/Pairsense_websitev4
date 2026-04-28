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
  scale = 1.15,
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
        const prog = self.progress - 0.5; // -0.5 (entering bottom) → +0.5 (leaving top)
        const max = el.offsetHeight * 0.18;
        const y = Math.max(-max, Math.min(max, prog * el.offsetHeight * speed));
        layer.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
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
          transformOrigin: focal,
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
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: overlayBg[overlay] }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </>
      )}

      {children}
    </div>
  );
}
