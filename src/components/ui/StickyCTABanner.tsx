"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export default function StickyCTABanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (dismissed) return;
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setVisible(scrollPct >= 40);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div
            className="pointer-events-auto mx-4 mb-4 max-w-2xl lg:mx-auto rounded-2xl border border-primary/30 overflow-hidden shadow-2xl shadow-primary/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(5,8,22,0.98) 0%, rgba(10,15,46,0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Gradient top border */}
            <div
              className="h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #4F46E5, #8B5CF6, #06B6D4)",
              }}
            />

            <div className="px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
              {/* Icon + text */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div
                    className="text-sm font-bold text-white truncate"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    🚀 Ready to automate your business with AI?
                  </div>
                  <div className="text-xs text-[#64748B] hidden sm:block">
                    Book a free strategy call — no commitment required
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="btn-primary text-xs py-2.5 px-4 flex-1 sm:flex-none justify-center"
                  onClick={() => setDismissed(true)}
                >
                  Book Free Consultation
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nexora AI, I'm interested in automating my business. Can we talk?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-all flex-1 sm:flex-none justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Dismiss */}
              <button
                onClick={() => setDismissed(true)}
                className="absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-[#475569] hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
