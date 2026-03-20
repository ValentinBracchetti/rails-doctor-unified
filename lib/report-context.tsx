"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Report } from "@/data/types";
import type { ProjectSlug } from "@/data/projects";

const ReportContext = createContext<Report | null>(null);
const ProjectSlugContext = createContext<ProjectSlug | null>(null);

export function DashboardProviders({
  projectSlug,
  report,
  children,
}: {
  projectSlug: ProjectSlug;
  report: Report;
  children: ReactNode;
}) {
  return (
    <ProjectSlugContext.Provider value={projectSlug}>
      <ReportContext.Provider value={report}>{children}</ReportContext.Provider>
    </ProjectSlugContext.Provider>
  );
}

export function useReport(): Report {
  const ctx = useContext(ReportContext);
  if (!ctx) {
    throw new Error("useReport doit être utilisé dans un DashboardProviders.");
  }
  return ctx;
}

export function useProjectSlug(): ProjectSlug {
  const ctx = useContext(ProjectSlugContext);
  if (!ctx) {
    throw new Error("useProjectSlug doit être utilisé dans un DashboardProviders.");
  }
  return ctx;
}

/** Préfixe `/${slug}/dashboard` */
export function useDashboardBase(): string {
  const slug = useProjectSlug();
  return `/${slug}/dashboard`;
}
