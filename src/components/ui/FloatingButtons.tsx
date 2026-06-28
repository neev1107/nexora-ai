"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, ArrowUp } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/utils";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            onMouseEnter={() => setTooltip("scroll-top")}
            onMouseLeave={() => setTooltip(null)}
            className="relative w-12 h-12 rounded-2xl bg-[#0d1424] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/10 transition-all shadow-lg shadow-black/20 hover:shadow-black/40 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
            {tooltip === "scroll-top" && (
              <div className="absolute right-full mr-2 bg-[#0d1424] border border-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                Back to Top
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Instagram button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip("instagram")}
        onMouseLeave={() => setTooltip(null)}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:-translate-y-1 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
          boxShadow: "0 4px 20px rgba(253,29,29,0.3)",
        }}
        aria-label="Follow on Instagram"
      >
        <Instagram className="w-6 h-6" />
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-2xl animate-ping opacity-20"
          style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d)" }}
        />
        {/* Tooltip */}
        {tooltip === "instagram" && (
          <div className="absolute right-full mr-3 bg-[#0d1424] border border-white/10 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-xl">
            <div className="font-semibold">Follow Nexora AI</div>
            <div className="text-[#64748B]">@getnexoraai</div>
          </div>
        )}
      </motion.a>

      {/* WhatsApp button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nexora AI, I'd like to learn more about your AI automation services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip("whatsapp")}
        onMouseLeave={() => setTooltip(null)}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:-translate-y-1 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-green-400" />
        {/* Online dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-green-500 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </span>
        {/* Tooltip */}
        {tooltip === "whatsapp" && (
          <div className="absolute right-full mr-3 bg-[#0d1424] border border-white/10 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap shadow-xl">
            <div className="font-semibold">Chat on WhatsApp</div>
            <div className="text-[#64748B]">Typically replies in minutes</div>
          </div>
        )}
      </motion.a>
    </div>
  );
}
