"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Rocket, Award, Code2, HeartHandshake } from "lucide-react";

const badges = [
  { icon: Zap, label: "Custom AI Systems", color: "#4F46E5" },
  { icon: Shield, label: "Secure & Private", color: "#06B6D4" },
  { icon: Rocket, label: "Fast Deployment", color: "#8B5CF6" },
  { icon: Code2, label: "Production-Ready Code", color: "#10B981" },
  { icon: HeartHandshake, label: "Founder-Direct Support", color: "#F59E0B" },
  { icon: Award, label: "No Hidden Costs", color: "#EF4444" },
];

export default function TrustSection() {
  return (
    <section className="py-14 relative overflow-hidden">
      <div className="gradient-divider mb-14"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.6}} className="flex flex-wrap justify-center gap-3">
          {badges.map((b,i)=>(
            <motion.div key={b.label} initial={{opacity:0,scale:0.85}} whileInView={{opacity:1,scale:1}}
              viewport={{once:true}} transition={{delay:i*0.08,duration:0.4}}
              className="flex items-center gap-2.5 glass-card glass-card-hover px-5 py-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{backgroundColor:`${b.color}20`}}>
                <b.icon className="w-3.5 h-3.5" style={{color:b.color}}/>
              </div>
              <span className="text-sm font-medium text-white/90">✓ {b.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="gradient-divider mt-14"/>
    </section>
  );
}
