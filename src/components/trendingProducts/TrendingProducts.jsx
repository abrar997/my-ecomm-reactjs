import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import Button from "../reusable/Button";
import { BsBasket, BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";
import Product from "../reusable/Product";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  };
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    console.log(product);
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
            <Product
              idx={idx}
              product={prod}
              handleAddToCart={handleAddToCart}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
