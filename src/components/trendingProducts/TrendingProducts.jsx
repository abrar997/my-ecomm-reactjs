import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import Button from "../reusable/Button";
import { BsBasket, BsHeart } from "react-icons/bs";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-16">
      <div className="grid gap-2 text-center pb-8">
        <h1 className="text-4xl text-teal-500 font-semibold">
          Trending Products
        </h1>
        <p className="text-slate-300">
          Browse products from our most popular categories.
        </p>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.slice(1, 10).map((prod, idx) => (
          <SwiperSlide>
            <div
              key={idx}
              className="border flex flex-col rounded border-teal-900 h-[430px]"
            >
              <div className="bg-[#232222] rounded relative flex items-center h-[250px] justify-center">
                <img src={prod.image} className="p-4 h-full" />
                <div className="absolute flex flex-col gap-2 top-2 right-3">
                  <button>
                    <BsHeart className="text-pink-600 text-lg hover:text-pink-400" />
                  </button>
                  <button>
                    <BsBasket className="text-pink-600 text-lg hover:text-pink-400" />
                  </button>
                </div>
              </div>
              <div className="grid gap-2 p-2">
                <h1 className="text-lg truncate text-teal-600">{prod.title}</h1>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {prod.description}
                </p>
                <div className="mt-3">
                  <Button text="more" isSmall />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
