/**
 * Point d’entrée historique pour les composants : types + helpers sans rapport courant.
 */
export type * from "./types";
export {
  getSeverityCount,
  getTotalFindingsCount,
  getPositiveFindingsCountForReport,
  getSeveritySummaryOrDerived,
  getActionPlanTotals,
  getDomainByIdFromReport,
} from "./helpers";
