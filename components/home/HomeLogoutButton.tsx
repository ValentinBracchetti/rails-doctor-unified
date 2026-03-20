"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function HomeLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/home");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-red-400 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Déconnexion
    </button>
  );
}
