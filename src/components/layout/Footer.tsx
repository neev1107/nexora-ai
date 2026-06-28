"use client";

import { motion } from "framer-motion";
import { Zap, Phone, Mail, Instagram, MessageCircle, ArrowUp, ExternalLink } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_NUMBER, BUSINESS_EMAIL, BUSINESS_PHONE } from "@/lib/utils";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Nexora AI", href: "#why-us" },
  { label: "Packages", href: "#packages" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "AI Chatbots",
  "WhatsApp Automation",
  "CRM Automation",
  "Lead Generation AI",
  "Follow-up Automation",
  "AI Voice Assistants",
  "Business Workflow",
  "API Integrations",
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#030610] border-t border-white/[0.06]">
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.5), rgba(139,92,246,0.5), transparent)" }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #4F46E5 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Nexora <span className="gradient-text">AI</span>
              </span>
            </a>

            <p className="text-sm text-[#64748B] leading-relaxed mb-6 max-w-xs">
              Automate Smarter. Scale Faster. We build intelligent AI systems
              that grow your business on autopilot.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 hover:scale-110 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-[#64748B] hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Contact</h4>
            <div className="space-y-4">
              <a
                href={`tel:${BUSINESS_PHONE}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-green-400" />
                </div>
                <div>
                  <div className="text-[11px] text-[#475569] mb-0.5">Phone / WhatsApp</div>
                  <div className="text-sm text-[#CBD5E1] group-hover:text-white transition-colors">
                    {BUSINESS_PHONE}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-[11px] text-[#475569] mb-0.5">Email Us</div>
                  <div className="text-sm text-[#CBD5E1] group-hover:text-white transition-colors break-all">
                    {BUSINESS_EMAIL}
                  </div>
                </div>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                </div>
                <div>
                  <div className="text-[11px] text-[#475569] mb-0.5">Instagram</div>
                  <div className="text-sm text-[#CBD5E1] group-hover:text-white transition-colors flex items-center gap-1">
                    @getnexoraai <ExternalLink className="w-3 h-3 opacity-50" />
                  </div>
                </div>
              </a>

              <div className="pt-2">
                <div className="text-[11px] text-[#475569] mb-1.5">Business Hours</div>
                <div className="text-sm text-[#CBD5E1]">Mon–Sat · 9:00 AM – 8:00 PM IST</div>
              </div>
            </div>

            {/* Legal links */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {legal.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-xs text-[#475569] hover:text-[#94A3B8] transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#475569]">
            © 2026 Nexora AI. All Rights Reserved. Built with ❤️ in India.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#475569] hover:text-white transition-colors group"
          >
            Back to top
            <div className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
