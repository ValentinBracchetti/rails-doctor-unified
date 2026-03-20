"use client";

import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

const domains = [
  {
    icon: "🔒",
    name: "Sécurité",
    description:
      "Analyse des CVEs (bundle-audit), SSL, CORS, CSP, secrets exposés, mise à jour des dépendances vulnérables.",
    score: "0–30 pts",
    items: ["CVE scanning", "CORS & SSL", "Secrets", "Headers sécurité"],
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.15)",
  },
  {
    icon: "🧹",
    name: "Qualité de code",
    description:
      "RuboCop, Reek, Flog, rails_best_practices. Détection des méthodes trop complexes, du code mort, des violations de loi de Déméter.",
    score: "0–20 pts",
    items: ["RuboCop", "Reek", "Flog complexity", "Code mort"],
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.15)",
  },
  {
    icon: "⚡",
    name: "Performance",
    description:
      "Détection des N+1 queries, configuration du cache, fragment caching, index manquants, requêtes GraphQL optimisées.",
    score: "0–20 pts",
    items: ["Requêtes N+1", "Cache store", "GraphQL batch", "Index BDD"],
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.15)",
  },
  {
    icon: "🏗️",
    name: "Architecture",
    description:
      "Ratio services/models, couverture de tests, patterns manquants (Form Objects, Policies), version de Rails, dépendances EOL.",
    score: "0–20 pts",
    items: ["Service Objects", "Tests coverage", "Patterns Rails", "Rails version"],
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.15)",
  },
  {
    icon: "📦",
    name: "Dépendances",
    description:
      "Audit complet des gems (bundle-audit), versions EOL, gems obsolètes, compatibilité avec les versions récentes de Ruby et Rails.",
    score: "0–10 pts",
    items: ["bundle-audit", "Gems obsolètes", "EOL tracking", "Compatibilité"],
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.15)",
  },
];

export function Domains() {
  return (
    <section id="domaines" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3">
            Ce que nous analysons
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            5 domaines,{" "}
            <span className="gradient-text">100 points</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Chaque domaine est évalué avec des outils spécialisés et une analyse manuelle
            d&apos;expert. Chaque finding est priorisé par sévérité et effort.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((d) => (
            <motion.div
              key={d.name}
              variants={staggerItem}
              className="group rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02]"
              style={{ background: d.bg, borderColor: d.border }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{d.icon}</span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: `${d.color}20`, color: d.color }}
                >
                  {d.score}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{d.name}</h3>
              <p className="text-xs text-white/50 leading-relaxed mb-4">{d.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {d.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{
                      background: `${d.color}15`,
                      color: `${d.color}cc`,
                      border: `1px solid ${d.color}25`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bonus card: rapport interactif */}
          <motion.div
            variants={staggerItem}
            className="rounded-2xl p-6 border border-white/7 bg-white/2 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
          >
            <div>
              <span className="text-3xl mb-5 block">📋</span>
              <h3 className="text-base font-semibold text-white mb-2">
                Plan d&apos;action priorisé
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Tous les findings classés par sévérité, avec effort estimé et budget indicatif
                par lot d&apos;intervention.
              </p>
            </div>
            <div className="mt-4 text-xs text-white/30">
              Lots 1 · 2 · 3 — Quick Wins → Structurant → Nice to Have
            </div>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  );
}
