"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { type Finding } from "@/data/report";
import { SeverityBadge, EffortBadge, SellabilityBadge } from "@/components/ui/Badge";

interface FindingCardProps {
  finding: Finding;
  index: number;
}

const severityBorder: Record<string, string> = {
  critical: "rgba(239,68,68,0.2)",
  major: "rgba(249,115,22,0.15)",
  minor: "rgba(234,179,8,0.12)",
  cosmetic: "rgba(107,114,128,0.1)",
  positive: "rgba(34,197,94,0.15)",
};

const severityBg: Record<string, string> = {
  critical: "rgba(239,68,68,0.04)",
  major: "rgba(249,115,22,0.03)",
  minor: "rgba(234,179,8,0.03)",
  cosmetic: "rgba(107,114,128,0.02)",
  positive: "rgba(34,197,94,0.04)",
};

export function FindingCard({ finding, index }: FindingCardProps) {
  const [open, setOpen] = useState(false);
  const anchorId = `finding-${finding.id}`;

  useEffect(() => {
    const syncFromHash = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash === `#${anchorId}`) {
        setOpen(true);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [anchorId]);

  return (
    <motion.div
      id={anchorId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.04 }}
      className="rounded-2xl border overflow-hidden transition-all duration-300 scroll-mt-24"
      style={{
        borderColor: open
          ? severityBorder[finding.severity]
          : "rgba(255,255,255,0.06)",
        background: open ? severityBg[finding.severity] : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left cursor-pointer hover:bg-white/2 transition-colors"
      >
        {/* ID badge */}
        <div className="shrink-0 mt-0.5">
          <span className="text-xs font-mono font-bold text-white/25 bg-white/5 px-2 py-0.5 rounded-md">
            {finding.id}
          </span>
        </div>

        {/* Title & badges */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-2 leading-snug pr-4">
            {finding.title}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <SeverityBadge severity={finding.severity} size="sm" />
            <EffortBadge effort={finding.effort} size="sm" />
            {finding.sellability > 0 && (
              <span className="flex items-center gap-1 text-xs text-white/30">
                <SellabilityBadge value={finding.sellability} />
              </span>
            )}
          </div>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/5">
              {/* Location */}
              {finding.location && (
                <div className="pt-4 flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-white/25 mt-0.5 shrink-0" />
                  <code className="text-xs text-white/40 font-mono leading-relaxed">
                    {finding.location}
                  </code>
                </div>
              )}

              {/* Observation */}
              <DetailSection
                icon={<span className="text-base">🔍</span>}
                label="Constat"
                content={finding.observation}
              />

              {/* Risk */}
              {finding.severity !== "positive" && (
                <DetailSection
                  icon={<AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
                  label="Risque si non corrigé"
                  content={finding.risk}
                  accent="orange"
                />
              )}

              {/* Recommendation */}
              <DetailSection
                icon={<Lightbulb className="w-3.5 h-3.5 text-yellow-400" />}
                label="Recommandation"
                content={finding.recommendation}
                accent="yellow"
              />

              {/* Benefit */}
              <DetailSection
                icon={<TrendingUp className="w-3.5 h-3.5 text-green-400" />}
                label="Bénéfice attendu"
                content={finding.benefit}
                accent="green"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailSection({
  icon,
  label,
  content,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
  accent?: "orange" | "yellow" | "green";
}) {
  const accentColors = {
    orange: "text-orange-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <div>
      <div className={`flex items-center gap-1.5 mb-1.5 ${accent ? accentColors[accent] : "text-white/40"}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm text-white/60 leading-relaxed pl-5">{content}</p>
    </div>
  );
}
