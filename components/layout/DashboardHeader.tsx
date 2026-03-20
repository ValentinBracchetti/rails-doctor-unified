"use client";

import { motion } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  onExport?: () => void;
}

export function DashboardHeader({ title, subtitle, badge, onExport }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between gap-4 mb-8"
    >
      <div>
        {badge && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            {badge}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-white/40 mt-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {subtitle}
          </p>
        )}
      </div>

      {onExport && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          icon={<Download className="w-4 h-4" />}
        >
          Exporter PDF
        </Button>
      )}
    </motion.div>
  );
}
