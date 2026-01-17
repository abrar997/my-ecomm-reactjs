import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for reset link");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />{" "}
      <div className="lg:flex lg:items-center lg:justify-center lg:p-12 p-4">
        <form
          action=""
          className="shadow-lg lg:p-6 p-4 rounded-tr lg:w-1/2 lg:m-auto rounded-br grid gap-3 bg-main border border-teal-800"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl capitalize text-center">Reset password</h1>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <label htmlFor="email" className="capitalize text-teal-500">
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

            <button className="bg-teal-500 capitalize text-white rounded py-2 hover:bg-teal-700">
              Reset password
            </button>
          </div>
          <div className="flex justify-between text-sm text-slate-300">
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reset;
