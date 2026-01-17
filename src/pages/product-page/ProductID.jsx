import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slice/cartSlice";
import { Loader } from "../../components";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductID = () => {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <Loader />;
  }

  // Generate mock rating (in real app, fetch from API)
  const mockRating = {
    average: (Math.random() * 2 + 3).toFixed(1), // 3-5 stars
    count: Math.floor(Math.random() * 500) + 50,
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        })
      );
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
    setQuantity(1);
  };

  const handleRating = (star) => {
    setUserRating(star);
    toast.success(`You rated this product ${star} stars!`);
  };

  const renderStars = (rating, isInteractive = false) => {
    return (
      <div className="flex gap-2 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => isInteractive && handleRating(star)}
            onMouseEnter={() => isInteractive && setHoverRating(star)}
            onMouseLeave={() => isInteractive && setHoverRating(0)}
            className={`transition-all duration-200 ${
              isInteractive
                ? "cursor-pointer hover:scale-125"
                : "cursor-default"
            }`}
          >
            <FaStar
              size={isInteractive ? 24 : 18}
              className={
                star <= (isInteractive ? hoverRating || userRating : rating)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#232222] grid grid-cols-5 rounded border p-6 px-12 gap-6 border-teal-900 hover:border-teal-500 transition-colors overflow-hidden group">
      <div className="border border-teal-900 group-hover:border-teal-500 p-4 rounded col-span-2">
        <img src={product.image} className="h-full w-full" />
      </div>
      <div className="flex flex-col gap-4 col-span-3">
        <h1 className="text-3xl text-teal-500">{product.title}</h1>
        <p className="w-8/12 text-slate-200">{product.description}</p>
        <div className="border rounded p-4 grid gap-2">
          <span className="text-slate-400 text-lg">Price</span>
          <p className="text-lg text-pink-600"> ${product.price.toFixed(2)}</p>
        </div>
        {/* Rating Section */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-primary-500/20">
          <div className="flex items-center gap-2">
            {renderStars(parseFloat(mockRating.average))}
            <span className="text-yellow-400 font-semibold text-lg">
              {mockRating.average}
            </span>
          </div>
          <span className="text-slate-400">({mockRating.count} reviews)</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-slate-300 font-semibold">Quantity :</span>
          <div className="flex items-center gap-3 bg-dark-bg border border-primary-500/20 rounded p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-primary-500 hover:text-primary-400 font-bold px-3 transition-colors"
            >
              −
            </button>
            <span className="text-white font-semibold px-4 min-w-10 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-primary-500 hover:text-primary-400 font-bold px-3 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="border-teal-500 border hover:bg-primary-600 text-white font-bold py-2 px-6 rounded transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <FaShoppingCart className="group-hover:scale-110 transition-transform" />
            Add to Cart
          </button>
          <button className="border-pink-600 text-pink-600 border hover:bg-primary-600 font-bold py-2 px-6 rounded transition-all duration-200 flex items-center justify-center gap-2 group">
            <FaHeart className="group-hover:scale-110 transition-transform" />
            Wishlist
          </button>
        </div>

        {/* User Rating Section */}
        <div className="bg-dark-bg p-6 rounded border border-primary-500/20">
          <h3 className="text-primary-500 font-bold text-lg mb-4">
            Rate this product
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {renderStars(userRating, true)}
              {userRating > 0 && (
                <span className="text-primary-500 font-semibold">
                  {userRating} star{userRating !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <button
              disabled={userRating === 0}
              className="w-full bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductID;
