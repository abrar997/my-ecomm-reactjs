import { auth } from "../../firebase/config";

const profile = () => {
  const user = auth.currentUser || "";
  const name = user.displayName || "";
  const email = user.email || "";
  return (
    <div className="min-h-screen bg-[#232222] py-8 px-2 lg:px-0">
      {user ? (
        <div className="grid text-center gap-3">
          <h1 className="text-2xl font-semibold text-primary">
            {user && name}
          </h1>
          <p className="text-lightWhite"> {user && email}</p>
        </div>
      ) : (
        <p className="text-2xl text-center text-primary capitalize font-bold ">
          please sign up and start your shopping
        </p>
      )}
    </div>
  );
};

export default profile;
