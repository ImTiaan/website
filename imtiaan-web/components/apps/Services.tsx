import { Rocket, Target, Zap, CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Fractional COO & Operations",
    icon: Zap,
    description: "Operational leadership for high-growth fintech startups. I help scale teams, optimize processes, and ensure regulatory compliance without the full-time executive cost.",
    features: ["Process Optimization", "Team Structure & Scaling", "Regulatory Compliance", "Operational Efficiency"]
  },
  {
    title: "Product Strategy & Innovation",
    icon: Rocket,
    description: "Turning complex blockchain and fintech concepts into user-friendly products. From whitepaper to launch, I guide the product lifecycle.",
    features: ["Product Roadmap", "Market Fit Analysis", "UX/UI Strategy", "Blockchain Integration"]
  },
  {
    title: "Strategic Advisory",
    icon: Target,
    description: "Expert guidance for founders navigating the volatile crypto and fintech landscape. Avoid common pitfalls and accelerate your go-to-market strategy.",
    features: ["Business Modeling", "Go-to-Market Strategy", "Fundraising Prep", "Partnership Development"]
  }
];

export default function Services() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Consulting Services</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Leveraging 15+ years of fintech and operations experience to help ambitious companies build the future of finance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div 
            key={idx}
            className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <service.icon className="w-6 h-6 text-emerald-400" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
              {service.description}
            </p>

            <ul className="space-y-3">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/80" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-white/10 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Ready to scale your fintech venture?</h3>
        <p className="text-white/60">Let's discuss how I can help streamline your operations and product strategy.</p>
        <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          Schedule a Discovery Call
        </button>
      </div>
    </div>
  );
}
