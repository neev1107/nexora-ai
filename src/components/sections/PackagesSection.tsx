"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap, Star, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "₹10,000",
    description: "Perfect for businesses looking to automate one key process — like lead capture or customer replies.",
    icon: Zap, color: "#06B6D4", popular: false,
    features: [
      "One focused automation (chatbot OR lead capture OR WhatsApp bot)",
      "Basic business workflow setup",
      "Lead notification system",
      "WhatsApp or email integration",
      "Google Sheets data collection",
      "Full documentation & walkthrough",
      "1 Week post-delivery support",
    ],
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "₹20,000",
    description: "The complete automation package for businesses ready to run their sales and customer communication on autopilot.",
    icon: Star, color: "#4F46E5", popular: true,
    features: [
      "Everything in Basic",
      "Complete CRM automation & sync",
      "WhatsApp follow-up sequences",
      "Google Sheets full integration",
      "Email automation flows",
      "Lead scoring & routing",
      "Analytics setup",
      "30 Days priority support",
      "Monthly performance review call",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: "₹35,000",
    description: "A fully custom AI system for businesses that want to automate multiple processes and integrate all their tools.",
    icon: Crown, color: "#8B5CF6", popular: false,
    features: [
      "Everything in Standard",
      "Custom AI workflow design",
      "Advanced AI chatbot (trained on your data)",
      "Full CRM + WhatsApp + Email + SMS",
      "Lead management system",
      "API integrations (up to 3 platforms)",
      "n8n automation workflows",
      "AI voice assistant setup",
      "60 Days priority support",
      "Weekly strategy & review calls",
    ],
    cta: "Get Started",
  },
];

export default function PackagesSection() {
  const handleSelect = (packageName: string) => {
    const contactSection = document.getElementById("contact");
    if(contactSection) {
      contactSection.scrollIntoView({behavior:"smooth"});
      window.dispatchEvent(new CustomEvent("selectPackage",{detail:packageName}));
    }
  };

  return (
    <section id="packages" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none"
        style={{background:"radial-gradient(ellipse 80% 50% at 50% 50%,rgba(79,70,229,0.1) 0%,transparent 100%)"}}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Transparent Pricing</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Fixed Prices, <span className="gradient-text">No Surprises</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every price includes everything listed — no hidden fees, no hourly overruns.
            Not sure which package? Book a free consultation and we&apos;ll recommend the right fit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {packages.map((pkg,i)=>(
            <motion.div key={pkg.name} initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*0.13,duration:0.6}}
              className={`relative glass-card p-7 flex flex-col ${pkg.popular?"ring-2 ring-primary/60 scale-[1.03] shadow-[0_0_40px_rgba(79,70,229,0.25)]":""}`}>
              {pkg.popular&&(
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="popular-badge flex items-center gap-1.5">
                    <Star className="w-3 h-3"/>Most Popular
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{backgroundColor:`${pkg.color}15`,boxShadow:`0 0 20px ${pkg.color}25`}}>
                  <pkg.icon className="w-6 h-6" style={{color:pkg.color}}/>
                </div>
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-medium">Package</div>
                  <div className="text-lg font-bold text-white" style={{fontFamily:"Space Grotesk"}}>{pkg.name}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-4xl font-bold mb-1" style={{fontFamily:"Space Grotesk",color:pkg.color}}>
                  {pkg.price}
                </div>
                <div className="text-xs text-[#64748B]">One-time fixed price · No recurring fees</div>
              </div>

              <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">{pkg.description}</p>

              <div className="flex-1 space-y-3 mb-8">
                {pkg.features.map(feat=>(
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{backgroundColor:`${pkg.color}20`}}>
                      <Check className="w-3 h-3" style={{color:pkg.color}}/>
                    </div>
                    <span className="text-sm text-[#CBD5E1]">{feat}</span>
                  </div>
                ))}
              </div>

              <button onClick={()=>handleSelect(pkg.name)}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? "btn-primary"
                    : "border border-white/10 text-white hover:border-primary/50 hover:bg-primary/10"
                }`}>
                {pkg.cta} <ArrowRight className="w-4 h-4"/>
              </button>
              <div className="text-center mt-3 text-xs text-[#475569]">Free consultation included</div>

              {pkg.popular&&(
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                  style={{background:`linear-gradient(90deg,transparent,${pkg.color},transparent)`}}/>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
          transition={{delay:0.4}} className="mt-10 glass-card p-5 max-w-2xl mx-auto text-center">
          <p className="text-sm text-[#94A3B8]">
            <span className="text-white font-medium">Need something custom?</span> Enterprise projects,
            multiple integrations, or ongoing automation support are quoted separately.{" "}
            <a href="#contact" className="text-primary hover:underline">Let&apos;s talk →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
