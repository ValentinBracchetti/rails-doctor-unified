"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScoreRingProps {
  score: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showNumber?: boolean;
  color?: string;
}

function getScoreColor(score: number, max: number) {
  const pct = score / max;
  if (pct < 0.35) return "#ef4444";
  if (pct < 0.6) return "#f97316";
  if (pct < 0.75) return "#eab308";
  return "#22c55e";
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v);
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

export function ScoreRing({
  score,
  maxScore,
  size = 160,
  strokeWidth = 10,
  label,
  sublabel,
  showNumber = true,
}: ScoreRingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = score / maxScore;
  const color = getScoreColor(score, maxScore);
  const dashOffset = circumference * (1 - percentage);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: dashOffset } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
        </svg>
        {showNumber && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color }}>
              <AnimatedNumber value={score} />
            </span>
            <span className="text-xs text-white/40 mt-0.5">/ {maxScore}</span>
          </div>
        )}
      </div>
      {label && (
        <div className="text-center">
          <p className="text-sm font-medium text-white">{label}</p>
          {sublabel && <p className="text-xs text-white/40 mt-0.5">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

export function DomainScoreBar({
  score,
  maxScore,
  label,
  icon,
  delay = 0,
}: {
  score: number;
  maxScore: number;
  label: string;
  icon: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pct = (score / maxScore) * 100;
  const color = getScoreColor(score, maxScore);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-lg w-6 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-white/70">{label}</span>
          <span className="text-sm font-semibold" style={{ color }}>
            {score}/{maxScore}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: delay * 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}
