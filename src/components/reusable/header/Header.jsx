import { Link, NavLink, useNavigate } from "react-router-dom";
import { Links } from "../../../assets/data";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsX, BsHeart } from "react-icons/bs";
import { CgProfile, CgUser, CgUserAdd } from "react-icons/cg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../../redux/slice/authSlice";
import ShowOnLogin from "../../hiddenLink/hiddenLink";
import { Button } from "../..";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(
          user.displayName?.slice(0, 6) || user.email.slice(0, 10)
        );
        setPhotoURL(user.photoURL);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
            photoURL: user.photoURL,
          })
        );
      } else {
        setDisplayName("");
        setPhotoURL("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful ...");
        navigate("/signup");
      })
      .catch((error) => toast.error(error.message));
  };

  const activeLink = ({ isActive }) =>
    isActive
      ? "text-teal-500 text-lg border-b capitalize px-1"
      : "text-lg capitalize text-white hover:text-teal-500 transition-colors";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        transition={Bounce}
      />
      <header
        className={`sticky top-0 z-40 transition-all duration-300 lg:mx-10 mt-4 ${
          isScrolled
            ? "shadow-lg bg-[#282727be] backdrop-blur-md pt-2"
            : "bg-[#232222]"
        }`}
      >
        <div className="relative lg:px-10 px-4">
          {/* Desktop Nav */}
          <div className="hidden lg:grid grid-cols-4 w-full p-3 px-5 items-center gap-4">
            <h1 className="text-2xl font-bold text-teal-500">A-Shop</h1>

            <div className="flex gap-5 items-center col-span-2 justify-center">
              {Links.map((link, idx) => (
                <NavLink key={idx} to={link.to} className={activeLink}>
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4 justify-end">
              <ShowOnLogin>
                <Link
                  to="/cart"
                  className="text-xl relative border border-teal-500 rounded p-2 hover:bg-teal-500 hover:text-white transition-all"
                >
                  <FaShoppingCart />
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 -top-4 -right-2 absolute flex items-center justify-center text-xs font-bold">
                    {cart.items.length}
                  </span>
                </Link>
                <Link
                  to="/favorite"
                  className="text-xl relative border border-teal-500 rounded p-2 hover:bg-teal-500 hover:text-white transition-all"
                >
                  <BsHeart />
                </Link>
              </ShowOnLogin>
              <Button isBorder to="/login" text="Login" />

              <UserMenu
                mainMenu={mainMenu}
                setMainMenu={setMainMenu}
                displayName={displayName}
                photoURL={photoURL}
                handleLogout={handleLogout}
              />
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="flex lg:hidden justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-teal-500">a-Shop</h1>
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="text-teal-500 text-lg hover:text-teal-400"
              >
                <FaShoppingCart />
              </Link>
              <button
                onClick={() => setShow(!show)}
                className="text-2xl text-teal-500 hover:text-teal-400"
              >
                <HiOutlineMenuAlt3 />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {show && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-20"
                onClick={() => setShow(false)}
              />
              <div className="fixed top-0 left-0 h-screen w-80 bg-main-700 z-30 py-16 px-4 flex flex-col gap-6 animate-slide-in">
                <button
                  onClick={() => setShow(false)}
                  className="absolute right-3 top-4 text-2xl text-teal-500"
                >
                  <BsX />
                </button>

                <div className="flex flex-col gap-4 mt-8">
                  {Links.map((link, idx) => (
                    <NavLink
                      key={idx}
                      to={link.to}
                      className={activeLink}
                      onClick={() => setShow(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                <div className="border-t border-teal-500/30 pt-4 flex flex-col gap-3">
                  <Link
                    to="/signup"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold text-center transition-colors"
                    onClick={() => setShow(false)}
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-4 py-2 rounded font-semibold text-center transition-colors"
                    onClick={() => setShow(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

const UserMenu = ({
  mainMenu,
  setMainMenu,
  displayName,
  photoURL,
  handleLogout,
}) => (
  <div className="relative">
    <div className="flex items-center gap-2">
      <button
        onClick={() => setMainMenu(!mainMenu)}
        className="bg-slate-50 rounded-full w-10 h-10 text-teal-500 flex items-center justify-center  transition-colors"
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt="user"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <CgUser className="text-xl" />
        )}
      </button>
      {displayName && (
        <span className="text-sm text-teal-500 font-semibold whitespace-nowrap">
          {displayName}
        </span>
      )}
    </div>
    {mainMenu && (
      <div className="absolute bg-slate-50 right-0 top-12 w-48 bg-light-text text-black rounded shadow-lg border border-gray-200 overflow-hidden z-50 animate-fade-in">
        <MenuLink icon={<CgUserAdd />} label="Sign up" to="/signup" />
        <ShowOnLogin>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 border-b border-gray-200 transition-colors"
          >
            <span className="text-teal-500 border rounded p-1">
              <BiLogOut />
            </span>
            <span>Logout</span>
          </button>
        </ShowOnLogin>
        <MenuLink icon={<CgProfile />} label="Profile" to="/profile" />
      </div>
    )}
  </div>
);

const MenuLink = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 transition-colors"
  >
    <span className="text-teal-500 border rounded p-1">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Header;
