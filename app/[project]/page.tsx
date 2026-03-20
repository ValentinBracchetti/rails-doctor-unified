import { notFound, redirect } from "next/navigation";
import { isValidProjectSlug } from "@/data";

export default async function ProjectRootPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  if (!isValidProjectSlug(project)) notFound();
  redirect(`/${project}/dashboard`);
}
