"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Domain, getSeverityCount } from "@/data/report";
import { useDashboardBase } from "@/lib/report-context";
import { ArrowRight } from "lucide-react";

interface DomainCardProps {
  domain: Domain;
  delay?: number;
}

const severityColors = {
  critical: { background: "rgba(239,68,68,0.1)", color: "#ef4444" },
  major: { background: "rgba(249,115,22,0.1)", color: "#f97316" },
  minor: { background: "rgba(234,179,8,0.1)", color: "#eab308" },
  cosmetic: { background: "rgba(107,114,128,0.1)", color: "#9ca3af" },
  positive: { background: "rgba(34,197,94,0.1)", color: "#22c55e" },
};

export function DomainCard({ domain, delay = 0 }: DomainCardProps) {
  const base = useDashboardBase();
  const counts = getSeverityCount(domain.findings);
  const pct = Math.round((domain.score / domain.maxScore) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay }}
    >
      <Link
        href={`${base}/${domain.id}`}
        className="block group rounded-2xl p-5 glass border border-white/7 hover:border-white/14 transition-all duration-300 hover:-translate-y-0.5"
        style={{ boxShadow: `0 0 0 0 ${domain.color}30` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${domain.color}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${domain.color}30`;
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${domain.color}25, ${domain.color}10)`,
                border: `1px solid ${domain.color}30`,
              }}
            >
              {domain.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{domain.name}</h3>
              <p className="text-xs text-white/30 mt-0.5">{domain.maxScore} pts max</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xl font-bold" style={{ color: domain.color }}>
              {domain.score}
              <span className="text-sm font-normal text-white/30">/{domain.maxScore}</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: domain.color,
              boxShadow: `0 0 6px ${domain.color}60`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.3 }}
          />
        </div>

        {/* Severity counts */}
        <div className="flex items-center gap-2 flex-wrap">
          {counts.critical > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={severityColors.critical}
            >
              {counts.critical} critique{counts.critical > 1 ? "s" : ""}
            </span>
          )}
          {counts.major > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={severityColors.major}
            >
              {counts.major} majeur{counts.major > 1 ? "s" : ""}
            </span>
          )}
          {counts.minor > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={severityColors.minor}
            >
              {counts.minor} mineur{counts.minor > 1 ? "s" : ""}
            </span>
          )}
          {counts.positive > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={severityColors.positive}
            >
              {counts.positive} positif{counts.positive > 1 ? "s" : ""}
            </span>
          )}

          <ArrowRight className="w-3.5 h-3.5 text-white/20 ml-auto group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
