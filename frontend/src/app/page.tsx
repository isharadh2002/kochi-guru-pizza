import Header from "@components/Header";
import HeroSection from "@components/HeroSection";
import PromotionsSection from "@components/PromotionsSection";
import TrendingItems from "@components/TrendingItems";
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
