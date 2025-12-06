import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConverterSection from "@/components/ConverterSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ConverterSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
};

export default Index;
