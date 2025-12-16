import { profileData } from "@/lib/data";
import { MapPin, Mail, Linkedin, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-10">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shrink-0">
          <span className="text-4xl">👨‍💻</span>
          {/* TODO: Replace with actual image */}
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">{profileData.name}</h1>
          <p className="text-lg text-emerald-400 font-medium">{profileData.title}</p>
          <p className="text-white/60 text-sm">{profileData.tagline}</p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <div className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <MapPin className="w-3 h-3" />
              {profileData.location}
            </div>
            <a href={`mailto:${profileData.email}`} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-white/10 hover:text-white transition-colors">
              <Mail className="w-3 h-3" />
              Email Me
            </a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] transition-colors">
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Professional Summary</h2>
        <div className="space-y-4 text-white/70 leading-relaxed">
          {profileData.summary.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Core Competencies</h2>
        <div className="flex flex-wrap gap-2">
          {profileData.skills.map((skill) => (
            <span 
              key={skill} 
              className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-sm rounded-lg border border-emerald-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Education</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {profileData.education.map((edu, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-medium text-white">{edu.institution}</h3>
              <p className="text-sm text-white/60">{edu.degree}</p>
              <p className="text-xs text-emerald-500/80">{edu.year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
