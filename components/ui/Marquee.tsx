"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="flex shrink-0 items-center gap-16 pr-16">{children}</div>
        <div
          className="flex shrink-0 items-center gap-16 pr-16"
          aria-hidden="true"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
