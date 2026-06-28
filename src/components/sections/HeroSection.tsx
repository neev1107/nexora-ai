"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, Zap, Bot, TrendingUp, Clock } from "lucide-react";
import { useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

interface Particle { id:number; x:number; y:number; size:number; opacity:number; speedY:number; speedX:number; color:string; }

function ParticleField() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({length:35},(_,i)=>({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:Math.random()*2.5+1, opacity:Math.random()*0.4+0.1,
      speedY:-(Math.random()*0.018+0.004), speedX:(Math.random()-0.5)*0.008,
      color:["#4F46E5","#8B5CF6","#06B6D4"][Math.floor(Math.random()*3)],
    }))
  );
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef(particles.map(p=>({x:p.x,y:p.y})));
  useAnimationFrame(()=>{
    if(!ref.current) return;
    const children=ref.current.children;
    pos.current=pos.current.map((p,i)=>{
      let {x,y}=p;
      y+=particles[i].speedY; x+=particles[i].speedX;
      if(y<-5)y=105; if(x<-5)x=105; if(x>105)x=-5;
      const el=children[i] as HTMLElement;
      if(el){el.style.left=`${x}%`;el.style.top=`${y}%`;}
      return {x,y};
    });
  });
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p=>(
        <div key={p.id} className="absolute rounded-full" style={{
          left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,
          backgroundColor:p.color,opacity:p.opacity,boxShadow:`0 0 ${p.size*4}px ${p.color}`,
        }}/>
      ))}
    </div>
  );
}

const trustPoints = [
  "Custom-built for your business",
  "Transparent fixed pricing",
  "Direct founder communication",
  "No long-term contracts",
];

const highlights = [
  { icon: Bot, label: "AI Chatbot", sub: "Instant replies", color: "#4F46E5" },
  { icon: TrendingUp, label: "Lead Capture", sub: "Zero missed leads", color: "#06B6D4" },
  { icon: Clock, label: "Time Saved", sub: "Hours daily", color: "#8B5CF6" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] animate-pulse-glow" style={{background:"radial-gradient(circle,rgba(79,70,229,0.28) 0%,transparent 70%)",top:"5%",left:"10%"}}/>
        <div className="glow-orb w-[450px] h-[450px]" style={{background:"radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%)",top:"20%",right:"8%",animationDelay:"2s"}}/>
        <div className="glow-orb w-[350px] h-[350px]" style={{background:"radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)",bottom:"15%",left:"35%",animationDelay:"4s"}}/>
      </div>
      <div className="absolute inset-0 grid-bg opacity-25"/>
      <ParticleField/>

      {/* Rotating ring decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.04]">
        <div className="animate-spin-slow w-full h-full rounded-full border border-primary" style={{borderStyle:"dashed"}}/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
        {/* Badge */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="flex justify-center mb-7">
          <div className="badge border-primary/40 bg-primary/10 text-primary">
            <Zap className="w-3 h-3"/>
            <span>AI Automation Built for Indian Businesses</span>
          </div>
        </motion.div>

        {/* Headline — outcome focused */}
        <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}}
          className="section-title text-white mb-5" style={{fontSize:"clamp(2.2rem,5vw,3.8rem)"}}>
          Stop Doing Repetitive Work.<br/>
          <span className="shimmer-text">Let AI Handle It.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}
          className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8 leading-relaxed">
          We build custom AI automation systems for small and medium businesses in India —
          so your team can stop chasing leads, replying manually, and entering data —
          and start <span className="text-white font-medium">focusing on growth</span>.
        </motion.p>

        {/* Trust points */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.28}}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {trustPoints.map(pt=>(
            <div key={pt} className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0"/>
              <span>{pt}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.35}}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#contact" className="btn-primary text-base">
            Book a Free Consultation
            <ArrowRight className="w-4 h-4"/>
          </a>
          <a href="#demos" className="btn-secondary text-base">
            <Play className="w-4 h-4"/>
            View Live Demos
          </a>
        </motion.div>

        {/* Highlight cards */}
        <motion.div initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.45}}
          className="flex flex-wrap justify-center gap-4 mb-14">
          {highlights.map((h,i)=>(
            <div key={h.label} className="glass-card px-5 py-3.5 flex items-center gap-3 animate-float"
              style={{animationDelay:`${i*0.3}s`}}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{backgroundColor:`${h.color}20`,boxShadow:`0 0 14px ${h.color}40`}}>
                <h.icon className="w-4 h-4" style={{color:h.color}}/>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{h.label}</div>
                <div className="text-xs text-[#64748B]">{h.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Workflow animation preview */}
        <motion.div initial={{opacity:0,y:50,scale:0.96}} animate={{opacity:1,y:0,scale:1}}
          transition={{duration:1,delay:0.55,ease:"easeOut"}}
          className="relative max-w-4xl mx-auto">
          <div className="glass-card p-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"/>
            <div className="bg-[#0c1120] rounded-xl overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"/>
                </div>
                <div className="flex-1 mx-4 bg-white/[0.04] rounded-md px-3 py-1 text-xs text-[#475569] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                  Automation Dashboard · nexoraai.in
                </div>
              </div>
              {/* Dashboard */}
              <div className="p-5 grid grid-cols-12 gap-4 min-h-[260px]">
                {/* Sidebar */}
                <div className="col-span-3 hidden sm:block space-y-1">
                  <div className="text-[10px] text-[#334155] uppercase tracking-widest mb-2 font-semibold">Automations</div>
                  {["WhatsApp Bot","Lead Capture","CRM Sync","Email Flow","Follow-up"].map((item,i)=>(
                    <div key={item} className={`px-3 py-2 rounded-lg text-xs transition-all ${i===0?"bg-primary/20 text-primary border border-primary/20":"text-[#475569] hover:bg-white/5"}`}>
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div className="col-span-12 sm:col-span-9 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {label:"Leads Today",val:"Live",color:"#4F46E5"},
                      {label:"Auto-Replies",val:"Active",color:"#06B6D4"},
                      {label:"CRM Entries",val:"Synced",color:"#8B5CF6"},
                    ].map(s=>(
                      <div key={s.label} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                        <div className="text-[9px] text-[#475569] mb-1">{s.label}</div>
                        <div className="text-sm font-bold flex items-center gap-1.5" style={{color:s.color,fontFamily:"Space Grotesk"}}>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor:s.color}}/>
                          {s.val}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Workflow */}
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                    <div className="text-[10px] text-[#475569] mb-3">Live Automation Flow</div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {["New Lead","WhatsApp Sent","CRM Updated","Follow-up Scheduled","Deal Closed"].map((step,i)=>(
                        <div key={step} className="flex items-center gap-2 flex-shrink-0">
                          <div className="bg-primary/20 border border-primary/30 rounded-lg px-2.5 py-1.5 text-[10px] text-primary font-medium whitespace-nowrap">
                            {step}
                          </div>
                          {i<4&&<div className="text-[#334155] text-xs">→</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-primary/15 blur-3xl"/>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050816] to-transparent"/>
    </section>
  );
}
