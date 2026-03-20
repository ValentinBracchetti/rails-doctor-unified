import type { Report } from "./types";

export const PROJECT_SLUGS = ["mc-rails", "paujauran"] as const;
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export interface ProjectMeta {
  slug: ProjectSlug;
  title: string;
  description: string;
  /** Sous-titre court pour cartes / header */
  tagline: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "mc-rails",
    title: "Mon Cœur — mc-rails",
    description:
      "Diagnostic de l’application Rails Mon Cœur : sécurité, qualité, performance, architecture.",
    tagline: "mc-rails",
  },
  {
    slug: "paujauran",
    title: "Paujauran — pjr-rails",
    description:
      "Rapport d’audit Rails pour le projet Paujauran (pjr-rails).",
    tagline: "pjr-rails",
  },
];

export function projectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function scoreLabel(report: Report): string {
  return `${report.globalScore}/${report.maxScore}`;
}
