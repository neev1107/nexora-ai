"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Instagram, Clock, CheckCircle2, X,
  Send, Loader2, MessageCircle, Sparkles, User,
} from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_NUMBER, BUSINESS_EMAIL, BUSINESS_PHONE, openWhatsApp } from "@/lib/utils";
import type { FormData } from "@/types";

const businessTypes = [
  "E-Commerce / Retail","Real Estate","Education / Coaching","Healthcare / Clinic",
  "Solar / Energy","Restaurant / Food","IT / Software","Finance / Insurance",
  "Manufacturing","Hospitality / Travel","Beauty / Wellness","Other",
];
const packageOptions = [
  "Basic Package — ₹10,000","Standard Package — ₹20,000","Premium Package — ₹35,000",
  "Custom Enterprise","Not Sure Yet — Need Consultation",
];
const budgetOptions = [
  "Under ₹10,000","₹10,000 – ₹25,000","₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000","Above ₹1,00,000","Flexible",
];

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

function SuccessPopup({ onClose, name }: { onClose: () => void; name: string }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{scale:0.82,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
        exit={{scale:0.82,opacity:0}} transition={{type:"spring",stiffness:400,damping:30}}
        className="glass-card p-8 max-w-md w-full text-center relative" onClick={e=>e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all">
          <X className="w-4 h-4"/>
        </button>
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-400"/>
        </div>
        <h3 className="text-xl font-bold text-white mb-2" style={{fontFamily:"Space Grotesk"}}>
          Enquiry Received! 🎉
        </h3>
        <p className="text-sm text-[#94A3B8] mb-2">
          Thank you, <span className="text-white font-medium">{name}</span>!
        </p>
        <p className="text-sm text-[#94A3B8] mb-6">
          Your enquiry is submitted. Redirecting you to WhatsApp so we can connect right away.
          I personally review every message and respond within 24 hours.
        </p>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6 text-left">
          <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0"/>
          <span className="text-xs text-[#94A3B8]">
            Opening WhatsApp with your details pre-filled so we can start the conversation instantly.
          </span>
        </div>
        <button onClick={onClose} className="btn-primary w-full justify-center">Continue</button>
      </motion.div>
    </motion.div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName:"", companyName:"", email:"", phone:"",
    businessType:"", selectedPackage:"", requirements:"", budget:"",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      const pkgMap: Record<string,string> = {
        Basic:"Basic Package — ₹10,000",
        Standard:"Standard Package — ₹20,000",
        Premium:"Premium Package — ₹35,000",
      };
      setFormData(prev=>({...prev,selectedPackage:pkgMap[e.detail]||prev.selectedPackage}));
    };
    window.addEventListener("selectPackage",handler as EventListener);
    return ()=>window.removeEventListener("selectPackage",handler as EventListener);
  },[]);

  const validate = useCallback(():boolean => {
    const e: Partial<FormData>={};
    if(!formData.fullName.trim()) e.fullName="Name is required";
    if(!formData.email.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email="Valid email required";
    if(!formData.phone.trim()||!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g,""))) e.phone="Valid 10-digit mobile number required";
    if(!formData.businessType) e.businessType="Please select business type";
    if(!formData.selectedPackage) e.selectedPackage="Please select a package";
    if(!formData.requirements.trim()||formData.requirements.trim().length<20) e.requirements="Please describe your requirements (min 20 chars)";
    setErrors(e);
    return Object.keys(e).length===0;
  },[formData]);

  const submitToSheets = async (data: FormData) => {
    if(!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL,{
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...data,timestamp:new Date().toISOString()}),
      });
    } catch(err){ console.error("Sheets error:",err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!validate()) return;
    setSubmitting(true);
    try {
      await submitToSheets(formData);
      setShowSuccess(true);
      setTimeout(()=>{
        openWhatsApp({
          name:formData.fullName, company:formData.companyName||"N/A",
          phone:formData.phone, email:formData.email,
          packageName:formData.selectedPackage, requirements:formData.requirements,
        });
      },2000);
      setFormData({fullName:"",companyName:"",email:"",phone:"",businessType:"",selectedPackage:"",requirements:"",budget:""});
    } catch(err){ console.error(err); }
    finally{ setSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
    if(errors[name as keyof FormData]) setErrors(prev=>({...prev,[name]:undefined}));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{background:"radial-gradient(ellipse 70% 40% at 50% 100%,rgba(79,70,229,0.3) 0%,transparent 100%)"}}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.7}} className="text-center mb-14">
          <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-4">
            <Sparkles className="w-3.5 h-3.5"/>
            <span>Let&apos;s Talk</span>
          </div>
          <h2 className="section-title text-white mb-4">
            Book a <span className="gradient-text">Free Consultation</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Tell me about your business. I&apos;ll personally review your enquiry and
            respond with a clear plan — no sales pressure, no commitment required.
          </p>
          {/* Founder note */}
          <div className="mt-6 inline-flex items-center gap-3 glass-card px-5 py-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary"/>
            </div>
            <p className="text-sm text-[#94A3B8] text-left">
              <span className="text-white font-medium">I personally review every enquiry</span> and
              usually respond within 24 hours. You&apos;ll speak directly with the founder — not a team member.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left contact info */}
          <motion.div initial={{opacity:0,x:-28}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.7}} className="lg:col-span-2 space-y-4">
            {[
              {icon:Phone,label:"Call / WhatsApp",value:BUSINESS_PHONE,href:`tel:${BUSINESS_PHONE}`,color:"#25D366"},
              {icon:Mail,label:"Email",value:BUSINESS_EMAIL,href:`mailto:${BUSINESS_EMAIL}`,color:"#4F46E5"},
              {icon:Instagram,label:"Instagram",value:"@getnexoraai",href:INSTAGRAM_URL,color:"#E1306C",ext:true},
              {icon:Clock,label:"Response Time",value:"Usually within 24 hours",color:"#06B6D4"},
            ].map(item=>(
              <div key={item.label} className="glass-card p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{backgroundColor:`${item.color}15`}}>
                  <item.icon className="w-5 h-5" style={{color:item.color}}/>
                </div>
                <div>
                  <div className="text-xs text-[#475569] mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target={item.ext?"_blank":undefined}
                      rel={item.ext?"noopener noreferrer":undefined}
                      className="text-sm font-medium text-white hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* What to expect */}
            <div className="glass-card p-5">
              <h4 className="text-sm font-bold text-white mb-4">What happens after you submit:</h4>
              <div className="space-y-3">
                {[
                  {num:"1",text:"I read your message personally and understand your business"},
                  {num:"2",text:"I respond with specific ideas for automating your workflow"},
                  {num:"3",text:"We book a 30-minute call to go deeper — no charge"},
                  {num:"4",text:"If it's a good fit, I send a proposal with exact timelines and pricing"},
                ].map(s=>(
                  <div key={s.num} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-[10px] font-bold">{s.num}</span>
                    </div>
                    <span className="text-xs text-[#94A3B8] leading-relaxed">{s.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WA */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nexora AI, I'd like to discuss AI automation for my business.")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 glass-card p-4 hover:border-green-500/30 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400"/>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Prefer to chat directly?</div>
                <div className="text-xs text-[#475569]">Message on WhatsApp — I&apos;ll reply personally</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:28}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            transition={{duration:0.7}} className="lg:col-span-3">
            <div className="glass-card p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"/>
              <h3 className="text-xl font-bold text-white mb-1" style={{fontFamily:"Space Grotesk"}}>
                Get My Free Consultation
              </h3>
              <p className="text-sm text-[#475569] mb-6">
                No commitment. No sales pitch. Just an honest conversation about your business.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input type="text" name="fullName" value={formData.fullName}
                      onChange={handleChange} placeholder="Rajesh Kumar"
                      className={`form-input ${errors.fullName?"border-red-400/50":""}`}/>
                    {errors.fullName&&<p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName}
                      onChange={handleChange} placeholder="Your Company" className="form-input"/>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      Business Email <span className="text-red-400">*</span>
                    </label>
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="you@company.com"
                      className={`form-input ${errors.email?"border-red-400/50":""}`}/>
                    {errors.email&&<p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <input type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="9876543210"
                      className={`form-input ${errors.phone?"border-red-400/50":""}`}/>
                    {errors.phone&&<p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      Business Type <span className="text-red-400">*</span>
                    </label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange}
                      className={`form-input ${errors.businessType?"border-red-400/50":""}`}>
                      <option value="">Select Business Type</option>
                      {businessTypes.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.businessType&&<p className="text-xs text-red-400 mt-1">{errors.businessType}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                      Interested In <span className="text-red-400">*</span>
                    </label>
                    <select name="selectedPackage" value={formData.selectedPackage} onChange={handleChange}
                      className={`form-input ${errors.selectedPackage?"border-red-400/50":""}`}>
                      <option value="">Select a Package</option>
                      {packageOptions.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.selectedPackage&&<p className="text-xs text-red-400 mt-1">{errors.selectedPackage}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                    What would you like to automate? <span className="text-red-400">*</span>
                  </label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange}
                    rows={4} placeholder="Describe the repetitive tasks or problems you want to solve. The more detail you share, the better advice I can give you."
                    className={`form-input resize-none ${errors.requirements?"border-red-400/50":""}`}/>
                  {errors.requirements&&<p className="text-xs text-red-400 mt-1">{errors.requirements}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                    Budget Range <span className="text-[#475569] font-normal">(Optional)</span>
                  </label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="form-input">
                    <option value="">Select Budget Range</option>
                    {budgetOptions.map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <button type="submit" disabled={submitting}
                  className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin"/>Submitting...</>
                  ) : (
                    <><Send className="w-4 h-4"/>Get My Free Consultation</>
                  )}
                </button>

                <p className="text-center text-xs text-[#475569]">
                  🔒 Your information is private and will never be shared or sold.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess&&<SuccessPopup onClose={()=>setShowSuccess(false)} name={formData.fullName||"there"}/>}
      </AnimatePresence>
    </section>
  );
}
