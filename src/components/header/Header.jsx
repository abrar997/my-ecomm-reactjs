import { Link, NavLink, useNavigate } from "react-router-dom";
import { Links } from "../../assets/data";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsX } from "react-icons/bs";
import { CgProfile, CgUser, CgUserAdd } from "react-icons/cg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";

const Header = () => {
  const [show, setShow] = useState(false);
  const [mainMenu, setMainMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // active link style
  const active = "text-teal-600 text-lg border-b capitalize px-1";
  const activeLink = ({ isActive }) =>
    isActive ? `${active}` : "text-lg capitalize";

  // monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // const uid = user.uid;
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
      }
    });
  }, []);

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
      <ToastContainer />
      <div className="relative lg:px-10 px-4">
        <DesktopNav
          links={Links}
          isActive={activeLink}
          mainMenu={mainMenu}
          setMainMenu={setMainMenu}
          UserLogout={UserLogout}
          nameOfUser={displayName}
          photoURL={photoURL}
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
}) => {
  return (
    <div className="lg:grid grid-cols-4 w-full shadow-lg p-3 px-3 hidden bg-[#403F3F] mt-4 items-center">
      <div className="col-span-1 text-2xl">A-Shop</div>
      <div className="flex gap-5 items-start col-span-2 m-auto">
        {links.map((link, idx) => (
          <NavLink to={link.to} key={idx} className={isActive}>
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-5 col-span-1 ml-auto">
        <Link
          to="/cart"
          className="text-xl border border-teal-600 rounded p-2 hover:text-teal-600"
        >
          <FaShoppingCart />
        </Link>
        <Link
          to="/login"
          className="border border-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMainMenu(!mainMenu)}
              className="bg-slate-50 rounded-full w-9 h-9 text-teal-600 flex items-center justify-center text-2xl"
            >
              {photoURL ? (
                <img src={photoURL} alt="user image" className="rounded-full" />
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
          {mainMenu && (
            <div className="w-38 rounded bg-slate-50 text-black border grid absolute right-10 top-20 z-50">
              <Link
                to="/signup"
                className="flex items-center p-2 gap-3 border-b border-slate-300 hover:bg-slate-200"
              >
                <span className="text-lg text-teal-600 border rounded p-1">
                  <CgUserAdd />
                </span>
                <span>Sign up</span>
              </Link>
              <button
                onClick={UserLogout}
                className="flex items-center p-2 gap-3 border-b border-slate-300 hover:bg-slate-200"
              >
                <span className="text-lg text-teal-600 border rounded p-1">
                  <BiLogOut />
                </span>
                <span>Logout</span>
              </button>
              <Link
                to="/profile"
                className="flex items-center p-2 gap-3 border-b border-slate-300 hover:bg-slate-200"
              >
                <span className="text-lg text-teal-600 border rounded p-1">
                  <CgProfile />
                </span>
                <span>Profile</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({ hideMenu, toggleMenu, links, show, isActive }) => {
  return (
    <div className="flex flex-col lg:hidden">
      <div className="flex justify-between shadow p-4">
        <span className="text-2xl">a-Shop</span>
        <div className="flex  items-center gap-2">
          <Link
            to="/cart"
            className="text-teal-600 text-lg hover:text-teal-600"
          >
            <FaShoppingCart />
          </Link>
          <button onClick={toggleMenu} className="text-2xl">
            <HiOutlineMenuAlt3 />
          </button>
        </div>
      </div>
      {show && (
        <div
          className={`gap-5 h-screen absolute z-30 inset-0 bg-[#444343] py-16 px-4  ${
            show
              ? "w-[-330px] transition-all duration-300 ease-in-out"
              : "w-ull"
          }`}
        >
          <div className="absolute right-3 top-4">
            <button
              onClick={hideMenu}
              className="text-2xl text-teal-600 border rounded"
            >
              <BsX />
            </button>
          </div>
          <div className="absolute top-3">
            <span className="text-2xl">a-Shop</span>
          </div>
          <div className="flex flex-col gap-5 items-start">
            {links.map((link, idx) => (
              <NavLink to={link.to} key={idx} className={isActive}>
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/signup"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="border border-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
