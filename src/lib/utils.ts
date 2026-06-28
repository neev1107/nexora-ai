import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "918699045750";
export const BUSINESS_EMAIL = "contact.nexora011@gmail.com";
export const BUSINESS_PHONE = "+91 8699045750";
export const INSTAGRAM_URL = "https://www.instagram.com/getnexoraai?igsh=aXA3dXFvdzV1eTIz";

export function buildWhatsAppMessage(data: {
  name: string;
  company: string;
  phone: string;
  email: string;
  packageName: string;
  requirements: string;
}) {
  const message = `Hello Nexora AI,

I am interested in the *${data.packageName}*.

My Details:
• Name: ${data.name}
• Company: ${data.company}
• Phone: ${data.phone}
• Email: ${data.email}
• Requirements: ${data.requirements}

Please contact me regarding my project.

Thank you.`;
  return encodeURIComponent(message);
}

export function openWhatsApp(data: Parameters<typeof buildWhatsAppMessage>[0]) {
  const message = buildWhatsAppMessage(data);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}
