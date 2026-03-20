import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";
import { getReportByProject, getDomainByIdFromReport } from "@/data";

export default async function QualityPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const report = getReportByProject(project);
  if (!report) notFound();
  const domain = getDomainByIdFromReport(report, "quality");
  if (!domain) notFound();
  return <DomainDetailView domain={domain} profileDisplayName={report.profile.name} />;
}
