import { redirect } from "next/navigation";

/** Compatibilité des liens : l’authentification est uniquement sur /home. */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  if (from) {
    redirect(`/home?from=${encodeURIComponent(from)}`);
  }
  redirect("/home");
}
