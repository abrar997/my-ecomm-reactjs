import { Link, NavLink, useNavigate } from "react-router-dom";
import { Links } from "../../assets/data";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsHeart, BsX } from "react-icons/bs";
import { CgProfile, CgUser, CgUserAdd } from "react-icons/cg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin from "../hiddenLink/hiddenLink";
import Button from "../reusable/Button";

const Header = () => {
  const [show, setShow] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // active link style
  const active = "text-teal-600 text-lg border-b capitalize px-1";
  const activeLink = ({ isActive }) =>
    isActive ? `${active}` : "text-lg capitalize";

  // monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          setDisplayName(user.email.slice(0, 10));
        } else {
          setDisplayName(user.displayName.slice(0, 6));
        }
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
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShow(!show);
  };
  const hideMenu = () => {
    setShow(false);
  };

  const UserLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful ...");
        navigate("/signup");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="relative lg:px-10 px-4">
        <DesktopNav
          links={Links}
          isActive={activeLink}
          mainMenu={mainMenu}
          setMainMenu={setMainMenu}
          UserLogout={UserLogout}
          nameOfUser={displayName}
          photoURL={photoURL}
          cartItemsLength={cart.items.length}
        />
        <MobileNav
          links={Links}
          toggleMenu={toggleMenu}
          hideMenu={hideMenu}
          show={show}
          isActive={activeLink}
        />
      </div>
    </>
  );
};

export default Header;

const DesktopNav = ({
  links,
  isActive,
  mainMenu,
  setMainMenu,
  UserLogout,
  nameOfUser,
  photoURL,
  cartItemsLength,
}) => {
  return (
    <div className="lg:grid grid-cols-4 w-full shadow-lg p-3 px-5 hidden bg-[#403F3F] rounded mt-4 items-center">
      <div className="col-span-1 text-2xl">A-Shop</div>
      <div className="flex gap-5 items-start col-span-2 m-auto">
        {links.map((link, idx) => (
          <NavLink to={link.to} key={idx} className={isActive}>
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-5 col-span-1 ml-auto">
        <ShowOnLogin>
          <Link
            to="/cart"
            className="text-xl relative border border-teal-600 rounded p-2 hover:text-teal-600 transition-colors duration-200"
          >
            <FaShoppingCart />
            <span className="bg-red-600 text-sm text-white rounded-full w-5 h-5 -top-4 flex items-center justify-center absolute z-10 -right-2">
              {cartItemsLength}
            </span>
          </Link>
          <Link
            to="/favorite"
            className="text-xl relative border border-teal-600 rounded p-2 hover:text-teal-600 transition-colors duration-200"
          >
            <BsHeart />
            <span className="bg-red-600 text-sm text-white rounded-full w-5 h-5 -top-4 flex items-center justify-center absolute z-10 -right-2">
              {cartItemsLength}
            </span>
          </Link>
        </ShowOnLogin>
        <Button isBorder to="/login" text="Login" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMainMenu(!mainMenu)}
              className="bg-slate-50 rounded-full w-9 h-9 text-teal-600 flex items-center justify-center text-2xl hover:bg-slate-200 transition-colors duration-200"
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="user image"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <CgUser />
              )}
            </button>
            {nameOfUser && (
              <p className="text-sm text-teal-500 font-semibold">
                {nameOfUser}
              </p>
            )}
          </div>
          <div
            className={`user-menu absolute right-0 top-14 z-50 w-48 rounded bg-slate-50 text-black border border-slate-200 shadow-lg transform transition-all duration-300 origin-top-right ${
              mainMenu
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`}
          >
            <Link
              to="/signup"
              className="flex items-center p-3 gap-3 border-b border-slate-300 hover:bg-slate-200 transition-colors duration-200 first:rounded-t"
            >
              <span className="text-lg text-teal-600 border rounded p-1">
                <CgUserAdd />
              </span>
              <span>Sign up</span>
            </Link>
            <ShowOnLogin>
              <button
                onClick={UserLogout}
                className="w-full flex items-center p-3 gap-3 border-b border-slate-300 hover:bg-slate-200 transition-colors duration-200"
              >
                <span className="text-lg text-teal-600 border rounded p-1">
                  <BiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </ShowOnLogin>
            <Link
              to="/profile"
              className="flex items-center p-3 gap-3 hover:bg-slate-200 transition-colors duration-200 last:rounded-b"
            >
              <span className="text-lg text-teal-600 border rounded p-1">
                <CgProfile />
              </span>
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({ hideMenu, toggleMenu, links, show, isActive }) => {
  return (
    <div className="flex flex-col lg:hidden">
      <div className="flex justify-between shadow p-4 bg-[#403F3F]">
        <span className="text-2xl text-teal-600">a-Shop</span>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="text-teal-600 text-lg hover:text-teal-500 transition-colors duration-200"
          >
            <FaShoppingCart />
          </Link>
          <button
            onClick={toggleMenu}
            className="text-2xl text-teal-600 hover:text-teal-500 transition-colors duration-200"
          >
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>
      <div
        className={`mobile-menu fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={hideMenu}
      />
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-[#444343] py-16 px-4 z-30 transform transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute right-3 top-4">
          <button
            onClick={hideMenu}
            className="text-2xl text-teal-600 hover:text-teal-500 border rounded p-1 transition-colors duration-200"
          >
            <BsX />
          </button>
        </div>
        <div className="absolute top-3 text-2xl text-teal-600">a-Shop</div>
        <div className="flex flex-col gap-5 items-start mt-16">
          {links.map((link, idx) => (
            <NavLink
              to={link.to}
              key={idx}
              className={isActive}
              onClick={hideMenu}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/signup"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors duration-200 w-full text-center"
            onClick={hideMenu}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="border border-teal-600 hover:bg-teal-600 text-teal-600 hover:text-white px-4 py-2 rounded transition-colors duration-200 w-full text-center"
            onClick={hideMenu}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
