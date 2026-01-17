import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/slice/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const tax = (cart.totalPrice * 0.1).toFixed(2);
  const shipping = cart.items.length > 0 ? 10 : 0;
  const total = (
    parseFloat(cart.totalPrice) +
    parseFloat(tax) +
    shipping
  ).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast.error("Please fill in all shipping details");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    setOrderPlaced(true);
    toast.success("Order placed successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-main-600 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-teal-500 font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-slate-300 mb-6">
            Add items to your cart to proceed to checkout
          </p>
          <Link
            to="/shop"
            className="bg-teal-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-main-600 py-8 flex items-center justify-center">
        <div className="bg-secondary-bg border border-teal-500 rounded-lg p-8 text-center max-w-md">
          <div className="text-6xl text-teal-500 mb-4">✓</div>
          <h1 className="text-4xl text-teal-500 font-bold mb-4">
            Order Confirmed!
          </h1>
          <p className="text-slate-300 mb-6">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <p className="text-teal-500 font-semibold mb-8">
            Order Total: ${total}
          </p>
          <Link
            to="/"
            className="bg-teal-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-600 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-secondary-bg border border-teal-500/30 rounded-lg p-6">
              <h2 className="text-2xl text-teal-500 font-bold mb-6">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="col-span-1 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="col-span-1 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-2 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-2 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-2 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="col-span-1 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="col-span-1 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="col-span-2 bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-secondary-bg border border-teal-500/30 rounded-lg p-6">
              <h2 className="text-2xl text-teal-500 font-bold mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="bg-dark-bg border border-teal-500/30 text-white rounded px-4 py-3 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-secondary-bg border border-teal-500/30 rounded-lg p-6">
              <h2 className="text-2xl text-teal-500 font-bold mb-6">
                Order Items
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-dark-bg rounded border border-teal-500/20 hover:border-teal-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain bg-main-600 p-2 rounded"
                      />
                      <div className="flex-1">
                        <p className="text-teal-500 font-semibold line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-slate-400 text-sm">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-accent-500 font-bold">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-400 mt-2 transition-colors"
                      >
                        <MdDeleteOutline size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-secondary-bg border border-teal-500/30 rounded-lg p-6 sticky top-24 space-y-6">
              <h2 className="text-2xl text-teal-500 font-bold">
                Order Summary
              </h2>

              <div className="space-y-4 border-b border-teal-500/20 pb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tax (10%)</span>
                  <span>${tax}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span className="text-teal-500">Total</span>
                <span className="text-accent-500">${total}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-teal-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Place Order
              </button>

              <Link
                to="/cart"
                className="block text-center border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Back to Cart
              </Link>

              <div className="bg-dark-bg rounded p-4">
                <p className="text-slate-400 text-sm">
                  💡{" "}
                  <span className="text-teal-500 font-semibold">
                    Free shipping
                  </span>{" "}
                  on orders over $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
