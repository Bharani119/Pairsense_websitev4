"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
}

/**
 * SplitText
 * Custom GSAP-based character animation component for high-end cinematic typography.
 * Supports character-level splitting and staggered entry animations.
 */
export default function SplitText({ 
  text, 
  className, 
  stagger = 0.03, 
  duration = 0.8,
  delay = 0,
  trigger = true
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trigger) return;

    const chars = containerRef.current.querySelectorAll(".char");
    
    // Initial state
    gsap.set(chars, { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)"
    });

    // Animation context for cleanup
    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power3.out",
        overwrite: "auto",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, stagger, duration, delay, trigger]);

  // Split text into characters, preserving spaces
  const characters = text.split("").map((char, index) => (
    <span 
      key={index} 
      className="char inline-block whitespace-pre"
    >
      {char}
    </span>
  ));

  return (
    <div 
      ref={containerRef} 
      className={`inline-block overflow-hidden pb-1 ${className}`}
      aria-label={text}
    >
      {characters}
    </div>
  );
}
