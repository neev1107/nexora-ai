"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, ArrowRight, Bot, MessageCircle, TrendingUp, Settings, Calendar, Mail, FileSpreadsheet, Workflow, X, CheckCircle2 } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const demos = [
  {
    id: "chatbot",
    icon: Bot,
    color: "#4F46E5",
    title: "AI Coaching Institute Chatbot",
    category: "Education",
    problem: "Admissions staff spend hours answering the same questions about courses, fees, and schedules — missing real leads in the process.",
    automation: "An AI chatbot on WhatsApp & website that answers every query 24/7, qualifies leads by asking the right questions, and books free demo classes automatically.",
    result: "Your team only talks to students who are already interested and pre-qualified — zero wasted time.",
    platforms: ["WhatsApp Business API", "Website Widget", "Google Sheets"],
    preview: [
      { from: "user", msg: "Hi, what courses do you offer?" },
      { from: "bot", msg: "Hi! Welcome to our institute 🎓 We offer JEE, NEET, and Foundation batches. Are you looking for yourself or your child?" },
      { from: "user", msg: "For my son, he's in class 10" },
      { from: "bot", msg: "Perfect! We have excellent Foundation batches for Class 10. Would you like to book a FREE demo class this week? 📅" },
    ],
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    color: "#25D366",
    title: "WhatsApp Customer Support Bot",
    category: "Customer Service",
    problem: "Support teams get flooded with repetitive questions about orders, delivery, and refunds — burning hours on low-value work.",
    automation: "A WhatsApp bot that handles FAQs, order tracking, and escalations automatically. Only complex issues reach your team.",
    result: "80% of support queries resolved without human involvement. Your team handles only what truly needs attention.",
    platforms: ["WhatsApp Business API", "CRM Integration", "Order Management"],
    preview: [
      { from: "user", msg: "Where is my order #4521?" },
      { from: "bot", msg: "Hi! Let me check order #4521 for you instantly 🔍" },
      { from: "bot", msg: "Your order is out for delivery and expected by 5 PM today. Track it here: [link]" },
      { from: "user", msg: "Thank you!" },
    ],
  },
  {
    id: "leadgen",
    icon: TrendingUp,
    color: "#06B6D4",
    title: "Lead Generation Automation",
    category: "Sales",
    problem: "Businesses run ads but manually collect leads, reply hours later, and lose prospects to competitors who respond faster.",
    automation: "Leads from Facebook/Instagram Ads are captured, instantly messaged on WhatsApp, added to a CRM, and scheduled for a follow-up call — all within 60 seconds.",
    result: "Every lead gets a response in under 1 minute, 24/7 — dramatically improving conversion rates without extra staff.",
    platforms: ["Facebook Ads", "WhatsApp API", "Google Sheets / CRM"],
    preview: [
      { from: "bot", msg: "Hi Rahul! 👋 Thanks for your interest in our solar panels. I'm from SunBright Solar." },
      { from: "bot", msg: "Can I ask — are you looking for residential or commercial solar installation?" },
      { from: "user", msg: "Residential, for my home" },
      { from: "bot", msg: "Great! Our residential packages start at ₹1.8 lakhs. Our expert will call you within 2 hours for a free site assessment. Does 3 PM work today? ☀️" },
    ],
  },
  {
    id: "crm",
    icon: Settings,
    color: "#8B5CF6",
    title: "CRM Automation",
    category: "Operations",
    problem: "Sales teams manually update CRMs, forget follow-ups, and lose deals due to poor pipeline visibility.",
    automation: "Every lead auto-enters your CRM with source, contact info, and stage. Follow-up reminders are set automatically. Pipeline reports generate themselves.",
    result: "Sales team spends 100% of time selling — not data entry. No lead falls through the cracks.",
    platforms: ["Zoho CRM", "HubSpot", "Google Sheets", "n8n"],
    preview: [
      { from: "bot", msg: "📥 New Lead: Priya Mehta | Real Estate | Source: Instagram Ad" },
      { from: "bot", msg: "✅ CRM updated · WhatsApp sent · Follow-up scheduled for Tuesday 11 AM" },
      { from: "bot", msg: "📊 Today's pipeline: 12 new leads · 5 follow-ups due · 2 demos booked" },
      { from: "bot", msg: "🔔 Reminder: Follow up with Rajesh Kumar — hasn't replied in 3 days" },
    ],
  },
  {
    id: "booking",
    icon: Calendar,
    color: "#F59E0B",
    title: "Appointment Booking Assistant",
    category: "Healthcare / Services",
    problem: "Clinic receptionists spend hours booking appointments, sending reminders, and managing cancellations via phone calls.",
    automation: "Patients book appointments through WhatsApp or website chatbot. Reminders sent automatically 24h and 1h before. Reschedules handled without staff.",
    result: "Fewer no-shows, zero phone tag, and receptionists freed for in-clinic patient care.",
    platforms: ["WhatsApp", "Google Calendar", "Website Widget"],
    preview: [
      { from: "user", msg: "I need to book an appointment with Dr. Sharma" },
      { from: "bot", msg: "Of course! Dr. Sharma has slots available on Thursday at 11 AM, 2 PM, and 4 PM. Which works for you?" },
      { from: "user", msg: "4 PM please" },
      { from: "bot", msg: "✅ Booked! Thursday at 4 PM with Dr. Sharma. You'll receive a reminder 1 hour before. Reply CANCEL to reschedule anytime." },
    ],
  },
  {
    id: "email",
    icon: Mail,
    color: "#EF4444",
    title: "Email Automation Sequences",
    category: "Marketing",
    problem: "Businesses collect emails but never follow up consistently — leads go cold and potential revenue is lost.",
    automation: "Automated email sequences that nurture leads over days and weeks: welcome → value → offer → follow-up. Personalized based on what the lead clicked.",
    result: "Leads stay warm without manual effort. Sales conversations happen naturally when prospects are ready.",
    platforms: ["Brevo", "Mailchimp", "Gmail", "n8n"],
    preview: [
      { from: "bot", msg: "Day 1 — Welcome email sent to 47 new subscribers ✅" },
      { from: "bot", msg: "Day 3 — 'How AI saves 10 hrs/week' email sent · 64% open rate" },
      { from: "bot", msg: "Day 7 — Offer email sent · 3 consultation bookings received" },
      { from: "bot", msg: "Day 14 — Follow-up to unopened · 6 more opens triggered" },
    ],
  },
  {
    id: "sheets",
    icon: FileSpreadsheet,
    color: "#10B981",
    title: "Google Sheets Workflow",
    category: "Operations",
    problem: "Data scattered across WhatsApp, email, and paper. Manual copying wastes hours and creates errors.",
    automation: "All leads, orders, and customer data flow automatically into Google Sheets — organized, formatted, and ready to use. Alerts sent when new entries arrive.",
    result: "One source of truth for your business. No manual data entry. Everyone works from live, accurate data.",
    platforms: ["Google Sheets", "Google Apps Script", "WhatsApp", "Email"],
    preview: [
      { from: "bot", msg: "📊 New entry: Vikram Singh · Real Estate Lead · +91 98765 43210 · Budget ₹80L" },
      { from: "bot", msg: "✅ Added to Sheet 'Leads Nov 2024' · Row 47 · Status: New" },
      { from: "bot", msg: "📧 Notification sent to sales@company.com" },
      { from: "bot", msg: "📱 WhatsApp sent to Vikram with property brochure" },
    ],
  },
  {
    id: "n8n",
    icon: Workflow,
    color: "#06B6D4",
    title: "n8n Business Automation",
    category: "Advanced Workflows",
    problem: "Complex multi-step business processes require connecting many tools — difficult to manage manually and expensive to outsource.",
    automation: "Visual n8n workflows that connect your existing tools — CRM, email, WhatsApp, payment gateway, inventory — into one seamless automated process.",
    result: "Entire business processes run on autopilot. Adding a new automation step takes minutes, not weeks.",
    platforms: ["n8n", "Zapier", "Make (Integromat)", "All major APIs"],
    preview: [
      { from: "bot", msg: "🔄 Workflow triggered: New payment received via Razorpay" },
      { from: "bot", msg: "✅ Invoice generated · PDF emailed to customer · CRM updated" },
      { from: "bot", msg: "✅ Inventory decremented · Team notified via WhatsApp group" },
      { from: "bot", msg: "✅ Accounting sheet updated · Customer added to loyalty program" },
    ],
  },
];

function ChatPreview({ messages, color }: { messages: typeof demos[0]["preview"]; color: string }) {
  return (
    <div className="space-y-2 p-4 bg-[#0a1020] rounded-xl border border-white/[0.05]">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.05]">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
        <span className="text-[10px] text-[#475569] font-medium">LIVE CONVERSATION PREVIEW</span>
      </div>
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
            m.from === "user"
              ? "bg-[#1e2435] text-[#CBD5E1]"
              : "text-white"
          }`} style={m.from === "bot" ? { backgroundColor: `${color}20`, border: `1px solid ${color}30` } : {}}>
            {m.msg}
          </div>
        </div>
      ))}
    </div>
  );
}

function DemoModal({ demo, onClose }: { demo: typeof demos[0]; onClose: () => void }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}>
      <motion.div initial={{scale:0.88,opacity:0,y:24}} animate={{scale:1,opacity:1,y:0}}
        exit={{scale:0.88,opacity:0}} transition={{type:"spring",stiffness:340,damping:28}}
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={e=>e.stopPropagation()}>
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
          style={{background:`linear-gradient(90deg,transparent,${demo.color},transparent)`}}/>
        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{backgroundColor:`${demo.color}15`}}>
                <demo.icon className="w-5 h-5" style={{color:demo.color}}/>
              </div>
              <div>
                <div className="text-xs text-[#475569] uppercase tracking-wider font-medium">{demo.category}</div>
                <h3 className="text-lg font-bold text-white" style={{fontFamily:"Space Grotesk"}}>{demo.title}</h3>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white transition-colors">
              <X className="w-4 h-4"/>
            </button>
          </div>

          <div className="space-y-5 mb-6">
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">The Problem</div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{demo.problem}</p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">The Automation</div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{demo.automation}</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-4">
              <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">The Result</div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{demo.result}</p>
            </div>
          </div>

          <ChatPreview messages={demo.preview} color={demo.color}/>

          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            {demo.platforms.map(p=>(
              <span key={p} className="tag text-[10px]"
                style={{backgroundColor:`${demo.color}15`,color:demo.color,border:`1px solid ${demo.color}25`}}>
                {p}
              </span>
            ))}
          </div>

          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Nexora AI, I'm interested in the ${demo.title} automation for my business. Can we discuss?`)}`}
            target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
            Get This Automation Built
            <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<typeof demos[0] | null>(null);

  return (
    <section id="demos" className="section-padding relative overflow-hidden bg-[#030610]">
      <div className="absolute inset-0 grid-bg opacity-15"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-accent/40 bg-accent/10 text-accent inline-flex mb-4">
            <Play className="w-3.5 h-3.5"/>
            <span>Live Automation Demos</span>
          </div>
          <h2 className="section-title text-white mb-4">
            See Exactly What We <span className="gradient-text">Build for You</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Not mockups. Not stock images. Real automation flows we build for businesses like yours.
            Click any demo to see the full problem → solution → result breakdown.
          </p>
        </motion.div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {demos.map((demo, i) => (
            <motion.div key={demo.id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:(i%4)*0.07,duration:0.5}}
              className="glass-card p-5 group cursor-pointer relative overflow-hidden glass-card-hover"
              onClick={()=>setActiveDemo(demo)}>
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{background:`linear-gradient(90deg,transparent,${demo.color},transparent)`}}/>

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{backgroundColor:`${demo.color}15`}}>
                <demo.icon className="w-5 h-5" style={{color:demo.color}}/>
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{color:demo.color}}>
                {demo.category}
              </div>
              <h3 className="text-sm font-bold text-white mb-3 leading-snug">{demo.title}</h3>

              {/* Mini flow */}
              <div className="space-y-1.5 mb-4">
                {["Problem","Automation","Result"].map((step,si)=>(
                  <div key={step} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{backgroundColor:demo.color}}/>
                    <span className="text-[10px] text-[#475569]">{step}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                style={{color:demo.color}}>
                <Play className="w-3 h-3"/> View Demo
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
          transition={{delay:0.3}} className="text-center text-sm text-[#475569] mt-10">
          All demos show real automation flows. Want one built for your business?{" "}
          <a href="#contact" className="text-primary hover:underline">Let&apos;s talk →</a>
        </motion.p>
      </div>

      <AnimatePresence>
        {activeDemo && <DemoModal demo={activeDemo} onClose={()=>setActiveDemo(null)}/>}
      </AnimatePresence>
    </section>
  );
}
