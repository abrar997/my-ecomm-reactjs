import AboutSection from "../../components/home/about-section/AboutSection";
import Categories from "../../components/home/categories/Categories";
import Testimonial from "../../components/home/testiminal/Testimonial";
import Slider from "../../components/slider/Slider";
import TrendingProducts from "../../components/trendingProducts/TrendingProducts";

const Home = () => {
  return (
    <div className="relative flex flex-col gap-12">
      <Slider />
      <AboutSection />
      <Testimonial />
      <Categories />
      <TrendingProducts />
    </div>
  );
};

export default Home;
