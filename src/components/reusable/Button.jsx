import { Link } from "react-router-dom";

const Button = ({ isBorder, text, to }) => {
  return (
    <div>
      {isBorder ? (
        <Link
          to={to}
          className="border border-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          {text}
        </Link>
      ) : (
        <button className="bg-pink-700 tracking-wide font-semibold hover:bg-teal-500 lg:px-12 px-6 py-2 rounded capitalize lg:text-xl">
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
