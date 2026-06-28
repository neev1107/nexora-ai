"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Demos", href: "#demos" },
  { label: "Process", href: "#process" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6,ease:"easeOut"}}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-[#050816]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20" : "py-5 bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
                <Zap className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xl font-bold text-white" style={{fontFamily:"Space Grotesk, sans-serif"}}>
                Nexora <span className="gradient-text">AI</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link=>(
                <a key={link.href} href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-200"
                aria-label="Instagram">
                <Instagram className="w-4 h-4"/>
              </a>
              <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
                Book Free Consultation
              </a>
            </div>

            <button onClick={()=>setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={()=>setMobileOpen(false)}/>
            <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
              transition={{type:"spring",damping:30,stiffness:300}}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#08101f] border-l border-white/[0.08] flex flex-col p-6 lg:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-white" style={{fontFamily:"Space Grotesk, sans-serif"}}>
                  Nexora <span className="gradient-text">AI</span>
                </span>
                <button onClick={()=>setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white">
                  <X className="w-4 h-4"/>
                </button>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map(link=>(
                  <a key={link.href} href={link.href} onClick={()=>setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-[#94A3B8] hover:text-white rounded-xl hover:bg-white/5 transition-all">
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-pink-500/20 bg-pink-500/5 text-sm font-medium text-pink-400">
                  <Instagram className="w-4 h-4"/> Follow on Instagram
                </a>
                <a href="#contact" onClick={()=>setMobileOpen(false)} className="btn-primary justify-center text-sm">
                  Book Free Consultation
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
