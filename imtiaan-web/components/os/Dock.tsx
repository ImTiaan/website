"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  User, 
  FileText, 
  Briefcase, 
  Mail, 
  Terminal, 
  Cpu
} from "lucide-react";

interface DockProps {
  onOpenApp: (appId: string) => void;
  activeApps: string[];
}

const apps = [
  { id: "about", label: "About", icon: User },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "consulting", label: "Services", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Dock({ onOpenApp, activeApps }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl px-4 py-3 rounded-2xl flex items-end gap-2 sm:gap-4">
        {apps.map((app) => {
          const isActive = activeApps.includes(app.id);
          const Icon = app.icon;

          return (
            <motion.button
              key={app.id}
              onClick={() => {
                if (app.id === "contact") {
                  window.location.href = "mailto:t@imtiaan.com";
                } else {
                  onOpenApp(app.id);
                }
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group flex flex-col items-center gap-1"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border border-white/10",
                isActive 
                  ? "bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                  : "bg-white/5 hover:bg-white/10"
              )}>
                <Icon className={cn(
                  "w-6 h-6 text-white/80 transition-colors",
                  isActive ? "text-emerald-400" : "group-hover:text-white"
                )} />
              </div>
              
              {/* Active Indicator */}
              <div className={cn(
                "w-1 h-1 rounded-full bg-white transition-opacity duration-300 absolute -bottom-2",
                isActive ? "opacity-100" : "opacity-0"
              )} />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                {app.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
