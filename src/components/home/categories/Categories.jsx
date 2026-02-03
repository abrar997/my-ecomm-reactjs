import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Categories = () => {
  const { products } = useSelector((state) => state.products);
  const categoriesWithImages = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          name: product.category,
          image: product.image,
        };
      }
      return acc;
    }, {}),
  );
  return (
    <div className="bg-[#232222] p-10 lg:py-16 grid gap-8">
      <div className="grid gap-2 text-center">
        <h1 className="text-4xl text-teal-500 font-semibold">
          Shop by Category
        </h1>
        <p className="text-slate-300">
          Browse products from our most popular categories.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 grid-rows-2 rounded ">
        {categoriesWithImages.map((cat, idx) => (
          <Link
            to={`/category/${cat.category}`}
            key={idx}
            className="relative flex items-center justify-center row-span-1 group overflow-hidden h-[400px]"
          >
            <img
              className="relative h-full lg:py-12 group-hover:scale-150 transition-all duration-300 group-hover:rotate-3"
              src={cat.image}
            />
            <h2 className="absolute bg-[#1111114e] line-clamp-2 inset-0 flex items-center justify-center lg:text-5xl text-3xl font-bold ">
              {cat.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
