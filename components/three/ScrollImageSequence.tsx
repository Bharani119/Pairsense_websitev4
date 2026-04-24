"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SequenceConfig {
  frameCount: number;
  baseUrl: string;
  prefix?: string;
  extension?: string;
  padding?: number;
}

interface ScrollImageSequenceProps {
  frameCount?: number;
  baseUrl?: string;
  prefix?: string;
  extension?: string;
  padding?: number;
  scrollFactor?: number;
  children?: ReactNode;
  onProgress?: (progress: number) => void;
  sequences?: SequenceConfig[];
}

/**
 * ScrollImageSequence
 * A high-performance canvas-based image sequence player driven by scroll.
 * Supports either a single sequence or multiple stitched sequences.
 */
export default function ScrollImageSequence({
  frameCount,
  baseUrl,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  padding = 3,
  scrollFactor = 4,
  children,
  onProgress,
  sequences,
}: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[][]>([]);
  const frameRef = useRef({ index: 0 });
  const scrollTriggerRef = useRef<globalThis.ScrollTrigger | null>(null);
  const [hasRendered, setHasRendered] = useState(false);

  const sequenceConfigs = useCallback((): SequenceConfig[] => {
    if (sequences && sequences.length > 0) {
      return sequences;
    }

    if (!baseUrl || !frameCount) {
      return [];
    }

    return [{ frameCount, baseUrl, prefix, extension, padding }];
  }, [baseUrl, extension, frameCount, padding, prefix, sequences]);

  const totalFrames = useCallback(
    () => sequenceConfigs().reduce((sum, sequence) => sum + sequence.frameCount, 0),
    [sequenceConfigs]
  );

  const formatFrame = useCallback(
    (num: number, digits: number) => num.toString().padStart(digits, "0"),
    []
  );

  const resolveFrame = useCallback(
    (index: number) => {
      const configs = sequenceConfigs();
      const total = configs.reduce((sum, sequence) => sum + sequence.frameCount, 0);
      const safeIndex = Math.max(0, Math.min(total - 1, index));
      let remaining = safeIndex;

      for (let seqIdx = 0; seqIdx < configs.length; seqIdx++) {
        const sequence = configs[seqIdx];
        if (remaining < sequence.frameCount) {
          return { seqIdx, localIdx: remaining };
        }
        remaining -= sequence.frameCount;
      }

      const lastSeqIdx = configs.length - 1;
      return {
        seqIdx: lastSeqIdx,
        localIdx: configs[lastSeqIdx].frameCount - 1,
      };
    },
    [sequenceConfigs]
  );

  const getImageUrl = useCallback(
    (index: number) => {
      const configs = sequenceConfigs();
      const { seqIdx, localIdx } = resolveFrame(index);
      const sequence = configs[seqIdx];

      return `${sequence.baseUrl}/${sequence.prefix ?? "ezgif-frame-"}${formatFrame(
        localIdx + 1,
        sequence.padding ?? 3
      )}${sequence.extension ?? ".jpg"}`;
    },
    [formatFrame, resolveFrame, sequenceConfigs]
  );

  const drawImage = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: false });
      if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = -(drawHeight - canvas.height) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = -(drawWidth - canvas.width) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      if (!hasRendered) setHasRendered(true);
    },
    [hasRendered]
  );

  const updateFrame = useCallback(
    (index: number) => {
      const { seqIdx, localIdx } = resolveFrame(index);
      const img = imagesRef.current[seqIdx]?.[localIdx];

      if (img?.complete) {
        drawImage(img);
        return;
      }

      for (let globalIdx = index; globalIdx >= 0; globalIdx--) {
        const fallback = resolveFrame(globalIdx);
        const fallbackImg = imagesRef.current[fallback.seqIdx]?.[fallback.localIdx];
        if (fallbackImg?.complete) {
          drawImage(fallbackImg);
          break;
        }
      }
    },
    [drawImage, resolveFrame]
  );

  useEffect(() => {
    const handleResize = () => updateFrame(Math.round(frameRef.current.index));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateFrame]);

  useEffect(() => {
    const configs = sequenceConfigs();
    if (configs.length === 0) return;

    imagesRef.current = configs.map(() => []);

    const priorityFrames = configs.flatMap((sequence, seqIdx) =>
      Array.from(
        new Set([0, Math.floor(sequence.frameCount / 2), sequence.frameCount - 1])
      ).map((localIdx) => ({ seqIdx, localIdx }))
    );

    let priorityLoaded = 0;

    const toGlobalIndex = (seqIdx: number, localIdx: number) =>
      configs.slice(0, seqIdx).reduce((sum, sequence) => sum + sequence.frameCount, 0) + localIdx;

    priorityFrames.forEach(({ seqIdx, localIdx }) => {
      const img = new Image();
      const url = getImageUrl(toGlobalIndex(seqIdx, localIdx));
      img.src = url;

      img.onload = () => {
        imagesRef.current[seqIdx][localIdx] = img;
        if (seqIdx === 0 && localIdx === 0) {
          drawImage(img);
        }
        priorityLoaded++;
      };

      img.onerror = () => {
        console.error(`Failed to load priority image: ${url}`);
        priorityLoaded++;
      };
    });

    for (let i = 0; i < totalFrames(); i++) {
      const { seqIdx, localIdx } = resolveFrame(i);
      const isPriority = priorityFrames.some(
        (frame) => frame.seqIdx === seqIdx && frame.localIdx === localIdx
      );

      if (isPriority) continue;

      const img = new Image();
      const url = getImageUrl(i);
      img.src = url;
      img.onload = () => {
        imagesRef.current[seqIdx][localIdx] = img;
        if (Math.abs(frameRef.current.index - i) < 1) {
          updateFrame(i);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image at index ${i}: ${url}`);
      };
    }
  }, [drawImage, getImageUrl, resolveFrame, sequenceConfigs, totalFrames, updateFrame]);

  useEffect(() => {
    if (!containerRef.current || totalFrames() === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollFactor * 100}%`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const rawIndex = self.progress * (totalFrames() - 1);
        frameRef.current.index = rawIndex;
        onProgress?.(self.progress);
        requestAnimationFrame(() => {
          updateFrame(Math.round(rawIndex));
        });
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
      ScrollTrigger.refresh();
    };
  }, [onProgress, scrollFactor, totalFrames, updateFrame]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fbf8ef]"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full will-change-transform"
        style={{ width: "100vw", height: "100vh" }}
      />

      {!hasRendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fbf8ef] transition-opacity duration-500 z-20">
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-moss animate-pulse">
            Loading Sequence...
          </div>
        </div>
      )}

      {children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full pointer-events-auto">{children}</div>
        </div>
      )}
    </div>
  );
}
