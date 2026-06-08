import { BarLoader } from "components/ui";
import useAuth from "../hooks/useAuth";

/* Home Components */
import HeroSection from "../components/features/home/HeroSection";
import FeaturedBlogsSection from "../components/features/home/FeaturedBlogsSection";
import EducationalIntroSection from "../components/features/home/EducationalIntroSection";
import TradingPsychologySection from "../components/features/home/TradingPsychologySection";
import WhyJournalingSection from "../components/features/home/WhyJournalingSection";
import StatsSection from "../components/features/home/StatsSection";
import FeaturesSection from "../components/features/home/FeaturesSection";
import HowItWorksSection from "../components/features/home/HowItWorksSection";
import TestimonialsSection from "../components/features/home/TestimonialsSection";
import FAQSection from "../components/features/home/FAQSection";

/* Common Components */
import CTASection from "../components/common/CTASection";

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="st-loader-screen">
        <BarLoader />
      </div>
    );
  }

  return (
    <main className="st-page overflow-x-hidden">
      {/* Hero */}
      <HeroSection />

      {/* MOST IMPORTANT FOR SEO + ADSENSE */}
      <FeaturedBlogsSection />

      {/* Educational Authority */}
      <EducationalIntroSection />

      {/* Trading Psychology */}
      <TradingPsychologySection />

      {/* Why Journaling Matters */}
      <WhyJournalingSection />

      {/* Trust / Authority Stats */}
      <StatsSection />

      {/* Platform Features */}
      <FeaturesSection />

      {/* Process */}
      <HowItWorksSection />

      {/* Social Proof */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  );
}
