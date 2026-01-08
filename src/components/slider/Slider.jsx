import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Button from "../reusable/Button";
import { sliderData } from "./SliderData";

const Slider = () => {
  return (
    <div className="bg-[#403F3F] rounded relative">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={{ prevEl: "prev-btn", nextEl: "next-btn" }}
        modules={[Pagination, Navigation, Autoplay]}
        grabCursor={true}
        autoplay={true}
        className="mySwiper"
      >
        {sliderData.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="grid grid-cols-4 items-center">
              <div className="lg:gap-8 gap-3 lg:px-10 px-4 flex flex-col items-start col-span-2">
                <div className="grid gap-3">
                  <h1 className="lg:text-5xl text-2xl font-semibold">
                    {slide.title}
                  </h1>
                  <p className="lg:text-[16px] text-teal-600">
                    {slide.description}
                  </p>
                </div>
                <p className="text-slate-300 text-sm lg:text-[16px]">
                  We are an online shopping platform dedicated to providing
                  high-quality products at competitive prices. Our mission is to
                  make shopping easy, fast, and enjoyable for everyone.
                </p>
                <Button text="Details" />
              </div>
              <div className="flex flex-col h-[60vh] items-center relative justify-center col-span-2">
                <div className="z-10 absolute bg-teal-200 blur-2xl rounded-full w-64 h-64 m-auto"></div>
                <div className="absolute z-20">
                  <img
                    src={slide.image}
                    alt=""
                    className="lg:w-[300px] w-1/2 h-1/2 m-auto"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
