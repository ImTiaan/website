import { Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto pb-10 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Get in Touch</h1>
          <p className="text-white/60">
            Have a project in mind or just want to say hello? I'm always open to discussing new opportunities.
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Message</label>
            <textarea 
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none"
            />
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group">
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Send Message
          </button>
        </form>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Or email me directly at <a href="mailto:hello@imtiaan.com" className="text-emerald-400 hover:underline">hello@imtiaan.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
