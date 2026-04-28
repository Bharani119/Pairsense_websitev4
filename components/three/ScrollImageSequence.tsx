"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface VideoConfig {
  src: string;
  portion: number;
}

interface ScrollImageSequenceProps {
  videos: VideoConfig[];
  scrollFactor?: number;
  children?: ReactNode;
  onProgress?: (progress: number) => void;
}

export default function ScrollImageSequence({
  videos,
  scrollFactor = 4,
  children,
  onProgress,
}: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndex = useRef(0);

  useEffect(() => {
    if (!containerRef.current || videos.length === 0) return;

    const seekState = videos.map(() => ({ target: 0, pending: false }));

    // Chain downloads: once video i has enough data, start downloading i+1.
    function chainDownload(i: number) {
      if (i >= videos.length) return;
      const vid = videoRefs.current[i];
      if (!vid) return;
      vid.preload = "auto";
      vid.load();
      if (i + 1 < videos.length) {
        vid.addEventListener("canplaythrough", () => chainDownload(i + 1), { once: true });
      }
    }

    // Kick the first video immediately; the rest follow when each finishes.
    const vid0 = videoRefs.current[0];
    if (vid0) {
      vid0.play().then(() => vid0.pause()).catch(() => {});
      if (videos.length > 1) {
        vid0.addEventListener("canplaythrough", () => chainDownload(1), { once: true });
      }
    }

    function seekTo(vid: HTMLVideoElement, i: number, time: number) {
      seekState[i].target = time;
      if (!seekState[i].pending) {
        seekState[i].pending = true;
        vid.currentTime = time;
      }
    }

    function onSeeked(i: number) {
      const vid = videoRefs.current[i];
      if (!vid) return;
      seekState[i].pending = false;
      if (Math.abs(vid.currentTime - seekState[i].target) > 0.001) {
        seekState[i].pending = true;
        vid.currentTime = seekState[i].target;
      }
    }

    const handlers = videos.map((_, i) => {
      const fn = () => onSeeked(i);
      videoRefs.current[i]?.addEventListener("seeked", fn);
      return fn;
    });


    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollFactor * 100}%`,
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        onProgress?.(progress);

        let cumulative = 0;
        for (let i = 0; i < videos.length; i++) {
          const next = cumulative + videos[i].portion;
          if (progress <= next || i === videos.length - 1) {
            const localProgress = Math.min(
              1,
              (progress - cumulative) / videos[i].portion
            );

            const vid = videoRefs.current[i];
            if (vid && isFinite(vid.duration) && vid.duration > 0) {
              seekTo(vid, i, localProgress * vid.duration);
            }

            if (i !== activeIndex.current) {
              const prev = videoRefs.current[activeIndex.current];
              if (prev) prev.style.zIndex = "0";
              if (vid) vid.style.zIndex = "1";
              activeIndex.current = i;
              // Ensure the newly active video is in a seekable state.
              vid?.play().then(() => vid.pause()).catch(() => {});
            }
            break;
          }
          cumulative = next;
        }
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.refresh();
      videos.forEach((_, i) => {
        videoRefs.current[i]?.removeEventListener("seeked", handlers[i]);
      });
    };
  }, [videos, scrollFactor, onProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fbf8ef]"
      style={{ height: "100vh" }}
    >
      {videos.map((video, i) => (
        <video
          key={video.src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={video.src}
          preload={i === 0 ? "auto" : "none"}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: i === 0 ? 1 : 0 }}
        />
      ))}

      {children && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <div className="w-full h-full pointer-events-auto">{children}</div>
        </div>
      )}
    </div>
  );
}
