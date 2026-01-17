import { TestimonialData } from "./TestimonialData";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
  return (
    <div className="text-center lg:py-10 bg-[#232222] relative">
      <div className="border-b-2 border-t-2 border-[#28262660] rounded p-4 py-8 relative">
        <h1 className="text-4xl text-teal-500 font-semibold pb-10 italic">
          What Our Customers Say
        </h1>
        <Swiper
          slidesPerView={1}
          keyboard={{
            enabled: true,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          loop
          modules={[Keyboard, Navigation]}
          className="mySwiper"
        >
          {TestimonialData.map((user, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid gap-4 items-center justify-center">
                <img
                  src={user.image}
                  alt=""
                  className="w-24 h-24 rounded-full m-auto"
                />
                <h1 className="text-teal-600 text-xl">{user.name}</h1>
                <p className="italic">{user.review}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="flex justify-between absolute inset-y-1/2 w-full z-10">
            <div className="prev-btn bg-pink-600 text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiLeftArrow />
            </div>{" "}
            <div className="next-btn bg-pink-600 text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiRightArrow />
            </div>{" "}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
