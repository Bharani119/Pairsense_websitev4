"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollImageSequenceProps {
  frameCount: number;
  baseUrl: string;
  prefix?: string;
  extension?: string;
  padding?: number;
  scrollFactor?: number;
  children?: ReactNode;
}

/**
 * ScrollImageSequence
 * A high-performance canvas-based image sequence player driven by scroll.
 * Optimized for immediate rendering and progressive loading.
 */
export default function ScrollImageSequence({
  frameCount,
  baseUrl,
  prefix = "ezgif-frame-",
  extension = ".jpg",
  padding = 3,
  scrollFactor = 4,
  children,
}: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use a ref for images to store the sequence without triggering re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef({ index: 0 });
  const scrollTriggerRef = useRef<globalThis.ScrollTrigger | null>(null);
  
  // Track if we've rendered at least one frame to hide initial loading
  const [hasRendered, setHasRendered] = useState(false);

  // Helper to format frame numbers (e.g., 1 -> "001")
  const formatFrame = useCallback(
    (num: number) => num.toString().padStart(padding, "0"),
    [padding]
  );

  // Construct image URL
  const getImageUrl = useCallback((index: number) => {
    return `${baseUrl}/${prefix}${formatFrame(index + 1)}${extension}`;
  }, [baseUrl, prefix, formatFrame, extension]);

  /**
   * Draw an image to the canvas using "cover" logic
   */
  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;

    // Set canvas dimensions based on CSS size for sharp rendering
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

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
    if (!hasRendered) setHasRendered(true);
  }, [hasRendered]);

  /**
   * Update frame based on index
   */
  const updateFrame = useCallback((index: number) => {
    const img = imagesRef.current[index];
    if (img && img.complete) {
      drawImage(img);
    } else {
      // Fallback: try to find the closest loaded frame to avoid blank screen
      for (let i = index; i >= 0; i--) {
        if (imagesRef.current[i]?.complete) {
          drawImage(imagesRef.current[i]!);
          break;
        }
      }
    }
  }, [drawImage]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => updateFrame(Math.round(frameRef.current.index));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateFrame]);

  // Initial Load & Progressive Sequence Loading
  useEffect(() => {
    // 1. Load First Frame Immediately
    const firstImg = new Image();
    const firstUrl = getImageUrl(0);
    firstImg.src = firstUrl;
    
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawImage(firstImg); // Render immediately on load
      
      // 2. Load the rest of the sequence in the background
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        const url = getImageUrl(i);
        img.src = url;
        img.onload = () => {
          imagesRef.current[i] = img;
          // If the user is currently scrolling near this frame, update it
          if (Math.abs(frameRef.current.index - i) < 1) {
            updateFrame(i);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image at index ${i}: ${url}`);
        };
      }
    };

    firstImg.onerror = () => {
      console.error(`CRITICAL: Failed to load first frame: ${firstUrl}`);
    };
  }, [frameCount, getImageUrl, drawImage, updateFrame]);

  // GSAP ScrollTrigger Integration
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollFactor * 100}%`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const rawIndex = self.progress * (frameCount - 1);
        frameRef.current.index = rawIndex;
        
        // Use requestAnimationFrame for smooth drawing
        requestAnimationFrame(() => {
          updateFrame(Math.round(rawIndex));
        });
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
      ScrollTrigger.refresh();
    };
  }, [frameCount, scrollFactor, updateFrame]);

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
      
      {/* Subtle loader that fades out once the first frame is rendered */}
      {!hasRendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fbf8ef] transition-opacity duration-500 z-20">
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-moss animate-pulse">
            Loading Sequence...
          </div>
        </div>
      )}

      {/* Overlay Children */}
      {children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* We use a nested div with pointer-events-auto so the overlay container doesn't block clicks to canvas if any, but children can still be clicked */}
          <div className="w-full h-full pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
