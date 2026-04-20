"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1800;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <svg
                width="76"
                height="76"
                viewBox="0 0 100 100"
                className="text-ink"
                aria-hidden
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeDasharray="1 3"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  style={{ transformOrigin: "50% 50%" }}
                />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="display text-2xl">Pairsense</span>
              <span className="mono text-[11px] text-moss tabular-nums">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
            <div className="h-px w-[240px] bg-line overflow-hidden">
              <div
                className="h-full bg-ink"
                style={{ width: `${pct}%`, transition: "width 120ms linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
