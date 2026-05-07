"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92, y: 32 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.65,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
