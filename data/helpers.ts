import type { Domain, Finding, Report, Severity } from "./types";

export function getSeverityCount(findings: Finding[]): Record<Severity, number> {
  const counts: Record<Severity, number> = {
    critical: 0,
    major: 0,
    minor: 0,
    cosmetic: 0,
    positive: 0,
  };
  findings.forEach((f) => counts[f.severity]++);
  return counts;
}

export function getTotalFindingsCount(findings: Finding[]): number {
  return findings.filter((f) => f.severity !== "positive").length;
}

export function getPositiveFindingsCountForReport(report: Report): number {
  return report.domains.reduce(
    (acc, d) => acc + d.findings.filter((f) => f.severity === "positive").length,
    0
  );
}

/** Agrège les sévérités depuis les domaines si severitySummary est absent */
export function getSeveritySummaryOrDerived(report: Report): {
  critical: number;
  major: number;
  minor: number;
} {
  if (report.severitySummary) return report.severitySummary;
  const all = report.domains.flatMap((d) => d.findings);
  return {
    critical: all.filter((f) => f.severity === "critical").length,
    major: all.filter((f) => f.severity === "major").length,
    minor: all.filter((f) => f.severity === "minor").length,
  };
}

export function getActionPlanTotals(report: Report): {
  totalDaysMin: number;
  totalDaysMax: number;
  totalBudgetMin: number;
  totalBudgetMax: number;
} {
  const ap = report.actionPlan;
  if (
    ap.totalDaysMin != null &&
    ap.totalDaysMax != null &&
    ap.totalBudgetMin != null &&
    ap.totalBudgetMax != null
  ) {
    return {
      totalDaysMin: ap.totalDaysMin,
      totalDaysMax: ap.totalDaysMax,
      totalBudgetMin: ap.totalBudgetMin,
      totalBudgetMax: ap.totalBudgetMax,
    };
  }
  const daysMin = ap.lots.reduce((s, l) => s + l.days, 0);
  const daysMax = daysMin;
  const budgetMin = ap.budget.reduce((s, b) => s + b.budgetMin, 0);
  const budgetMax = ap.budget.reduce((s, b) => s + b.budgetMax, 0);
  return {
    totalDaysMin: daysMin,
    totalDaysMax: daysMax,
    totalBudgetMin: budgetMin,
    totalBudgetMax: budgetMax,
  };
}

export function getDomainByIdFromReport(report: Report, id: string): Domain | undefined {
  return report.domains.find((d) => d.id === id);
}
