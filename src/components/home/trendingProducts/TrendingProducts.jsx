import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";
import Product from "../../reusable/Product/Product";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { fetchProducts } from "../../../redux/slice/productSlice";

const TrendingProducts = () => {
  const { products } = useSelector((state) => state.products);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const dispatch = useDispatch();

  console.log(trendingProducts);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    );
    console.log(product);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setTrendingProducts(products || []);
  }, [products]);

  return (
    <div className="py-16 bg-[#232222] relative">
      <div className="grid gap-2 text-center pb-8">
        <h1 className="text-4xl text-teal-500 font-semibold">
          Trending Products
        </h1>
        <p className="text-slate-300">
          Browse products from our most popular categories.
        </p>
      </div>
      <div className="mx-4">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          n
          avigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
            enabled: true,
          }}
          modules={[FreeMode, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {trendingProducts.slice(0, 10).map((prod, idx) => (
            <SwiperSlide>
              <Product
                idx={idx}
                product={prod}
                handleAddToCart={handleAddToCart}
              />
            </SwiperSlide>
          ))}
          <div className="flex justify-between absolute inset-y-1/2 w-full z-10">
            <div className="prev-btn bg-pink-600 text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiLeftArrow />
            </div>
            <div className="next-btn bg-pink-600 text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiRightArrow />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingProducts;
