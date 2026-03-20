"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <div
            className="rounded-3xl p-12 sm:p-16 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.15) 50%, rgba(6,182,212,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow: "0 0 80px rgba(124,58,237,0.15)",
            }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 dot-pattern opacity-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 glass border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Places disponibles ce mois-ci
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Prêt à connaître la santé
                <br />
                <span className="gradient-text">de votre application ?</span>
              </h2>

              <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                Réponse sous 24h. Premier échange gratuit de 30 minutes pour
                qualifier votre projet.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:contact@rails-doctor.io"
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                >
                  <Mail className="w-4 h-4" />
                  Nous contacter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white/70 font-medium text-base glass border border-white/10 hover:text-white hover:bg-white/7 transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  Prendre un rendez-vous
                </a>
              </div>

              <p className="text-xs text-white/25 mt-8">
                Ou appelez-nous directement · +33 6 00 00 00 00
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
