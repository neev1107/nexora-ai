"use client";

import { motion } from "framer-motion";
import { Wrench, User, Cpu, Zap, DollarSign, TrendingUp, RefreshCw, Target, CheckCircle2, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: Wrench,
    title: "Every system is custom-built",
    description: "We don't use templates or one-size-fits-all tools. Every automation is designed specifically for how your business works.",
    color: "#4F46E5",
  },
  {
    icon: User,
    title: "Direct founder communication",
    description: "You speak directly with the person building your automation — no account managers, no hand-offs, no miscommunication.",
    color: "#06B6D4",
  },
  {
    icon: Cpu,
    title: "Modern AI tools",
    description: "We use the latest AI models (GPT-4, Claude), automation platforms (n8n, Make), and APIs to build future-ready systems.",
    color: "#8B5CF6",
  },
  {
    icon: Zap,
    title: "Fast delivery",
    description: "Most automations are live within 3–10 days. We move fast because your time is valuable and delays cost you money.",
    color: "#F59E0B",
  },
  {
    icon: DollarSign,
    title: "Transparent pricing",
    description: "Fixed project prices quoted upfront. No hourly billing surprises, no hidden fees, no ongoing retainers unless you want them.",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    title: "Built to scale",
    description: "Systems designed to handle 10x your current volume. As your business grows, your automation grows with it.",
    color: "#EF4444",
  },
  {
    icon: RefreshCw,
    title: "Easy to update",
    description: "We document everything and build systems that are easy to modify. You're never locked into something you can't change.",
    color: "#06B6D4",
  },
  {
    icon: Target,
    title: "Business-outcome focused",
    description: "We measure success by real business results — time saved, leads converted, support tickets reduced — not technical metrics.",
    color: "#8B5CF6",
  },
];

const comparisonData = {
  without: [
    "Hours spent on repetitive tasks daily",
    "Leads go cold waiting for manual replies",
    "Data scattered across WhatsApp and spreadsheets",
    "Missed follow-ups mean lost revenue",
    "Team burns out on low-value work",
    "Business stops when you're offline",
  ],
  with: [
    "Repetitive tasks run automatically, 24/7",
    "Every lead gets an instant, personalized reply",
    "All data organized and synced automatically",
    "Every follow-up happens on time, without reminders",
    "Team focuses only on high-value, creative work",
    "Business keeps running while you sleep",
  ],
};

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose */}
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-secondary/40 bg-secondary/10 text-secondary inline-flex mb-4">
            <CheckCircle2 className="w-3.5 h-3.5"/>
            <span>Why Nexora AI</span>
          </div>
          <h2 className="section-title text-white mb-4">
            What Makes Us <span className="gradient-text">Different</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We&apos;re a focused, founder-led automation agency. That means faster decisions,
            better communication, and solutions built specifically for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:(i%4)*0.07,duration:0.5}}
              className="glass-card glass-card-hover p-5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{backgroundColor:`${r.color}15`}}>
                <r.icon className="w-5 h-5" style={{color:r.color}}/>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Before / After comparison */}
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="mb-6 text-center">
          <h2 className="section-title text-white mb-4">
            Your Business <span className="gradient-text">Before vs After</span> Automation
          </h2>
          <p className="section-subtitle mx-auto mb-12">
            Not a comparison of agencies. A comparison of how your own business operates
            — without automation vs. with it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Without */}
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.6}}>
            <div className="glass-card p-6 h-full border-red-500/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                  <span className="text-red-400 text-lg font-bold">✗</span>
                </div>
                <div>
                  <div className="text-xs text-[#475569] uppercase tracking-wider font-medium">Without Automation</div>
                  <div className="text-sm font-bold text-white">Manual Business Operations</div>
                </div>
              </div>
              <div className="space-y-3">
                {comparisonData.without.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs">✗</span>
                    </div>
                    <span className="text-sm text-[#94A3B8]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* With */}
          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.6}}>
            <div className="glass-card p-6 h-full border-green-500/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
                  <span className="text-green-400 text-lg font-bold">✓</span>
                </div>
                <div>
                  <div className="text-xs text-[#475569] uppercase tracking-wider font-medium">With Nexora AI</div>
                  <div className="text-sm font-bold text-white">Automated Business Operations</div>
                </div>
              </div>
              <div className="space-y-3">
                {comparisonData.with.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-green-400"/>
                    </div>
                    <span className="text-sm text-[#CBD5E1]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{delay:0.3}} className="text-center mt-10">
          <a href="#contact" className="btn-primary">
            Start Automating My Business
            <ArrowRight className="w-4 h-4"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
