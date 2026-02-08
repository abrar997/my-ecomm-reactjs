import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../components";
import {
  removeItemFromWhishList,
  saveDataToFirebase,
  saveDataToWhishList,
} from "../../redux/slice/whishlistSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { auth, fire } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const WhishListPage = () => {
  const data = useSelector((state) => state.whishlist);
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const handleRemoveItem = (id) => {
    dispatch(removeItemFromWhishList(id));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(fire, "whishlist", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(saveDataToWhishList(docSnap.data()));
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (data.items.length > 0) {
      saveDataToFirebase(data);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#232222] py-8">
      {data.items.length === 0 ? (
        <div className="text-center lg:mt-20 grid items-center justify-center">
          <p className="text-lightWhite text-xl mb-4">
            Your WhishList is empty
          </p>
          <Link
            to="/shop"
            className="text-primary hover:text-teal-400 underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:max-w-7xl lg:mx-auto flex flex-col lg:gap-4">
          <div className="grid gap-3">
            <h1 className="text-center text-3xl lg:text-4xl text-teal-600 font-bold capitalize">
              Your favorite Products
            </h1>

            <div className="flex justify-start gap-2 p-2 lg:p-0">
              <p className="text-secondary">Number of products :</p>
              <span> {data.items.length}</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 p-2 lg:p-0">
            {data.items.map((item, idx) => (
              <div key={idx} className="grid gap-2">
                <Product product={item} />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-secondary rounded px-2 py-1 capitalize hover:bg-pink-700 text-white"
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhishListPage;
