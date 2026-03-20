"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useReport } from "@/lib/report-context";

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { domain: string; score: number; raw: string } }[];
}) {
  if (!active || !payload?.length) return null;
  const { domain, score, raw } = payload[0].payload;
  return (
    <div className="glass border border-white/10 rounded-xl px-3 py-2 text-xs">
      <div className="font-semibold text-white">{domain}</div>
      <div className="text-white/50 mt-0.5">{raw} pts</div>
      <div className="text-violet-400 font-bold">{score}%</div>
    </div>
  );
}

export function DomainsRadar() {
  const report = useReport();
  const data = report.domains.map((d) => ({
    domain: d.name,
    score: Math.round((d.score / d.maxScore) * 100),
    raw: `${d.score}/${d.maxScore}`,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid
          stroke="rgba(255,255,255,0.06)"
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="domain"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#7c3aed"
          fill="#7c3aed"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={{ r: 4, fill: "#7c3aed", strokeWidth: 0 }}
          animationBegin={200}
          animationDuration={1200}
          animationEasing="ease-out"
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
