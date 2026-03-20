import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            <Stethoscope className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-white/70">
            Rails Doctor
          </span>
        </Link>

        <p className="text-xs text-white/25 text-center">
          © {new Date().getFullYear()} Rails Doctor — Rapport confidentiel. Tous droits réservés.
        </p>

        <div className="flex items-center gap-4 text-xs text-white/30">
          <Link href="/home" className="hover:text-white/60 transition-colors">
            Connexion
          </Link>
          <span>·</span>
          <a href="mailto:contact@rails-doctor.io" className="hover:text-white/60 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
