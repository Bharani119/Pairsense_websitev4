"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number; // Positive for faster, negative for slower (parallax)
  className?: string;
  id?: string;
}

/**
 * ParallaxWrapper
 * A high-performance parallax component using GSAP ScrollTrigger.
 * Designed to be compatible with Lenis smooth scrolling.
 */
export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className = "",
  id,
}: ParallaxWrapperProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const target = targetRef.current;
    const trigger = triggerRef.current;

    if (!target || !trigger) return;

    // Subtle parallax effect using translateY
    // Using a timeline for better control and potential expansion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top bottom", // Start when the top of the trigger hits the bottom of the viewport
        end: "bottom top",   // End when the bottom of the trigger hits the top of the viewport
        scrub: true,         // Smoothly scrub the animation with scroll
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    tl.fromTo(
      target,
      { y: 0 },
      {
        y: (i, target) => {
          // Calculate movement based on speed and height
          // A speed of 0.5 means it moves half its height over the scroll duration
          return speed * 100;
        },
        ease: "none",
      }
    );

    return () => {
      // Clean up GSAP instances
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, [speed]);

  return (
    <div ref={triggerRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div ref={targetRef} className="will-change-transform h-full w-full">
        {children}
      </div>
    </div>
  );
}
