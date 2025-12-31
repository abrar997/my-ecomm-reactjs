import { auth } from "../../firebase/config";

const profile = () => {
  const user = auth.currentUser;
  const name = user.displayName;
  const email = user.email;
  return (
    <div className="flex mt-12 w-1/2 m-auto items-center justify-center border rounded p-12">
      <div className="grid text-center gap-3">
        <h1 className="text-2xl font-semibold text-teal-500">{name}</h1>
        <p className="text-slate-300"> {email}</p>
      </div>
    </div>
  );
};

export default profile;
