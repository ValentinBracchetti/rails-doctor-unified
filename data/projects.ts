import type { Report } from "./types";

export const PROJECT_SLUGS = ["mc-rails", "paujauran"] as const;
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Icône affichée sur la page d’accueil (carte projet) — mappée côté UI vers Lucide. */
export type ProjectHomeIcon = "heart-pulse" | "package";

export interface ProjectMeta {
  slug: ProjectSlug;
  title: string;
  description: string;
  /** Résumé court pour la carte de sélection (1–2 phrases). */
  summary: string;
  homeIcon: ProjectHomeIcon;
  /** Sous-titre court pour cartes / header */
  tagline: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "mc-rails",
    title: "Mon Cœur — mc-rails",
    description:
      "Diagnostic de l’application Rails Mon Cœur : sécurité, qualité, performance, architecture.",
    summary:
      "App santé (suivi cardiologique, API mobile, ActiveAdmin). Rapport centré sur données sensibles, versions EOL et couverture de tests.",
    homeIcon: "heart-pulse",
    tagline: "mc-rails",
  },
  {
    slug: "paujauran",
    title: "Paujauran — pjr-rails",
    description:
      "Rapport d’audit Rails pour le projet Paujauran (pjr-rails).",
    summary:
      "Plateforme métier (commandes, clients, GraphQL, ActiveAdmin). Mise en avant des risques sécurité, perf sous charge et dette sur les dépendances.",
    homeIcon: "package",
    tagline: "pjr-rails",
  },
];

export function projectMeta(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function scoreLabel(report: Report): string {
  return `${report.globalScore}/${report.maxScore}`;
}
