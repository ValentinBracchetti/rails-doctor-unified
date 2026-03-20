"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "violet" | "blue" | "red" | "none";
  gradient?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const glows = {
  none: "",
  violet: "hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]",
  blue: "hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]",
  red: "hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]",
};

export function GlassCard({
  children,
  className = "",
  hover = false,
  glow = "none",
  gradient = false,
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl glass transition-all duration-300
        ${hover ? "cursor-pointer" : ""}
        ${glows[glow]}
        ${gradient ? "gradient-border" : ""}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export function Card({
  children,
  className = "",
  hover = false,
  onClick,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -1 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl bg-white/3 border border-white/7 transition-all duration-300
        ${hover ? "cursor-pointer hover:bg-white/6 hover:border-white/12" : ""}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
