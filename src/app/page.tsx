import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import DemoSection from "@/components/sections/DemoSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import PackagesSection from "@/components/sections/PackagesSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingButtons from "@/components/ui/FloatingButtons";
import StickyCTABanner from "@/components/ui/StickyCTABanner";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050816] overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true"/>
      <Navbar/>
      <HeroSection/>
      <TrustSection/>
      <DemoSection/>
      <ProcessSection/>
      <ServicesSection/>
      <WhyChooseSection/>
      <PackagesSection/>
      <FAQSection/>
      <ContactSection/>
      <Footer/>
      <FloatingButtons/>
      <StickyCTABanner/>
      <ExitIntentPopup/>
    </main>
  );
}
