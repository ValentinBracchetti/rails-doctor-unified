"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  LayoutDashboard,
  Shield,
  Sparkles,
  Zap,
  Building2,
  Package,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useReport, useDashboardBase } from "@/lib/report-context";
import type { LucideIcon } from "lucide-react";

type NavDef = {
  path: string;
  label: string;
  icon: LucideIcon;
  domainId?: string;
};

const NAV_DEFS: NavDef[] = [
  { path: "", label: "Vue d'ensemble", icon: LayoutDashboard },
  { path: "/security", label: "Sécurité", icon: Shield, domainId: "security" },
  { path: "/quality", label: "Qualité", icon: Sparkles, domainId: "quality" },
  { path: "/performance", label: "Performance", icon: Zap, domainId: "performance" },
  { path: "/architecture", label: "Architecture", icon: Building2, domainId: "architecture" },
  { path: "/dependencies", label: "Dépendances", icon: Package, domainId: "dependencies" },
  { path: "/action-plan", label: "Plan d'action", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const report = useReport();
  const base = useDashboardBase();

  const navItems = useMemo(() => {
    return NAV_DEFS.map((def) => {
      const href = `${base}${def.path}`;
      const domain = def.domainId
        ? report.domains.find((d) => d.id === def.domainId)
        : undefined;
      return {
        href,
        label: def.label,
        icon: def.icon,
        score: domain ? `${domain.score}/${domain.maxScore}` : undefined,
        color: domain?.color,
      };
    });
  }, [report.domains, base]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/home");
    router.refresh();
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-shrink-0 h-screen sticky top-0 flex flex-col glass border-r border-white/7 overflow-hidden"
      style={{ zIndex: 40 }}
    >
      <div className="h-16 flex items-center px-4 border-b border-white/7 shrink-0">
        <Link href={base} className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-110"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-sm text-white whitespace-nowrap overflow-hidden"
              >
                Rails <span className="gradient-text">Doctor</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <div className="px-2 pt-3 pb-1">
        <Link
          href="/home"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-white/45 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home className="w-4 h-4 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Accueil projets
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {navItems.map((item) => {
          const norm = (p: string) => (p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p);
          const activeLink = norm(pathname) === norm(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${activeLink ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"}
              `}
            >
              {activeLink && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.15))",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}

              <item.icon
                className="w-4 h-4 relative z-10 shrink-0 transition-transform group-hover:scale-110"
                style={activeLink && item.color ? { color: item.color } : {}}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 whitespace-nowrap overflow-hidden flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {!collapsed && item.score && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 text-xs font-semibold shrink-0"
                  style={{ color: item.color }}
                >
                  {item.score}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/7 p-2 space-y-1">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Déconnexion
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 glass border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors hover:border-white/20"
        style={{ zIndex: 50 }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
