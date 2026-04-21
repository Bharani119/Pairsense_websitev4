"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollVideoCanvasProps {
  frameCount: number;
  baseUrl: string;
  prefix?: string;
  extension?: string;
  padding?: number;
  scrollFactor?: number;
}

export default function ScrollVideoCanvas({
  frameCount,
  baseUrl,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  padding = 3,
  scrollFactor = 4,
}: ScrollVideoCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use a ref for images to avoid re-renders and blocking
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const frameRef = useRef({ index: 0 });
  const scrollTriggerRef = useRef<globalThis.ScrollTrigger | null>(null);

  // Helper to format frame numbers
  const formatFrame = useCallback(
    (num: number) => {
      return num.toString().padStart(padding, "0");
    },
    [padding]
  );

  const getImageUrl = useCallback((index: number) => {
    return `${baseUrl}/${prefix}${formatFrame(index + 1)}${extension}`;
  }, [baseUrl, prefix, formatFrame, extension]);

  // Optimized render function
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: false });
      if (!canvas || !ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // If the requested frame isn't ready, try to find the nearest available frame
        let fallbackImg = null;
        for (let i = index; i >= 0; i--) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]?.naturalWidth !== 0) {
            fallbackImg = imagesRef.current[i];
            break;
          }
        }
        if (!fallbackImg) return;
        drawToCanvas(canvas, ctx, fallbackImg);
        return;
      }

      drawToCanvas(canvas, ctx, img);
    },
    []
  );

  const drawToCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

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
  };

  // 1. Initial Load: Load first frame and a few key frames immediately
  useEffect(() => {
    const priorityFrames = [0, Math.floor(frameCount / 2), frameCount - 1];
    let loadedPriority = 0;

    priorityFrames.forEach((idx) => {
      const img = new Image();
      const url = getImageUrl(idx);
      img.src = url;
      img.onload = () => {
        imagesRef.current[idx] = img;
        loadedPriority++;
        if (idx === 0) {
          renderFrame(0); // Show first frame ASAP
        }
        if (loadedPriority === priorityFrames.length) {
          setIsInitialLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`CRITICAL: Failed to load priority frame ${idx}: ${url}`);
        loadedPriority++;
        if (loadedPriority === priorityFrames.length) setIsInitialLoaded(true);
      };
    });

    // 2. Background Load: Load the rest progressively
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      if (priorityFrames.includes(i)) continue;

      const img = new Image();
      const url = getImageUrl(i);
      img.src = url;
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        
        // If we are currently near this frame, re-render
        if (Math.abs(frameRef.current.index - i) < 2) {
          renderFrame(i);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load background frame ${i}: ${url}`);
        loadedCount++;
      };
    }
  }, [frameCount, getImageUrl, renderFrame]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        renderFrame(Math.round(frameRef.current.index));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Scroll Animation - Initialize once initial frames are ready
  useEffect(() => {
    if (!isInitialLoaded || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollFactor * 100}%`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const index = Math.floor(self.progress * (frameCount - 1));
        frameRef.current.index = index;
        renderFrame(index);
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
      ScrollTrigger.refresh();
    };
  }, [isInitialLoaded, frameCount, renderFrame, scrollFactor]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ width: "100vw", height: "100vh" }}
      />
      
      {/* Non-blocking loading indicator */}
      {!isInitialLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-white mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
            Initializing Experience...
          </div>
        </div>
      )}

      {/* Progress bar (optional, subtle) */}
      {isInitialLoaded && loadProgress < 100 && (
        <div className="absolute bottom-0 left-0 h-[1px] bg-moss/30 transition-all duration-300" 
             style={{ width: `${loadProgress}%` }} />
      )}
    </div>
  );
}
