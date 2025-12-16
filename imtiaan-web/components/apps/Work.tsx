import { profileData } from "@/lib/data";
import { Building2, Calendar } from "lucide-react";

export default function Work() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Career History</h1>
          <p className="text-white/60">A timeline of my professional journey in Fintech and Operations.</p>
        </div>
      </div>

      <div className="space-y-6">
        {profileData.experience.map((role, idx) => (
          <div 
            key={idx} 
            className="group relative pl-8 pb-8 border-l border-white/10 last:pb-0 last:border-0"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform" />
            
            <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-white">{role.role}</h3>
                  <div className="flex items-center gap-2 text-emerald-400 mt-1">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{role.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40 bg-black/20 px-3 py-1.5 rounded-full w-fit">
                  <Calendar className="w-3 h-3" />
                  {role.period}
                </div>
              </div>

              <ul className="space-y-2">
                {role.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                    <span className="text-emerald-500 mt-1.5">•</span>
                    <span>{item.replace("Key Achievement:", "").replace("Key Achievement", "")}</span>
                  </li>
                ))}
              </ul>
              
              {/* Highlight Key Achievements separately if detected in string */}
              {role.description.some(d => d.includes("Key Achievement")) && (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-sm text-emerald-300">
                    <span className="font-bold">🏆 Key Achievement:</span> 
                    {role.description.find(d => d.includes("Key Achievement"))?.split(":")[1]}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
