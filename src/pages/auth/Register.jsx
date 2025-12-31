import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful ...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && (
        <div className="flex items-center justify-center absolute inset-0">
          <Loader />
        </div>
      )}

      <div
        className={`grid lg:grid-cols-2 lg:w-8/12 lg:m-auto lg:items-center lg:justify-center lg:p-12 py-6`}
      >
        <div className="col-span-1 h-full relative">
          <img
            className="w-full h-full lg:rounded-tl lg:rounded-bl rounded-tl rounded-br"
            src="https://images.unsplash.com/photo-1505308843978-ea2cb9913b44?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="absolute inset-0 bg-[#234d4dbd] flex items-center justify-center">
            <h1 className="text-5xl font-semibold capitalize w-10/12 tracking-wide leading-16 text-center text-slate-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
              start your shopping with us
            </h1>
          </div>
        </div>
        <form
          action=""
          onSubmit={registerUser}
          className="shadow-lg p-6 lg:rounded-tr lg:rounded-br rounded-br rounded-bl grid gap-3 bg-main border border-teal-800"
        >
          <h1 className="text-2xl capitalize text-center lg:text-left">
            create new account
          </h1>

          <div className="grid gap-2">
            <label htmlFor="email" className="capitalize text-teal-500">
              Email
            </label>
            <input
              value={email}
              type="text"
              className="border p-2 rounded w-full"
              placeholder="example@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="capitalize text-teal-500">
              Password
            </label>
            <input
              value={password}
              type="password"
              placeholder="**********"
              className="border p-2 rounded w-full"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="capitalize text-teal-500">
              Confirm Password
            </label>
            <input
              value={cPassword}
              type="password"
              placeholder="**********"
              className="border p-2 rounded w-full"
              required
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>

          <button className="bg-teal-600 text-white rounded py-2 hover:bg-teal-700 mt-2 capitalize">
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
