import HeroSection from "../../components/HeroSection";
import ProductCarousel from "../Products/ProductCarousel";
import OfferSection from "../../components/OfferSection";
import NewCollection from "../Products/NewCollection";

const Home = () => {
  return (
    <>
      <HeroSection />
        <ProductCarousel />
        <NewCollection/>
        <OfferSection/>
        </>
  );
};

export default Home;
