import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";
import Product from "../../reusable/Product/Product";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { fetchProducts } from "../../../redux/slice/productSlice";
import { AddToWhishList } from "../../../redux/slice/whishlistSlice";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
  const handleAddToWhishList = (product) => {
    dispatch(
      AddToWhishList({
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
    <div className="lg:py-16 py-10 bg-[#232222] relative">
      <div className="grid gap-2 text-center lg:pb-8 pb-7">
        <h1 className="lg:text-4xl text-3xl text-primary font-semibold">
          Trending Products
        </h1>
        <p className="text-lightWhite">
          Browse products from our most popular categories.
        </p>
      </div>
      <div className="lg:mx-4 mx-2">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
            enabled: true,
          }}
          modules={[FreeMode, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {trendingProducts.slice(0, 10).map((prod, idx) => (
            <SwiperSlide>
              <Product
                idx={idx}
                product={prod}
                handleAddToCart={handleAddToCart}
                handleAddToWhishList={handleAddToWhishList}
              />
            </SwiperSlide>
          ))}
          <div className="flex justify-between absolute inset-y-1/2 w-full z-10">
            <div className="prev-btn border hover:border-0 border-slate-400 hover:bg-secondary text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiLeftArrow />
            </div>
            <div className="next-btn  border hover:bg-secondary hover:border-0 border-slate-400  text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
              <BiRightArrow />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TrendingProducts;
