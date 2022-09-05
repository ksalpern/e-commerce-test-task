import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../index";
import { GET_PRODUCT_QUERY } from "./Queries";

const initProductsState = {
  product: {},
  prodAtts: [],
  isLoadingProduct: false,
  failedToLoadProduct: false,
};

export const loadProduct = createAsyncThunk(
  "product/loadProduct",
  async (id) => {
    const data = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: { id: id },
    });
    return data.data.product;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initProductsState,
  reducers: {
    setCustomAttributes: (state) => {
      let active = { active: false };
      let isSwatch = { isSwatch: false };

      state.prodAtts !== 0 &&
        state.prodAtts.forEach((att) => {
          att.items.forEach((attItem, index) => {
            let attItem2 = { ...attItem, ...active, ...isSwatch };
            att.items[index] = attItem2;
          });
        });
    },
    setActiveAtt: (state, action) => {
      state.prodAtts !== 0 &&
        state.prodAtts.forEach((att) => {
          if (att.id === action.payload.attType) {
            att.items.forEach((attItem, index) => {
              attItem.active = attItem.value === action.payload.attValue;
              attItem.isSwatch = attItem.value.includes("#");
            });
          }
        });
    },
    clearActiveAtt: (state) => {
      state.prodAtts !== 0 &&
        state.prodAtts.forEach((att) => {
            att.items.forEach((attItem) => {
              attItem.active = false;
              attItem.isSwatch = false;
            });
        });
    },
    
  },
  extraReducers: {
    [loadProduct.pending]: (state, action) => {
      state.isLoadingProduct = true;
      state.failedToLoadProduct = false;
    },
    [loadProduct.fulfilled]: (state, action) => {
      state.prodAtts = action.payload.attributes;
      state.product = action.payload;
      state.isLoadingProduct = false;
      state.failedToLoadProduct = false;
    },
    [loadProduct.rejected]: (state, action) => {
      state.product = {};
      state.isLoadingProduct = false;
      state.failedToLoadProduct = true;
    },
  },
});

export default productSlice.reducer;
