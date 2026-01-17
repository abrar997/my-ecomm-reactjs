import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slice/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="min-h-screen bg-[#232222] py-8">
      <div className="max-w-7xl mx-auto  grid gap-6">
        {cart.items.length === 0 ? (
          <div className="text-center mt-20 grid items-center justify-center">
            <p className="text-slate-300 text-lg mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="text-teal-500 hover:text-teal-400 underline"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#363535] rounded border border-teal-900">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-6 border-b border-teal-900 last:border-b-0"
                  >
                    <div className="w-24 h-24 flex-shrink-0 bg-[#2e2e2e] rounded flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-teal-500 font-semibold mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-pink-600 font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#1a1a1a] px-3 py-2 rounded">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="text-teal-500 hover:text-teal-400 p-1"
                      >
                        <AiOutlineMinus size={16} />
                      </button>
                      <span className="text-slate-300 px-3 min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="text-teal-500 hover:text-teal-400 p-1"
                      >
                        <AiOutlinePlus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-slate-300 text-sm mb-2">Subtotal</p>
                      <p className="text-pink-600 font-bold">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <MdDeleteOutline size={24} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#232222] rounded border border-teal-900 p-6 sticky top-8">
                <h2 className="text-xl text-teal-500 font-semibold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 border-b border-teal-900 pb-6">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax</span>
                    <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span className="text-teal-500">Total</span>
                  <span className="text-pink-600">
                    ${(cart.totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <button className="w-full bg-teal-500 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded transition duration-200">
                    Proceed to Checkout
                  </button>
                  <Link
                    to="/shop"
                    className="block text-center border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-semibold py-3 px-4 rounded transition duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="text-slate-400 text-sm">
                  <p>Items in cart: {cart.totalQuantity}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
