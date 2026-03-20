import { report as reportMcRails } from "./mc-rails";
import { report as reportPaujauran } from "./paujauran";
import type { Report } from "./types";
import { PROJECT_SLUGS, type ProjectSlug } from "./projects";

export type { ProjectSlug };
export { PROJECT_SLUGS, PROJECTS, projectMeta, scoreLabel } from "./projects";
export * from "./types";
export * from "./helpers";

const REPORTS: Record<ProjectSlug, Report> = {
  "mc-rails": reportMcRails,
  paujauran: reportPaujauran,
};

export function isValidProjectSlug(slug: string): slug is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(slug);
}

export function getReportByProject(slug: string): Report | null {
  if (!isValidProjectSlug(slug)) return null;
  return REPORTS[slug];
}
