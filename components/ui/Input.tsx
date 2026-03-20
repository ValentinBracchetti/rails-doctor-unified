"use client";

import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconRight, wrapperClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
        {label && (
          <label className="text-sm font-medium text-white/70">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full glass rounded-xl py-3 pr-4 text-white placeholder:text-white/30
              border border-white/10 focus:border-violet-500/50 focus:outline-none
              focus:ring-2 focus:ring-violet-500/20 transition-all duration-200
              bg-white/3
              ${icon ? "pl-10" : "pl-4"}
              ${error ? "border-red-500/50 focus:ring-red-500/20" : ""}
              ${className}
            `}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
