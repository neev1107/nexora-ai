"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Clock, CheckCircle2 } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const benefits = [
  "Discover which processes to automate first",
  "Get a custom automation roadmap for your business",
  "See exact ROI projections with real numbers",
  "No commitment. No sales pitch. Just strategy.",
];

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Show after 45 seconds regardless
    const timer = setTimeout(() => {
      if (!triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
      }
    }, 45000);

    // Exit intent detection (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="glass-card max-w-md w-full p-0 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div
              className="h-1"
              style={{
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #06B6D4)",
              }}
            />

            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8">
              {/* Badge */}
              <div className="badge border-primary/40 bg-primary/10 text-primary inline-flex mb-5 text-xs">
                <Clock className="w-3 h-3" />
                <span>Limited Free Spots Available</span>
              </div>

              {/* Heading */}
              <h3
                className="text-2xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "Space Grotesk" }}
              >
                Get a Free AI Automation{" "}
                <span className="gradient-text">Strategy Call</span>
              </h3>

              <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
                Before you leave — book a free 30-minute strategy call and discover
                exactly how AI can grow your business.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#CBD5E1]">{b}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={dismiss}
                  className="btn-primary justify-center"
                >
                  <Rocket className="w-4 h-4" />
                  Claim My Free Strategy Call
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Nexora AI, I'd like to book a free AI automation strategy call.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold hover:bg-green-500/20 transition-all"
                >
                  Book via WhatsApp Instead
                </a>
                <button
                  onClick={dismiss}
                  className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors py-1"
                >
                  No thanks, I&apos;ll pass for now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
