import { Link, NavLink, useNavigate } from "react-router-dom";
import { Links } from "../../../assets/data";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsX, BsHeart } from "react-icons/bs";
import { CgProfile, CgUser, CgUserAdd } from "react-icons/cg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, fire } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { replaceCart } from "../../../redux/slice/cartSlice";
import { saveDataToWhishList } from "../../../redux/slice/whishlistSlice";
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
  const whishList = useSelector((state) => state.whishlist);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setDisplayName(
          user.displayName?.slice(0, 6) || user.email.slice(0, 10),
        );
        setPhotoURL(user.photoURL);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
            photoURL: user.photoURL,
          }),
        );
      } else {
        setDisplayName("");
        setPhotoURL("");
        dispatch(REMOVE_ACTIVE_USER());
      }
      try {
        const cartRef = doc(fire, "cartItems", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          dispatch(replaceCart(cartSnap.data()));
        }
      } catch (error) {
        console.error("Error restoring cart:", error);
      }

      // Restore wishlist from Firebase
      try {
        const whishlistRef = doc(fire, "whishlist", user.uid);
        const whishlistSnap = await getDoc(whishlistRef);
        const cartRef = doc(fire, "cartItems", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (whishlistSnap.exists() || cartSnap.exists()) {
          dispatch(saveDataToWhishList(whishlistSnap.data()));
          dispatch(replaceCart(cartSnap.data()));
        }
      } catch (error) {
        console.error("Error restoring wishlist:", error);
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
      ? "text-primary text-lg border-b capitalize px-1"
      : "text-lg capitalize text-white hover:text-primary transition-colors";

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
        <div className="relative lg:px-10 px-4 py-2 lg:py-0">
          <div className="flex justify-between w-full lg:p-3 lg:px-5 items-center gap-4">
            <h1 className="lg:text-2xl text-xl font-bold text-primary">
              A-Shop
            </h1>

            <div className="lg:flex gap-5 m-auto items-center col-span-2 justify-center hidden">
              {Links.map((link, idx) => (
                <NavLink key={idx} to={link.to} className={activeLink}>
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <ShowOnLogin>
                  <ShoppingItems cart={cart} whishList={whishList} />
                </ShowOnLogin>
                <button
                  onClick={() => setShow(!show)}
                  className="text-2xl text-primary hover:text-teal-400 lg:hidden"
                >
                  <HiOutlineMenuAlt3 />
                </button>
              </div>
              <div className="hidden lg:flex items-center lg:gap-4">
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
          </div>

          {/* Mobile Menu */}
          {show && (
            <>
              <div
                className="fixed inset-0 bg-black z-20"
                onClick={() => setShow(false)}
              />
              <div className="fixed top-0 left-0 bg-black w-screen h-screen bg-main-700 z-30 py-16 px-4 flex flex-col gap-6 animate-slide-in">
                <button
                  onClick={() => setShow(false)}
                  className="text-2xl text-primary ml-auto absolute top-4 right-4"
                >
                  <BsX />
                </button>

                <div className="flex flex-col gap-4 mt-4">
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

                <div className="border-t border-primary/30 pt-4 flex flex-col gap-3">
                  <Link
                    to="/signup"
                    className="bg-primary hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold text-center transition-colors"
                    onClick={() => setShow(false)}
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded font-semibold text-center transition-colors"
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

export default Header;

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
        className="bg-lightWhite rounded-full w-10 h-10 text-primary flex items-center justify-center  transition-colors"
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
        <span className="text-sm text-primary font-semibold whitespace-nowrap">
          {displayName}
        </span>
      )}
    </div>
    {mainMenu && (
      <div className="absolute  right-0 top-12 w-48 bg-lightWhite text-black rounded shadow-lg border border-gray-200 overflow-hidden z-50 animate-fade-in">
        <MenuLink icon={<CgUserAdd />} label="Sign up" to="/signup" />
        <ShowOnLogin>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 border-b border-gray-200 transition-colors"
          >
            <span className="text-primary border rounded p-1">
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
    <span className="text-primary border rounded p-1">{icon}</span>
    <span>{label}</span>
  </Link>
);

const ShoppingItems = ({ cart, whishList }) => {
  return (
    <div className="lg:p-0 flex flex-col lg:sticky fixed right-0 top-80 inset-y-1.5 lg:flex-row lg:items-center gap-5 lg:gap-4 lg:justify-end justify-center bg-[#434141d8] lg:bg-transparent rounded lg:rounded-0 w-12 h-24 lg:w-full lg:h-full backdrop-brightness-110">
      <Link
        to="/cart"
        className="text-xl flex items-center justify-center relative lg:border border-primary rounded lg:p-2 p-1 lg:hover:bg-primary hover:text-white transition-all"
      >
        <FaShoppingCart />
        <span className="bg-red-600 text-white rounded-full w-5 h-5 lg:-top-4 -top-2 right-1 lg:-right-2 absolute flex items-center justify-center text-xs font-bold">
          {cart.items.length}
        </span>
      </Link>
      <Link
        to="/whishlist"
        className="text-xl flex items-center justify-center relative lg:border border-primary rounded lg:p-2 p-1 lg:hover:bg-primary hover:text-white transition-all"
      >
        <BsHeart />
        <span className="bg-red-600 text-white rounded-full w-5 h-5 lg:-top-4 -top-2 right-1 lg:-right-2 absolute flex items-center justify-center text-xs font-bold">
          {whishList.items.length}
        </span>
      </Link>
    </div>
  );
};
