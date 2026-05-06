/* Home — Forge by Revenant Systems
   Design: Dark Forge / Molten Metal
   Sections: Nav → Hero → HowItWorks → Demos → Features → Templates → Comparison → SocialProof → Pricing → Footer
*/
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import TemplatesSection from "@/components/TemplatesSection";
import ComparisonSection from "@/components/ComparisonSection";
import SocialProofSection from "@/components/SocialProofSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.09 0.008 260)" }}>
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <DemoSection />
      <FeaturesSection />
      <TemplatesSection />
      <ComparisonSection />
      <SocialProofSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
