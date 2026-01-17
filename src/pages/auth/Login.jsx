import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successful ...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12 p-4 py-6">
        <form
          action=""
          className="shadow-lg lg:p-6 p-4 rounded-tr lg:w-1/2 lg:m-auto rounded-br grid gap-3 border border-teal-800"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl capitalize text-center">Login</h1>

          <div className="grid gap-2">
            <label htmlFor="email" className="capitalize text-teal-600">
              Email
            </label>
            <input
              type="email"
              className="border p-2 rounded w-full"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="capitalize text-teal-600">
              Password
            </label>
            <input
              type="password"
              placeholder="**********"
              className="border p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm">
              Forget your password ...{" "}
              <Link to="/reset" className="text-teal-500">
                click here
              </Link>{" "}
            </p>
          </div>
          <button
            type="submit"
            className="bg-teal-600 capitalize mt-5 text-white rounded py-2 hover:bg-teal-700"
          >
            send
          </button>
          <div className="grid items-center justify-center gap-2 text-center">
            <span className="text-center text-slate-300">or</span>
            <button
              type="button"
              onClick={SignInWithGoogle}
              className="bg-pink-700 lg:px-10 px-4 rounded py-2 flex items-center gap-2 hover:bg-pink-800"
            >
              login with Google <BsGoogle />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
