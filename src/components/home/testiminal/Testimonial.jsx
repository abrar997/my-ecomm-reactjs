import React from "react";
import { TestimonialData } from "./TestimonialData";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

const Testimonial = () => {
  return (
    <div className="text-center lg:py-16">
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
            nextEl: ".next",
            prevEl: ".prev",
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
        </Swiper>
        <div className="flex justify-between absolute inset-0 z-30 px-12">
          <div className="prev cursor-pointer hover:bg-pink-700 hover:text-white bg-slate-300 rounded-full w-10 h-10 text-black my-auto text-3xl flex items-center justify-center  ">
            <HiOutlineArrowSmLeft />
          </div>
          <div className="next cursor-pointer hover:bg-pink-700 hover:text-white bg-slate-300 rounded-full w-10 h-10 text-black my-auto text-3xl flex items-center justify-center  ">
            <HiOutlineArrowSmRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
