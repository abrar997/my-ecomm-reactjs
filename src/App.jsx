import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// components
import { Header, Footer } from "./components";
// pages
import { Home, Contact, Register, Login, Reset, Profile } from "./pages";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="py-4 lg:px-10 px-4">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Register />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Reset />} path="/reset" />
            <Route element={<Profile />} path="/profile" />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
