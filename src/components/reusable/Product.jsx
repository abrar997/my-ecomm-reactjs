import { BsBasket, BsHeart } from "react-icons/bs";

const Product = ({ idx, handleAddToCart, product }) => {
  return (
    <div
      key={idx}
      className="bg-[#232222] rounded border border-teal-900 hover:border-teal-600 transition-colors overflow-hidden group"
    >
      <div className="relative h-64 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute text-xl inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition-colors"
          >
            <BsBasket />
          </button>
          <button className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors">
            <BsHeart />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-teal-500 font-semibold mb-2 line-clamp-1 text-sm">
          {product.title}
        </h3>
        <p className="text-gray-300 text-xs line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => handleViewProduct(product)}
            className="text-teal-500 hover:text-teal-400 text-xs font-semibold"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
