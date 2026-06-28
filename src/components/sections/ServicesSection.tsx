"use client";

import { motion } from "framer-motion";
import { Bot, MessageCircle, TrendingUp, Settings, Calendar, Mail, Workflow, Headphones, GitBranch, Brain, ArrowRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    problem: "Customers ask the same questions all day while your team handles other work",
    description: "Intelligent chatbots that handle enquiries, qualify leads, share information, and book appointments — 24 hours a day, 7 days a week.",
    outcome: "Your team only handles genuine conversations that need a human touch",
    platforms: ["Website Widget", "WhatsApp", "Instagram DM"],
    color: "#4F46E5",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    problem: "Hours spent sending the same messages to leads, customers, and follow-ups",
    description: "Automated WhatsApp sequences: instant lead replies, order updates, appointment reminders, follow-up campaigns, and broadcast messages.",
    outcome: "Every customer gets instant, personalized communication without manual effort",
    platforms: ["WhatsApp Business API", "Meta Cloud API"],
    color: "#25D366",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation Automation",
    problem: "Leads from ads go cold because nobody follows up fast enough",
    description: "Capture leads from any source, instantly send personalized WhatsApp/email messages, qualify them automatically, and route hot leads to your sales team.",
    outcome: "Every lead contacted in under 60 seconds — even at 2 AM on a Sunday",
    platforms: ["Facebook Ads", "Instagram", "Google Ads", "Landing Pages"],
    color: "#06B6D4",
  },
  {
    icon: Settings,
    title: "CRM Automation",
    problem: "Sales data lives in WhatsApp chats, spreadsheets, and team members' heads",
    description: "Automatic lead entry, stage updates, follow-up reminders, and pipeline reports. Your CRM stays up to date without anyone touching it.",
    outcome: "Complete visibility into your sales pipeline with zero manual data entry",
    platforms: ["Zoho", "HubSpot", "Google Sheets", "Freshsales"],
    color: "#8B5CF6",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    problem: "Staff spend hours coordinating appointments via calls and WhatsApp messages",
    description: "Customers book, reschedule, and cancel appointments through WhatsApp or your website. Reminders sent automatically. Zero phone tag.",
    outcome: "Fewer no-shows, no double bookings, staff freed for actual work",
    platforms: ["Google Calendar", "WhatsApp", "Website Widget"],
    color: "#F59E0B",
  },
  {
    icon: Mail,
    title: "Email Automation",
    problem: "Leads collected but never nurtured — they forget about you and buy elsewhere",
    description: "Automated email sequences that welcome, educate, and convert leads over days and weeks — triggered by what they clicked, opened, or did.",
    outcome: "Consistent follow-up that converts leads on their timeline, not yours",
    platforms: ["Brevo", "Mailchimp", "Gmail", "ConvertKit"],
    color: "#EF4444",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    problem: "Business processes involve 5 tools and 10 manual steps that nobody enjoys doing",
    description: "Connect your existing tools into automated workflows. New order → update inventory → notify team → email customer → update accounts. One trigger, everything happens.",
    outcome: "Multi-step processes that run themselves, reducing errors and saving hours daily",
    platforms: ["n8n", "Make", "Zapier", "Custom API"],
    color: "#10B981",
  },
  {
    icon: Headphones,
    title: "Customer Support AI",
    problem: "Support team overwhelmed with repetitive tickets and basic questions",
    description: "AI that resolves common support queries instantly — order status, FAQs, refund policies, product information — and escalates complex issues to humans.",
    outcome: "80% of support queries resolved automatically. Team handles only what needs them.",
    platforms: ["WhatsApp", "Website Chat", "Email", "CRM"],
    color: "#06B6D4",
  },
  {
    icon: GitBranch,
    title: "n8n Automation",
    problem: "Every tool in your business works in a silo — data doesn't flow between them",
    description: "Self-hosted n8n workflows that connect everything: payments, inventory, CRM, communication, accounting. Visual, flexible, and completely under your control.",
    outcome: "Your entire business connected and automated — no monthly SaaS fees, full data ownership",
    platforms: ["n8n (self-hosted)", "All major APIs", "Webhooks"],
    color: "#8B5CF6",
  },
  {
    icon: Brain,
    title: "Custom AI Agents",
    problem: "Generic tools don't understand your business, industry, or the way you work",
    description: "AI agents trained on your specific business knowledge — your products, policies, FAQs, and processes. They think and respond like a trained team member.",
    outcome: "An AI that knows your business deeply and represents it accurately to every customer",
    platforms: ["OpenAI", "Claude API", "Custom Training", "RAG Systems"],
    color: "#4F46E5",
    tag: "Advanced",
  },
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-[#030610]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none"
        style={{background:"radial-gradient(circle,#8B5CF6 0%,transparent 70%)"}}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-4">
            <Bot className="w-3.5 h-3.5"/>
            <span>What We Build</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Automation Solutions That <span className="gradient-text">Solve Real Problems</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Every service starts with a business problem. We identify it, build the right automation,
            and measure it by the outcome it creates for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((svc, i) => (
            <motion.div key={svc.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:(i%4)*0.07,duration:0.5}}
              className="glass-card p-5 group cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-white/15"
              onClick={()=>setExpanded(expanded===svc.title?null:svc.title)}>
              {svc.tag && (
                <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{backgroundColor:`${svc.color}20`,color:svc.color,border:`1px solid ${svc.color}30`}}>
                  {svc.tag}
                </div>
              )}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{backgroundColor:`${svc.color}15`}}>
                <svc.icon className="w-5 h-5" style={{color:svc.color}}/>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{svc.title}</h3>

              {/* Problem highlight */}
              <div className="text-[11px] text-[#64748B] leading-relaxed mb-3 italic">
                &ldquo;{svc.problem}&rdquo;
              </div>

              {expanded === svc.title ? (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">{svc.description}</p>
                  <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3 mb-3">
                    <div className="text-[10px] font-semibold text-green-400 mb-1">OUTCOME</div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{svc.outcome}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.platforms.map(p=>(
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{backgroundColor:`${svc.color}15`,color:svc.color,border:`1px solid ${svc.color}20`}}>
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity" style={{color:svc.color}}>
                  See details <ArrowRight className="w-3 h-3"/>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"
                style={{background:`linear-gradient(90deg,transparent,${svc.color},transparent)`}}/>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{delay:0.3}} className="text-center mt-12">
          <p className="text-sm text-[#475569] mb-4">Not sure which automation is right for you?</p>
          <a href="#contact" className="btn-primary">
            Get a Free Automation Audit
            <ArrowRight className="w-4 h-4"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
