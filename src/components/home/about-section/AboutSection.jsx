import { AboutData } from "./AboutData";

const AboutSection = () => {
  return (
    <div className="bg-[#232222] lg:p-10 p-2 py-10 lg:py-16 grid lg:gap-12 gap-6">
      <div className="flex flex-col lg:gap-4 gap-2 text-center">
        <h1 className="lg:text-4xl text-3xl text-primary font-semibold">
          Why Choose Our Store?
        </h1>
        <p className="lg:w-1/2 m-auto lg:text-lg text-lightWhite">
          We provide high-quality products with excellent customer service.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 lg:gap-10 gap-3">
        {AboutData.map((feat, idx) => (
          <div
            key={idx}
            className="border rounded border-primary items-center justify-center text-center p-4 py-8 flex flex-col gap-2"
          >
            <img src={feat.icon} className="w-2/12" />
            <h2 className="lg:text-xl  text-lg font-semibold text-primary">
              {feat.title}
            </h2>
            <p className="text-lightWhite">{feat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
