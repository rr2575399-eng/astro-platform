import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ServicesPreview from "@/components/ServicesPreview";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import FaqPreview from "@/components/FaqPreview";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ServicesPreview />
      <Benefits />
      <Testimonials />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
