import AboutSection from "../../components/home/about-section/AboutSection";
import Categories from "../../components/home/categories/Categories";
import Testimonial from "../../components/home/testiminal/Testimonial";
import Slider from "../../components/slider/Slider";

const Home = () => {
  return (
    <div className="relative flex flex-col gap-6">
      <Slider />
      <AboutSection />
      <Testimonial />
      <Categories />
    </div>
  );
};

export default Home;
