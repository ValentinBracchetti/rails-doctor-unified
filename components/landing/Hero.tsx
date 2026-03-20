"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Code2 } from "lucide-react";

const badges = [
  { icon: Shield, label: "Sécurité" },
  { icon: Zap, label: "Performance" },
  { icon: Code2, label: "Architecture" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-mesh-1 absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)" }}
        />
        <div
          className="animate-mesh-2 absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 65%)" }}
        />
        <div
          className="animate-mesh-3 absolute top-[30%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 65%)" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass border border-white/10 rounded-full px-4 py-2 text-sm text-white/70 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Diagnostic Rails complet en 48h
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          Votre application Rails
          <br />
          <span className="gradient-text">mérite un diagnostic</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Nous analysons votre code Ruby on Rails en profondeur — sécurité, performance,
          qualité et architecture — et vous livrons un rapport d&apos;action priorisé.
        </motion.p>

        {/* Domain badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 glass border border-white/8 rounded-xl px-4 py-2 text-sm text-white/60"
            >
              <Icon className="w-3.5 h-3.5 text-violet-400" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            Demander mon diagnostic
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/home"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white/70 font-medium text-base glass border border-white/10 hover:text-white hover:bg-white/7 transition-all duration-300"
          >
            Voir un exemple de rapport
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "42+", label: "Critères analysés" },
            { value: "48h", label: "Délai de livraison" },
            { value: "100%", label: "Actionnable" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-xs text-white/20 rotate-90 origin-center mt-2">scroll</span>
      </motion.div>
    </section>
  );
}
