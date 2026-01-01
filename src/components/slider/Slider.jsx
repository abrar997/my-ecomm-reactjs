import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div className="py-12">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="grid grid-cols-4 items-center">
            <div className="col-span-2  gap-3 p-2 flex flex-col items-start">
              <h1 className="text-5xl text-teal-500 font-semibold">
                First Slider
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                quo nesciunt necessitatibus fuga, exercitationem laborum
                voluptatum quasi iure nulla minus, fugit dolore, vitae
                recusandae maxime similique beatae. Dolor, debitis aut.
              </p>
              <button className="bg-teal-500 text-black font-semibold hover:bg-teal-600 px-12 py-2 rounded capitalize">
                Details
              </button>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <img
                src="https://www.pngall.com/wp-content/uploads/2016/03/Shoes-Free-Download-PNG.png"
                alt=""
                className="rounded w-7/12 border border-teal-600 px-6"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
