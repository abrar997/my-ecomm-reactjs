import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import { Header, Footer } from "./components";
// pages
import {
  Home,
  Contact,
  Register,
  Login,
  Reset,
  Profile,
  Cart,
  Shop,
  ProductID,
  Checkout,
  CategoryPage,
  WhishList,
} from "./pages";
function App() {
  return (
    <div className="bg-main">
      <BrowserRouter>
        <Header />
        <div className="py-4 lg:py-6 lg:px-10 px-2">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Register />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Reset />} path="/reset" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<Checkout />} path="/checkout" />
            <Route element={<WhishList />} path="/whishlist" />
            <Route element={<Shop />} path="/shop" />
            <Route element={<ProductID />} path="/product/:id" />
            <Route element={<CategoryPage />} path="/category/:type" />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
