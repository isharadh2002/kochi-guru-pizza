import Header from "@components/Header";
import HeroSection from "@/components/HomeComponents/HeroSection";
import PromotionsSection from "@/components/HomeComponents/PromotionsSection";
import TrendingItems from "@/components/HomeComponents/TrendingItems";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <PromotionsSection />
      <TrendingItems />
      <Footer />
    </>
  );
}
