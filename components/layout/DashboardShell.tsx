"use client";

import type { Report } from "@/data/types";
import type { ProjectSlug } from "@/data/projects";
import { DashboardProviders } from "@/lib/report-context";
import { Sidebar } from "@/components/layout/Sidebar";

export function DashboardShell({
  projectSlug,
  report,
  children,
}: {
  projectSlug: ProjectSlug;
  report: Report;
  children: React.ReactNode;
}) {
  return (
    <DashboardProviders projectSlug={projectSlug} report={report}>
      <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </DashboardProviders>
  );
}
