import { getSession } from "@/lib/auth";
import Link from "next/link";
import {
  PROJECTS,
  getReportByProject,
  scoreLabel,
  type ProjectHomeIcon,
} from "@/data";
import {
  Stethoscope,
  ArrowRight,
  HeartPulse,
  Package,
  Shield,
  TestTube2,
  Zap,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { HomeLogoutButton } from "@/components/home/HomeLogoutButton";
import { RailsDoctorLoginScreen } from "@/components/auth/RailsDoctorLoginScreen";

const HOME_ICONS: Record<ProjectHomeIcon, LucideIcon> = {
  "heart-pulse": HeartPulse,
  package: Package,
};

const RD_DOMAINS: { icon: LucideIcon; label: string }[] = [
  { icon: Shield, label: "Sécurité" },
  { icon: TestTube2, label: "Qualité" },
  { icon: Zap, label: "Performance" },
  { icon: Layers, label: "Architecture" },
];

export default async function HomePage() {
  const session = await getSession();
  if (!session) {
    return <RailsDoctorLoginScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-mesh-1 absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-mesh-2 absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
            >
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">Rails Doctor</p>
              <p className="text-xs text-white/40">Connecté · {session.login}</p>
            </div>
          </div>
          <HomeLogoutButton />
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:py-12">
        <section className="mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Choisir une application
          </h1>
          <p className="text-white/45 mb-6 max-w-2xl leading-relaxed">
            Ouvrez le tableau de bord du rapport d&apos;audit correspondant à chaque code
            base analysée.
          </p>

          <div
            className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10"
            style={{ boxShadow: "0 0 50px rgba(124,58,237,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
              >
                <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Ce que fait Rails Doctor
                </h2>
                <p className="text-sm text-white/55 leading-relaxed mb-4">
                  Rails Doctor consolide des diagnostics techniques sur vos applications{" "}
                  <span className="text-white/75">Ruby on Rails</span>. Pour chaque projet,
                  un rapport structuré synthétise les forces et les risques, puis propose des
                  actions priorisées (quick wins et chantiers) pour sécuriser, fiabiliser et
                  faire évoluer votre stack.
                </p>
                <div className="flex flex-wrap gap-2">
                  {RD_DOMAINS.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60"
                    >
                      <Icon className="w-3.5 h-3.5 text-violet-400/90" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/35 mb-4">
          Rapports disponibles
        </h2>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((p) => {
            const report = getReportByProject(p.slug);
            if (!report) return null;
            const sc = scoreLabel(report);
            const CardIcon = HOME_ICONS[p.homeIcon];
            return (
              <Link key={p.slug} href={`/${p.slug}/dashboard`} className="block group">
                <div
                  className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 h-full transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1"
                  style={{
                    boxShadow: "0 0 60px rgba(124,58,237,0.08)",
                  }}
                >
                  <div className="flex gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(124,58,237,0.35), rgba(37,99,235,0.2))",
                      }}
                    >
                      <CardIcon
                        className="w-7 h-7 text-white"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors leading-snug">
                          {p.title}
                        </h3>
                        <span
                          className="shrink-0 text-sm font-bold px-3 py-1 rounded-full border border-white/10"
                          style={{ color: "#a78bfa" }}
                        >
                          {sc}
                        </span>
                      </div>
                      <p className="text-xs text-white/35 font-medium">{p.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-6">{p.summary}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 group-hover:text-violet-300">
                    Ouvrir le tableau de bord
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
