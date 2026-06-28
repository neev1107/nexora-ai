"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const faqs = [
  {
    q: "How long does it take to build and deploy an automation?",
    a: "It depends on complexity. A WhatsApp chatbot or lead capture automation typically takes 3–5 days. A full CRM + email + WhatsApp integration takes 7–14 days. During your free consultation, we'll give you a specific timeline for your project before any work begins.",
  },
  {
    q: "Do I need technical knowledge to use the automations you build?",
    a: "None at all. We build every system to be easy to manage without technical skills. You'll receive full documentation, a walkthrough video, and step-by-step instructions. If you ever need help, you can WhatsApp us directly.",
  },
  {
    q: "Which platforms and tools do you integrate with?",
    a: "We work with WhatsApp Business API, major CRMs (Zoho, HubSpot, Freshsales), Google Workspace (Sheets, Gmail, Calendar, Drive), email platforms (Brevo, Mailchimp), Facebook and Instagram Ads, Razorpay, Shiprocket, n8n, Make, Zapier, and any platform with an API. If you use a tool, there's a good chance we can connect it.",
  },
  {
    q: "Will I receive support after the automation goes live?",
    a: "Yes. Every project includes post-delivery support — Basic (1 week), Standard (30 days), and Premium (60 days). During this period, any bugs are fixed at no extra cost. After support ends, we offer affordable monthly maintenance plans. You can also reach us via WhatsApp anytime for urgent issues.",
  },
  {
    q: "Can the automations scale as my business grows?",
    a: "That's exactly how we build them. Every system is designed to handle significantly more volume than your current load — so you're not rebuilding every few months. Most automations scale by simply adjusting API limits or subscription tiers on the underlying tools, not by rebuilding the system.",
  },
  {
    q: "How does pricing work? Are there any hidden costs?",
    a: "We charge a fixed project price agreed upfront — no hourly rates, no surprises. The packages (₹10k, ₹20k, ₹35k) are starting points; complex or custom projects are quoted separately. You'll also have small running costs for APIs (like WhatsApp Business API, ~₹0.30 per conversation). We'll give you a full cost breakdown before starting — including estimated monthly running costs.",
  },
  {
    q: "Can you customize the automation specifically for my business?",
    a: "Every automation we build is custom. We start from scratch based on your business processes, brand voice, customer journey, and tools you already use. We don't use generic templates — which means the output actually fits your business rather than forcing your business to fit a template.",
  },
  {
    q: "What happens if something breaks after delivery?",
    a: "During your support period, we fix any issues at no cost, typically within 24 hours. We also monitor critical automations and alert you proactively if something stops working. After support expires, fixes are handled under our maintenance plan or quoted separately — whichever you prefer.",
  },
  {
    q: "I'm not sure which automation I need. Can you help me figure it out?",
    a: "Absolutely — that's what the free consultation is for. Tell us about your business, the tasks taking the most time, and the problems causing the most friction. We'll identify which automation would give you the best return on investment and explain exactly how it would work before you commit to anything.",
  },
  {
    q: "Why should I choose a new agency over a more established one?",
    a: "Fair question. Here's the honest answer: because you'll work directly with the founder who is motivated to deliver exceptional results to build reputation. You won't be handed off to junior staff. You'll get rapid communication, careful attention to your project, and systems built with the latest tools. We price competitively because we're building our portfolio — and we make up for that with quality, speed, and care.",
  },
];

function FAQItem({q,a,idx}:{q:string;a:string;idx:number}) {
  const [open,setOpen]=useState(false);
  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      transition={{delay:idx*0.04,duration:0.4}} className="glass-card overflow-hidden">
      <button onClick={()=>setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all">
        <div className="flex items-start gap-3 pr-4">
          <span className="text-primary text-xs font-bold mt-0.5 flex-shrink-0 font-mono">
            {String(idx+1).padStart(2,"0")}
          </span>
          <span className="text-sm font-medium text-white leading-relaxed">{q}</span>
        </div>
        <motion.div animate={{rotate:open?180:0}} transition={{duration:0.2}}
          className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <ChevronDown className="w-4 h-4 text-[#94A3B8]"/>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
            exit={{height:0,opacity:0}} transition={{duration:0.3,ease:"easeInOut"}}>
            <div className="px-5 pb-5 pl-11">
              <div className="h-px bg-white/[0.05] mb-4"/>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-[#030610]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-4">
            <HelpCircle className="w-3.5 h-3.5"/>
            <span>Honest Answers</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Questions We <span className="gradient-text">Actually Get Asked</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Straight answers to the questions businesses ask before working with us.
            No marketing speak.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f,i)=><FAQItem key={i} q={f.q} a={f.a} idx={i}/>)}
        </div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{delay:0.3}} className="text-center mt-12 glass-card p-7">
          <h3 className="text-base font-semibold text-white mb-2">Have a specific question?</h3>
          <p className="text-sm text-[#64748B] mb-5">
            Ask directly — you&apos;ll get a real answer from the founder, not a bot.
          </p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I have a question about Nexora AI's automation services.")}`}
            target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="w-4 h-4"/>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
