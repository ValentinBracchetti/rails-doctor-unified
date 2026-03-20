import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";
import { getReportByProject, getDomainByIdFromReport } from "@/data";

export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const report = getReportByProject(project);
  if (!report) notFound();
  const domain = getDomainByIdFromReport(report, "architecture");
  if (!domain) notFound();
  return <DomainDetailView domain={domain} profileDisplayName={report.profile.name} />;
}
