import { createSlice } from "@reduxjs/toolkit";
import { fire, auth } from "../../firebase/config";
import { setDoc, doc, collection } from "firebase/firestore";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const COLLECTION_NAME = "cartItems";

export const saveCartToFirebase = async (cartItems) => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const userCartRef = doc(fire, COLLECTION_NAME, user.uid);

    await setDoc(
      userCartRef,
      {
        items: cartItems.items,
        totalQuantity: cartItems.totalQuantity,
        totalPrice: cartItems.totalPrice,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );

    console.log("data saved ", user.uid);
  } catch (e) {
    console.error("Error : data not saved ", e);
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },
    replaceCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.totalPrice = action.payload.totalPrice || 0;
    },
  },
});

export const {
  replaceCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
