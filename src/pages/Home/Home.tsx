import HeroSection from "../../components/HeroSection";
import ProductCarousel from "../Products/ProductCarousel";
import OfferSection from "../../components/OfferSection";
import NewCollection from "../Products/NewCollection";
import AllProducts from "../Products/AllProducts";

const Home = () => {
  return (
    <>
      <HeroSection />
        <ProductCarousel />
        <NewCollection/>
        <OfferSection/>
        <AllProducts/>
        </>
  );
};

export default Home;
