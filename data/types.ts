export type Severity = "critical" | "major" | "minor" | "cosmetic" | "positive";
export type Effort = "XS" | "S" | "M" | "L" | "XL";

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  effort: Effort;
  sellability: number;
  location: string;
  observation: string;
  risk: string;
  recommendation: string;
  benefit: string;
}

export interface Domain {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  icon: string;
  color: string;
  findings: Finding[];
  quickWins: string[];
  structuralWork: string[];
  summary: string;
}

export interface ActionItem {
  findingId: string;
  title: string;
  domain: string;
  severity: Severity;
  effort: Effort;
  impact: string;
  details: string;
  deliverable: string;
  estimate: string;
  prerequisite?: string;
}

export interface ActionLot {
  id: string;
  name: string;
  color: string;
  emoji: string;
  days: number;
  budgetMin: number;
  budgetMax: number;
  description: string;
  sellability: number;
  items: ActionItem[];
}

export interface BudgetLine {
  lot: string;
  days: number;
  budgetMin: number;
  budgetMax: number;
}

export interface ProjectProfile {
  name: string;
  path: string;
  date: string;
  railsVersion: string;
  rubyVersion: string;
  database: string;
  webServer: string;
  backgroundJobs: string;
  cacheStore: string;
  fileStorage: string;
  frontend: string;
  stats: { label: string; value: string | number }[];
}

/** Modèle unifié : champs optionnels pour compatibilité mc-rails / paujauran */
export interface Report {
  profile: ProjectProfile;
  globalScore: number;
  maxScore: number;
  /** Si absent, agrégé depuis les findings des domaines (`getSeveritySummaryOrDerived`). */
  severitySummary?: { critical: number; major: number; minor: number };
  executiveSummary: {
    headline: string;
    meaning: string;
    topRisks: { title: string; description: string }[];
    recommendation: string;
  };
  domains: Domain[];
  actionPlan: {
    lots: ActionLot[];
    budget: BudgetLine[];
    sequencing: string;
    totalDaysMin?: number;
    totalDaysMax?: number;
    totalBudgetMin?: number;
    totalBudgetMax?: number;
  };
}
