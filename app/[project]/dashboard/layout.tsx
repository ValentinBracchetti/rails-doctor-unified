import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getReportByProject, isValidProjectSlug } from "@/data";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default async function ProjectDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  if (!isValidProjectSlug(project)) notFound();
  const report = getReportByProject(project);
  if (!report) notFound();

  const session = await getSession();
  if (!session) {
    redirect(`/home?from=${encodeURIComponent(`/${project}/dashboard`)}`);
  }

  return (
    <DashboardShell projectSlug={project} report={report}>
      {children}
    </DashboardShell>
  );
}
