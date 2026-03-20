"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, Lock } from "lucide-react";

const scores = [
  { label: "Sécurité", score: 8, max: 30, color: "#ef4444", pct: 27 },
  { label: "Qualité", score: 12, max: 20, color: "#a855f7", pct: 60 },
  { label: "Performance", score: 10, max: 20, color: "#f97316", pct: 50 },
  { label: "Architecture", score: 9, max: 20, color: "#06b6d4", pct: 45 },
  { label: "Dépendances", score: 3, max: 10, color: "#22c55e", pct: 30 },
];

export function PreviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="exemple" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-3">
            Aperçu du rapport
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Un rapport qui{" "}
            <span className="gradient-text">parle à vos clients</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Interface interactive, findings détaillés, graphiques animés. Vos clients
            comprennent leur situation en un coup d&apos;œil.
          </p>
        </FadeIn>

        {/* Mock dashboard preview */}
        <FadeIn delay={0.2}>
          <div
            ref={ref}
            className="relative rounded-3xl overflow-hidden border border-white/8"
            style={{ boxShadow: "0 0 80px rgba(124,58,237,0.2), 0 0 0 1px rgba(255,255,255,0.04)" }}
          >
            {/* Top bar */}
            <div className="glass border-b border-white/7 px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="mx-auto text-xs text-white/30">
                rails-doctor-report.app/dashboard
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="p-6 sm:p-10 grid md:grid-cols-2 gap-6 bg-[#0a0a0f]">
              {/* Score global */}
              <div className="glass rounded-2xl p-6 border border-white/7">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-5">
                  Score de santé global
                </p>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg width="96" height="96" className="-rotate-90">
                      <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <motion.circle
                        cx="48" cy="48" r="38"
                        fill="none" stroke="#ef4444" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 38}
                        initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                        animate={inView ? { strokeDashoffset: 2 * Math.PI * 38 * (1 - 0.42) } : {}}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        style={{ filter: "drop-shadow(0 0 8px rgba(239,68,68,0.6))" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-red-400">42</span>
                      <span className="text-xs text-white/30">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-400 mb-1">Critique</p>
                    <p className="text-sm text-white/40">Action urgente recommandée</p>
                    <p className="text-xs text-white/25 mt-2">pjr-rails • 18 mars 2025</p>
                  </div>
                </div>
              </div>

              {/* Domain scores */}
              <div className="glass rounded-2xl p-6 border border-white/7">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-5">
                  Scores par domaine
                </p>
                <div className="space-y-3">
                  {scores.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-xs text-white/50 w-20 shrink-0">{s.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: s.color }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${s.pct}%` } : {}}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-12 text-right" style={{ color: s.color }}>
                        {s.score}/{s.max}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings summary */}
              <div className="glass rounded-2xl p-6 border border-white/7">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-5">
                  Findings
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Critiques", count: 10, color: "#ef4444" },
                    { label: "Majeurs", count: 20, color: "#f97316" },
                    { label: "Mineurs", count: 14, color: "#eab308" },
                    { label: "Positifs", count: 4, color: "#22c55e" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                        {item.count}
                      </div>
                      <div className="text-xs text-white/30">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="glass rounded-2xl p-6 border border-white/7">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-5">
                  Plan d&apos;action
                </p>
                <div className="space-y-2">
                  {[
                    { lot: "Lot 1 — Quick Wins", days: "5j", budget: "2 500€ – 5 000€", color: "#22c55e" },
                    { lot: "Lot 2 — Structurant", days: "18j", budget: "9 000€ – 18 000€", color: "#f97316" },
                    { lot: "Lot 3 — Nice to Have", days: "8j", budget: "4 000€ – 8 000€", color: "#3b82f6" },
                  ].map((row) => (
                    <div
                      key={row.lot}
                      className="flex items-center justify-between text-xs py-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.color }} />
                        <span className="text-white/60">{row.lot}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/30">{row.days}</span>
                        <span className="font-semibold" style={{ color: row.color }}>{row.budget}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blurred overlay with CTA */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,15,0.95) 100%)",
                backdropFilter: "blur(0px)",
              }}
            />
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Lock className="w-4 h-4" />
                Rapport complet accessible après connexion
              </div>
              <Link
                href="/home"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
              >
                Voir le rapport complet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
