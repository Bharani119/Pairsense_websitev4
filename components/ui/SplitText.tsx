"use client";
import { useEffect, useRef } from "react";

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 60,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={`split-text ${className}`}>
      {words.map((w, i) => (
        <span
          key={i}
          className="reveal-line"
          style={{ marginRight: "0.3em", display: "inline-block" }}
        >
          <span
            style={{
              transitionDelay: `${delay + i * stagger}ms`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
      <style jsx>{`
        .split-text :global(.reveal-line > span) {
          transform: translateY(110%);
          display: inline-block;
          transition: transform 1.1s cubic-bezier(0.2, 0.85, 0.2, 1);
        }
        .split-text.is-visible :global(.reveal-line > span) {
          transform: translateY(0);
        }
      `}</style>
    </span>
  );
}
