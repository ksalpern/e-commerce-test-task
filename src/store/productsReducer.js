import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../index";
import { GET_PRODUCTS_QUERY } from "./Queries";

const initProductsState = {
  allProducts: [],
  category: "all",
  isLoadingProducts: false,
  failedToLoadProducts: false,
};

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (cat) => {
    let data = await client.query({
      query: GET_PRODUCTS_QUERY,
      variables: { cat: cat },
    });
    return data.data.category.products;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initProductsState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: {
    [loadProducts.pending]: (state, action) => {
      state.isLoadingProducts = true;
      state.failedToLoadProducts = false;
    },
    [loadProducts.fulfilled]: (state, action) => {
      if (action.payload.length !== 0) {
        state.allProducts = action.payload;
      }

      state.isLoadingProducts = false;
      state.failedToLoadProducts = false;
    },
    [loadProducts.rejected]: (state, action) => {
      state.isLoadingProducts = false;
      state.failedToLoadProducts = true;
    },
  },
});

export default productsSlice.reducer;
