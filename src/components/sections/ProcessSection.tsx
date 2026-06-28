"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, PenTool, Code2, TestTube, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  { icon: MessageSquare, num: "01", title: "Free Consultation", desc: "We talk through your business, the tasks eating your time, and what automation could solve first.", color: "#4F46E5", duration: "30 min call" },
  { icon: Search, num: "02", title: "Business Analysis", desc: "We map your current workflow, identify automation opportunities, and estimate time and cost savings.", color: "#06B6D4", duration: "1–2 days" },
  { icon: PenTool, num: "03", title: "Workflow Design", desc: "We design the exact automation flow — every step, trigger, and integration — and show you before building.", color: "#8B5CF6", duration: "1–2 days" },
  { icon: Code2, num: "04", title: "Development", desc: "We build and connect all the pieces — chatbot, CRM, WhatsApp, email — using the best tools for your use case.", color: "#10B981", duration: "3–7 days" },
  { icon: TestTube, num: "05", title: "Testing", desc: "Every flow is tested thoroughly with real scenarios before anything goes live. No surprises for your customers.", color: "#F59E0B", duration: "1–2 days" },
  { icon: Rocket, num: "06", title: "Deployment", desc: "Your automation goes live. We're with you during the launch and ensure everything works perfectly.", color: "#EF4444", duration: "1 day" },
  { icon: LifeBuoy, num: "07", title: "Ongoing Support", desc: "We provide post-launch support and are available via WhatsApp for any questions, updates, or improvements.", color: "#4F46E5", duration: "Included" },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.05]"
        style={{background:"radial-gradient(circle,#4F46E5 0%,transparent 70%);"}}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-16">
          <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-4">
            <Rocket className="w-3.5 h-3.5"/>
            <span>How We Work</span>
          </div>
          <h2 className="section-title text-white mb-4">
            From Idea to <span className="gradient-text">Live Automation</span> in Days
          </h2>
          <p className="section-subtitle mx-auto">
            A clear, transparent process so you always know what&apos;s happening.
            No surprises, no jargon, no endless delays.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (mobile) */}
          <div className="absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent lg:hidden"/>

          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-7 lg:gap-3">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*0.08,duration:0.55}}
                className="relative flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 lg:text-center">
                {/* Connector line between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[22px] left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px"
                    style={{background:`linear-gradient(90deg,${step.color}50,${steps[i+1].color}30)`}}/>
                )}

                {/* Icon circle */}
                <div className="relative flex-shrink-0 lg:mb-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center relative z-10 border-2 transition-all duration-300"
                    style={{backgroundColor:`${step.color}15`,borderColor:`${step.color}40`}}>
                    <step.icon className="w-4.5 h-4.5" style={{color:step.color,width:"18px",height:"18px"}}/>
                  </div>
                  <div className="absolute inset-0 rounded-full blur-md opacity-30"
                    style={{backgroundColor:step.color}}/>
                </div>

                {/* Content */}
                <div className="flex-1 lg:flex-none lg:px-1">
                  <div className="flex items-center gap-2 lg:justify-center lg:mb-1">
                    <span className="text-[10px] font-bold" style={{color:step.color}}>{step.num}</span>
                    <span className="text-[10px] text-[#334155] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 mt-0.5">{step.title}</h3>
                  <p className="text-[11px] text-[#64748B] leading-relaxed hidden lg:block">{step.desc}</p>
                  <p className="text-xs text-[#64748B] leading-relaxed lg:hidden">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{delay:0.4}} className="text-center mt-14">
          <div className="glass-card inline-flex items-center gap-4 px-6 py-4">
            <div className="text-sm text-[#94A3B8]">
              Most projects go from <span className="text-white font-semibold">consultation to live</span> in{" "}
              <span className="text-primary font-semibold">under 2 weeks</span>
            </div>
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5 flex-shrink-0">
              Start the Process
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
