import {
  AboutSection,
  Categories,
  Testimonial,
  Slider,
  TrendingProducts,
} from "../../components";

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
