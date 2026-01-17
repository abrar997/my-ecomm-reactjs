import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = {
        category: "",
        minPrice: 0,
        maxPrice: 1000,
      };
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Helper function to apply filters
const applyFilters = (state) => {
  let filtered = state.products;

  if (state.filters.category) {
    filtered = filtered.filter(
      (product) => product.category === state.filters.category
    );
  }

  filtered = filtered.filter(
    (product) =>
      product.price >= state.filters.minPrice &&
      product.price <= state.filters.maxPrice
  );

  state.filteredProducts = filtered;
};

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setFilters,
  resetFilters,
} = productSlice.actions;
export default productSlice.reducer;
