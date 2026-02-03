import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
  },
  extraReducers: (builder) =>
    builder
      .addCase(actionName.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(actionName.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(actionName.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }),
});

export const { AddToWhishList } = WhishListSlice.actions;
export default WhishListSlice.reducer;
