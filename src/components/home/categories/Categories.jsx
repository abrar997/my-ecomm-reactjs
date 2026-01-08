import { Link } from "react-router-dom";
import { CategoriesSection } from "./CategoriesData";

const Categories = () => {
  return (
    <div className="bg-[#403F3F] p-10 lg:py-16 grid gap-8">
      <div className="grid gap-2 text-center">
        <h1 className="text-4xl text-teal-500 font-semibold">
          Shop by Category
        </h1>
        <p className="text-slate-300">
          Browse products from our most popular categories.
        </p>
      </div>
      <div className="grid grid-cols-2 border-8 rounded border-[#635f5f51]">
        {CategoriesSection.map((cat, idx) => (
          <Link
            to="/"
            key={idx}
            className="relative h-[400px] group overflow-hidden"
          >
            <img
              className="relative h-full w-full group-hover:scale-150 transition-all duration-300 group-hover:rotate-3"
              src={cat.image}
            />
            <h2 className="absolute bg-[#4171694e] inset-0 flex items-center justify-center text-7xl font-bold">
              {cat.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
