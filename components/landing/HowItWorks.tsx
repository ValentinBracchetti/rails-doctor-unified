"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { GitBranch, Search, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: GitBranch,
    title: "Accès au code",
    description:
      "Vous nous donnez accès à votre dépôt Git (privé ou public). Nous analysons l'ensemble du code source, la configuration et les dépendances.",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    number: "02",
    icon: Search,
    title: "Analyse en profondeur",
    description:
      "Nos outils et experts passent en revue 5 domaines : sécurité (bundle-audit, CVEs), qualité (RuboCop, Reek, Flog), performance, architecture et dépendances.",
    color: "#2563eb",
    glow: "rgba(37,99,235,0.3)",
  },
  {
    number: "03",
    icon: FileText,
    title: "Rapport & plan d'action",
    description:
      "Vous recevez un rapport interactif avec tous les findings priorisés, leurs niveaux de risque, et un plan d'action en 3 lots avec estimations budgétaires.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
  },
];

export function HowItWorks() {
  return (
    <section id="comment" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-3">
            Comment ça marche
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            Un diagnostic{" "}
            <span className="gradient-text">en 3 étapes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Processus structuré et livraison rapide. De l&apos;accès au code au rapport
            d&apos;action en moins de 48h.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-violet-500/40 via-blue-500/40 to-cyan-500/40" />

          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.15}>
              <div className="relative group">
                <div
                  className="rounded-3xl p-7 glass border border-white/7 transition-all duration-300 hover:border-white/14 h-full"
                  style={{
                    boxShadow: `0 0 0 0 ${step.glow}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${step.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${step.glow}`;
                  }}
                >
                  {/* Step number */}
                  <div className="text-xs font-bold text-white/20 mb-5 tracking-widest">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}33, ${step.color}11)`,
                      border: `1px solid ${step.color}33`,
                    }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
