import { getSession } from "@/lib/auth";
import Link from "next/link";
import { PROJECTS, getReportByProject, scoreLabel } from "@/data";
import { Stethoscope, ArrowRight } from "lucide-react";
import { HomeLogoutButton } from "@/components/home/HomeLogoutButton";
import { RailsDoctorLoginScreen } from "@/components/auth/RailsDoctorLoginScreen";

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

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Choisir un rapport
        </h1>
        <p className="text-white/45 mb-10 max-w-xl">
          Sélectionnez le projet pour ouvrir le tableau de bord d&apos;audit correspondant.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => {
            const report = getReportByProject(p.slug);
            if (!report) return null;
            const sc = scoreLabel(report);
            return (
              <Link key={p.slug} href={`/${p.slug}/dashboard`} className="block group">
                <div
                  className="glass-strong rounded-3xl p-8 border border-white/10 h-full transition-all duration-300 hover:border-violet-500/30 hover:-translate-y-1"
                  style={{
                    boxShadow: "0 0 60px rgba(124,58,237,0.08)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
                      {p.title}
                    </h2>
                    <span
                      className="shrink-0 text-sm font-bold px-3 py-1 rounded-full border border-white/10"
                      style={{ color: "#a78bfa" }}
                    >
                      {sc}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">{p.description}</p>
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
