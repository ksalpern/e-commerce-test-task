import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../index";
import {
  GET_CATEGORIES_QUERY,
  GET_CURRENCIES_QUERY,
  GET_PRODUCTS_QUERY,
} from "./queries";

// Products initial state
const initProductsState = {
  allProducts: [],
  category: "all",
  isLoadingProducts: false,
  failedToLoadProducts: false,
};

// Products reducer
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

////////////////////////////////////////////////////

export const loadCurrencies = createAsyncThunk(
  "currencies/loadCurrencies",
  async () => {
    let data = await client.query({ query: GET_CURRENCIES_QUERY });
    return data.data.currencies;
  }
);

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async () => {
    let data = await client.query({ query: GET_CATEGORIES_QUERY });
    return data.data.categories;
  }
);
