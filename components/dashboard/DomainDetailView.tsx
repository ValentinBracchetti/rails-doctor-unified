import { type Domain, getSeverityCount } from "@/data/report";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { FindingCard } from "@/components/dashboard/FindingCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { CheckCircle2, Wrench, Zap } from "lucide-react";

interface DomainDetailViewProps {
  domain: Domain;
  /** Libellé projet pour le sous-titre (ex. mc-rails, pjr-rails) */
  profileDisplayName?: string;
}

export function DomainDetailView({
  domain,
  profileDisplayName = "Projet",
}: DomainDetailViewProps) {
  const counts = getSeverityCount(domain.findings);

  const criticals = domain.findings.filter((f) => f.severity === "critical");
  const majors = domain.findings.filter((f) => f.severity === "major");
  const minors = domain.findings.filter(
    (f) => f.severity === "minor" || f.severity === "cosmetic"
  );
  const positives = domain.findings.filter((f) => f.severity === "positive");

  return (
    <div>
      <DashboardHeader
        title={`${domain.icon} ${domain.name}`}
        subtitle={`${profileDisplayName} · ${domain.score}/${domain.maxScore} points`}
        badge={`Domaine ${domain.name}`}
      />

      {/* Top row */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {/* Score ring */}
        <FadeIn>
          <div className="glass rounded-2xl p-6 border border-white/7 flex flex-col items-center justify-center">
            <ScoreRing
              score={domain.score}
              maxScore={domain.maxScore}
              size={140}
              strokeWidth={10}
              label={domain.name}
            />
          </div>
        </FadeIn>

        {/* Severity breakdown */}
        <FadeIn delay={0.1} className="md:col-span-2">
          <div className="glass rounded-2xl p-6 border border-white/7 h-full">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-5">
              Répartition des findings
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Critiques", count: counts.critical, color: "#ef4444" },
                { label: "Majeurs", count: counts.major, color: "#f97316" },
                { label: "Mineurs", count: counts.minor + counts.cosmetic, color: "#eab308" },
                { label: "Positifs", count: counts.positive, color: "#22c55e" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                    {item.count}
                  </div>
                  <div className="text-xs text-white/40">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/50 leading-relaxed">{domain.summary}</p>
          </div>
        </FadeIn>
      </div>

      {/* Quick wins & structural work */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <FadeIn delay={0.15}>
          <div className="glass rounded-2xl p-5 border border-green-500/10 h-full">
            <div className="flex items-center gap-2 mb-4 text-green-400">
              <Zap className="w-4 h-4" />
              <p className="text-xs font-semibold uppercase tracking-wider">
                Quick Wins
              </p>
            </div>
            <ul className="space-y-2">
              {domain.quickWins.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500/70 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="glass rounded-2xl p-5 border border-orange-500/10 h-full">
            <div className="flex items-center gap-2 mb-4 text-orange-400">
              <Wrench className="w-4 h-4" />
              <p className="text-xs font-semibold uppercase tracking-wider">
                Chantiers Structurants
              </p>
            </div>
            <ul className="space-y-2">
              {domain.structuralWork.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full border border-orange-500/40 mt-0.5 shrink-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
                  </div>
                  <span className="text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Findings list */}
      <FadeIn delay={0.25}>
        <div className="space-y-6">
          {criticals.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Critiques ({criticals.length})
                </p>
              </div>
              <div className="space-y-3">
                {criticals.map((f, i) => (
                  <FindingCard key={f.id} finding={f} index={i} />
                ))}
              </div>
            </section>
          )}

          {majors.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  Majeurs ({majors.length})
                </p>
              </div>
              <div className="space-y-3">
                {majors.map((f, i) => (
                  <FindingCard key={f.id} finding={f} index={i} />
                ))}
              </div>
            </section>
          )}

          {minors.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                  Mineurs & Cosmétiques ({minors.length})
                </p>
              </div>
              <div className="space-y-3">
                {minors.map((f, i) => (
                  <FindingCard key={f.id} finding={f} index={i} />
                ))}
              </div>
            </section>
          )}

          {positives.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">
                  Points positifs ({positives.length})
                </p>
              </div>
              <div className="space-y-3">
                {positives.map((f, i) => (
                  <FindingCard key={f.id} finding={f} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
