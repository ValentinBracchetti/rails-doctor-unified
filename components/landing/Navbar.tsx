"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Stethoscope, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#comment", label: "Comment ça marche" },
  { href: "#domaines", label: "Ce qu'on analyse" },
  { href: "#exemple", label: "Exemple" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/7 py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">
            Rails <span className="gradient-text">Doctor</span>
          </span>
        </Link>

        {/* Nav links desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="hidden md:flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            Demander un diagnostic
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/7 px-4 pb-4"
          >
            <nav className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/home"
                className="py-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                Se connecter
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
