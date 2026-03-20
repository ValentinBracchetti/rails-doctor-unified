import { type ReactNode } from "react";
import type { Effort } from "@/data/types";

type Severity = "critical" | "major" | "minor" | "cosmetic" | "positive";

interface BadgeProps {
  children: ReactNode;
  severity?: Severity;
  size?: "sm" | "md";
  className?: string;
}

interface EffortBadgeProps {
  effort: Effort;
  size?: "sm" | "md";
}

const severityStyles: Record<Severity, string> = {
  critical: "badge-critical",
  major: "badge-major",
  minor: "badge-minor",
  cosmetic: "badge-cosmetic",
  positive: "badge-positive",
};

const severityLabels: Record<Severity, string> = {
  critical: "Critique",
  major: "Majeur",
  minor: "Mineur",
  cosmetic: "Cosmétique",
  positive: "Positif",
};

const effortLabels: Record<Effort, string> = {
  XS: "XS < 2h",
  S: "S 2-8h",
  M: "M 1-3j",
  L: "L 3-10j",
  XL: "XL 10j+ / migration",
};

const effortStyles: Record<Effort, string> = {
  XS: "bg-green-500/10 text-green-400 border border-green-500/20",
  S: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  M: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  L: "bg-red-500/10 text-red-400 border border-red-500/20",
  XL: "bg-rose-950/40 text-rose-300 border border-rose-500/30",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs rounded-md",
  md: "px-2.5 py-1 text-xs rounded-lg font-medium",
};

export function Badge({ children, severity, size = "md", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium
        ${severity ? severityStyles[severity] : "bg-white/10 text-white/70 border border-white/10"}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export function SeverityBadge({ severity, size = "md" }: { severity: Severity; size?: "sm" | "md" }) {
  const dots: Record<Severity, string> = {
    critical: "bg-red-500",
    major: "bg-orange-500",
    minor: "bg-yellow-500",
    cosmetic: "bg-gray-500",
    positive: "bg-green-500",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium
        ${severityStyles[severity]}
        ${sizes[size]}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[severity]} shrink-0`} />
      {severityLabels[severity]}
    </span>
  );
}

export function EffortBadge({ effort, size = "md" }: EffortBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${effortStyles[effort]}
        ${sizes[size]}
      `}
    >
      {effortLabels[effort]}
    </span>
  );
}

export function SellabilityBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-xs ${i <= value ? "text-yellow-400" : "text-white/20"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
