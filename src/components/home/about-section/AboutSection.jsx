import React from "react";
import { AboutData } from "./AboutData";

const AboutSection = () => {
  return (
    <div className="bg-[#403F3F] p-10 lg:py-16 grid gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl text-teal-500 font-semibold">
          Why Choose Our Store?
        </h1>
        <p className="w-1/2 m-auto text-lg text-slate-300">
          We provide high-quality products with excellent customer service.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {AboutData.map((feat, idx) => (
          <div
            key={idx}
            className="border rounded border-teal-500 items-center justify-center text-center p-4 py-8 flex flex-col gap-2"
          >
            <img src={feat.icon} className="w-2/12" />
            <h2 className="text-xl font-semibold text-teal-600">
              {feat.title}
            </h2>
            <p className="text-slate-100">{feat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
