import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexoraai.in"),
  title: {
    default: "Nexora AI — Custom AI Automation for Indian Businesses",
    template: "%s | Nexora AI",
  },
  description:
    "Nexora AI builds custom AI automation systems for small and medium businesses in India. WhatsApp bots, CRM automation, lead generation, email sequences, and workflow automation. Book a free consultation.",
  keywords: [
    "AI automation agency India",
    "WhatsApp chatbot India",
    "CRM automation India",
    "lead generation automation",
    "business automation India",
    "n8n automation",
    "AI chatbot for business",
    "Nexora AI",
    "workflow automation Punjab",
  ],
  authors: [{ name: "Nexora AI", url: "https://nexoraai.in" }],
  creator: "Nexora AI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nexoraai.in",
    siteName: "Nexora AI",
    title: "Nexora AI — Stop Doing Repetitive Work. Let AI Handle It.",
    description:
      "Custom AI automation systems for Indian businesses. WhatsApp bots, CRM automation, lead capture, email sequences. Book a free consultation.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nexora AI — AI Automation Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora AI — Custom AI Automation for Indian Businesses",
    description: "WhatsApp bots, CRM automation, lead generation, and workflow automation. Book a free consultation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Nexora AI",
          "description": "Custom AI automation systems for small and medium businesses in India — WhatsApp bots, CRM automation, lead generation, email sequences.",
          "url": "https://nexoraai.in",
          "telephone": "+91-8699045750",
          "email": "contact.nexora011@gmail.com",
          "areaServed": "IN",
          "serviceType": ["AI Automation","WhatsApp Bot Development","CRM Automation","Lead Generation","Workflow Automation"],
          "priceRange": "₹₹",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8699045750",
            "contactType": "customer service",
            "availableLanguage": ["Hindi","English"],
          },
          "sameAs": ["https://www.instagram.com/getnexoraai"],
        })}}/>
      </head>
      <body>{children}</body>
    </html>
  );
}
