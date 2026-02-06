import {
  AboutSection,
  Categories,
  Testimonial,
  Slider,
  TrendingProducts,
} from "../../components";

const Home = () => {
  return (
    <div className="relative flex flex-col lg:gap-12 gap-4">
      <Slider />
      <AboutSection />
      <Testimonial />
      <Categories />
      <TrendingProducts />
    </div>
  );
};

export default Home;
