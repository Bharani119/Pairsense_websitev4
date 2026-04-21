"use client";

import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import SplitText from "./SplitText";

interface ScrollSection {
  start: number;
  end: number;
  title: string;
  subtitle?: string;
  description: string;
}

interface ScrollTextOverlayProps {
  sections: ScrollSection[];
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * ScrollTextOverlay
 * Elegant, scroll-synced narrative blocks that transition based on container scroll progress.
 * Enhanced with SplitText GSAP animations for character-level stagger.
 */
export default function ScrollTextOverlay({ sections, containerRef }: ScrollTextOverlayProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
      {sections.map((section, index) => (
        <TextSection 
          key={index} 
          section={section} 
          progress={scrollYProgress} 
        />
      ))}
    </div>
  );
}

function TextSection({ 
  section, 
  progress 
}: { 
  section: ScrollSection; 
  progress: MotionValue<number> 
}) {
  const { start, end, title, subtitle, description } = section;
  const [isActive, setIsActive] = useState(false);

  // Calculate local transition points
  const fadeInStart = start;
  const fadeInEnd = start + 0.05;
  const fadeOutStart = end - 0.05;
  const fadeOutEnd = end;

  // Track if we should trigger the SplitText animation
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= fadeInStart && latest <= fadeOutStart) {
      if (!isActive) setIsActive(true);
    } else if (latest < fadeInStart - 0.05 || latest > fadeOutEnd) {
      // Allow re-triggering if scrolled away
      if (isActive) setIsActive(false);
    }
  });

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [fadeInStart, fadeOutEnd],
    [40, -40]
  );

  const blur = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  return (
    <motion.div
      style={{ opacity, y, filter: blur }}
      className="absolute max-w-xl px-10 text-center flex flex-col items-center justify-center"
    >
      {subtitle && (
        <motion.span 
          className="mono text-[10px] tracking-[0.4em] uppercase text-moss mb-4 block"
        >
          {subtitle}
        </motion.span>
      )}
      
      <SplitText 
        text={title}
        trigger={isActive}
        className="display text-4xl md:text-6xl mb-6 tracking-tightest md:tracking-tighter leading-tight"
      />
      
      <div className="w-12 h-[1px] bg-white/20 mb-6" />
      
      <p className="text-zinc-400 font-light text-lg md:text-xl leading-relaxed max-w-md">
        {description}
      </p>
    </motion.div>
  );
}
