import { createSlice } from "@reduxjs/toolkit";
import { auth, fire } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  items: [],
};

const COLLECTION_NAME = "whishlist";
export const saveDataToFirebase = async (whishListItems) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const userWhishRef = doc(fire, COLLECTION_NAME, user.uid);
    await setDoc(
      userWhishRef,
      {
        items: whishListItems.items,
        updatedAt: new Date().toString(),
      },
      { merge: true },
    );
    console.log(user.uid);
  } catch (error) {
    console.error("Error : data not saved in firebase", error);
  }
};

const WhishListSlice = createSlice({
  name: "whishList",
  initialState,
  reducers: {
    AddToWhishList: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        alert("items exist with WhishList");
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
        });
      }
    },
    removeItemFromWhishList: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },

  // extraReducers: (builder) =>
  //   builder
  //     .addCase(actionName.pending, (state, { payload }) => {
  //       state.loading = true;
  //     })
  //     .addCase(actionName.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //     })
  //     .addCase(actionName.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     }),
});

export const { AddToWhishList, removeItemFromWhishList } =
  WhishListSlice.actions;
export default WhishListSlice.reducer;
