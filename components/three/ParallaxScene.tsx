"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SceneSection {
  start: number;
  end: number;
  eyebrow?: string;
  title: string;
  description: string;
}

export interface SequenceConfig {
  frameCount: number;
  baseUrl: string;
  prefix?: string;
  extension?: string;
  padding?: number;
}

interface ParallaxSceneProps {
  sequences: SequenceConfig[];
  scrollFactor?: number;
  sections?: SceneSection[];
  textAlign?: "left" | "center" | "right";
}

export default function ParallaxScene({
  sequences,
  scrollFactor = 4,
  sections = [],
  textAlign = "center",
}: ParallaxSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  // 2-D image cache: imagesRef.current[seqIdx][localIdx]
  const imagesRef = useRef<(HTMLImageElement | null)[][]>(sequences.map(() => []));
  const frameRef = useRef(0);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalFrames = sequences.reduce((sum, s) => sum + s.frameCount, 0);

  // Map global frame index → [seqIdx, localIdx]
  const resolveFrame = useCallback(
    (globalIdx: number): [number, number] => {
      let remaining = Math.max(0, Math.min(totalFrames - 1, globalIdx));
      for (let s = 0; s < sequences.length; s++) {
        if (remaining < sequences[s].frameCount) return [s, remaining];
        remaining -= sequences[s].frameCount;
      }
      const last = sequences.length - 1;
      return [last, sequences[last].frameCount - 1];
    },
    [sequences, totalFrames]
  );

  const getUrl = useCallback(
    (seqIdx: number, localIdx: number) => {
      const {
        baseUrl,
        prefix = "ezgif-frame-",
        extension = ".jpg",
        padding = 3,
      } = sequences[seqIdx];
      return `${baseUrl}/${prefix}${(localIdx + 1).toString().padStart(padding, "0")}${extension}`;
    },
    [sequences]
  );

  const drawCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;

    const ca = canvas.width / canvas.height;
    const ia = img.width / img.height;
    let dw: number, dh: number, ox: number, oy: number;

    if (ca > ia) {
      dw = canvas.width;
      dh = dw / ia;
      ox = 0;
      oy = -(dh - canvas.height) / 2;
    } else {
      dh = canvas.height;
      dw = dh * ia;
      ox = -(dw - canvas.width) / 2;
      oy = 0;
    }
    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  const renderFrame = useCallback(
    (globalIdx: number) => {
      const [seqIdx, localIdx] = resolveFrame(globalIdx);
      const img = imagesRef.current[seqIdx]?.[localIdx];
      if (img?.complete && img.naturalWidth > 0) {
        drawCover(img);
        return;
      }
      // Fallback: search backwards within current sequence, then previous sequences
      for (let li = localIdx; li >= 0; li--) {
        const fb = imagesRef.current[seqIdx]?.[li];
        if (fb?.complete && fb.naturalWidth > 0) { drawCover(fb); return; }
      }
      for (let si = seqIdx - 1; si >= 0; si--) {
        for (let li = sequences[si].frameCount - 1; li >= 0; li--) {
          const fb = imagesRef.current[si]?.[li];
          if (fb?.complete && fb.naturalWidth > 0) { drawCover(fb); return; }
        }
      }
    },
    [resolveFrame, drawCover, sequences]
  );

  // Load all sequences — priority frames first, then background
  useEffect(() => {
    imagesRef.current = sequences.map(() => []);

    const priorityPairs: [number, number][] = [];
    sequences.forEach((seq, si) => {
      Array.from(new Set([0, Math.floor(seq.frameCount / 2), seq.frameCount - 1])).forEach(
        (li) => priorityPairs.push([si, li])
      );
    });

    let pDone = 0;
    priorityPairs.forEach(([si, li]) => {
      const img = new Image();
      img.src = getUrl(si, li);
      img.onload = () => {
        imagesRef.current[si][li] = img;
        if (si === 0 && li === 0) renderFrame(0);
        if (++pDone === priorityPairs.length) setIsLoaded(true);
      };
      img.onerror = () => {
        if (++pDone === priorityPairs.length) setIsLoaded(true);
      };
    });

    sequences.forEach((seq, si) => {
      for (let li = 0; li < seq.frameCount; li++) {
        if (priorityPairs.some(([ps, pl]) => ps === si && pl === li)) continue;
        const img = new Image();
        img.src = getUrl(si, li);
        img.onload = () => { imagesRef.current[si][li] = img; };
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sequences is static per mount — no need to re-run on re-render

  // Canvas resize
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth * window.devicePixelRatio;
      c.height = window.innerHeight * window.devicePixelRatio;
      renderFrame(frameRef.current);
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [renderFrame]);

  // GSAP pin + scroll-driven animation
  useEffect(() => {
    if (!sceneRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: "top top",
      end: `+=${scrollFactor * 100}%`,
      scrub: true,
      pin: true,
      onUpdate: ({ progress }) => {
        const idx = Math.round(progress * (totalFrames - 1));
        frameRef.current = idx;
        renderFrame(idx);

        if (canvasRef.current) {
          canvasRef.current.style.transform = `scale(${1.06 - progress * 0.06})`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.height = `${progress * 100}%`;
        }

        sections.forEach((sec, i) => {
          const wrap = wrapRefs.current[i];
          const content = contentRefs.current[i];
          if (!wrap || !content) return;

          const { start, end } = sec;
          const fadeRange = Math.min(0.07, (end - start) * 0.3);

          if (progress < start || progress > end) {
            wrap.style.opacity = "0";
            return;
          }

          const fadeIn = Math.min(1, (progress - start) / fadeRange);
          const fadeOut = Math.min(1, (end - progress) / fadeRange);
          wrap.style.opacity = String(Math.min(fadeIn, fadeOut));
          const localP = (progress - start) / (end - start);
          content.style.transform = `translateY(${(0.5 - localP) * 60}px)`;
        });
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, [totalFrames, scrollFactor, sections, renderFrame]);

  const justifyClass =
    textAlign === "left" ? "justify-start pl-16 md:pl-24"
    : textAlign === "right" ? "justify-end pr-16 md:pr-24"
    : "justify-center";

  const innerAlignClass =
    textAlign === "left" ? "items-start text-left"
    : textAlign === "right" ? "items-end text-right"
    : "items-center text-center";

  return (
    <div
      ref={sceneRef}
      className="relative w-full bg-black overflow-hidden"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 origin-center"
        style={{ width: "100vw", height: "100vh", willChange: "transform" }}
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/60" />
      {textAlign === "left" && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      )}
      {textAlign === "right" && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/70 via-black/25 to-transparent" />
      )}

      {sections.map((section, i) => (
        <div
          key={i}
          ref={(el) => { wrapRefs.current[i] = el; }}
          className={`absolute inset-0 z-20 flex items-center ${justifyClass} pointer-events-none`}
          style={{ opacity: 0 }}
        >
          <div
            ref={(el) => { contentRefs.current[i] = el; }}
            className={`flex flex-col ${innerAlignClass} max-w-md`}
            style={{ willChange: "transform" }}
          >
            {section.eyebrow && (
              <span className="mono text-[10px] tracking-[0.4em] uppercase text-moss mb-4 block">
                {section.eyebrow}
              </span>
            )}
            <h2 className="display text-[clamp(28px,4vw,64px)] leading-[0.93] tracking-tightest mb-5 text-white">
              {section.title}
            </h2>
            <div className="w-10 h-px bg-white/20 mb-5" />
            <p className="text-zinc-300/75 font-light text-sm md:text-base leading-relaxed max-w-xs">
              {section.description}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-24 w-px bg-white/10 z-30">
        <div
          ref={progressBarRef}
          className="w-full bg-white/50 origin-top"
          style={{ height: "0%" }}
        />
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <span className="mono text-[10px] tracking-[0.3em] uppercase text-white animate-pulse">
            Loading Sequence...
          </span>
        </div>
      )}
    </div>
  );
}
