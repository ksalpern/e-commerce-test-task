import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../index";
import { GET_CATEGORIES_QUERY } from "../queries";

const initCategoriesState = {
  categoryNames: [],
  isLoadingCategories: false,
  failedToLoadCategories: false,
};

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async () => {
    let data = await client.query({ query: GET_CATEGORIES_QUERY });
    return data.data.categories;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initCategoriesState,

  extraReducers: {
    [loadCategories.pending]: (state) => {
      state.isLoadingCategories = true;
      state.failedToLoadCategories = false;
    },
    [loadCategories.fulfilled]: (state, action) => {
      if (action.payload.length !== 0) {
        action.payload.forEach((cat) => {
          state.categoryNames.push(cat.name);
        });
      }
    },
    [loadCategories.rejected]: (state) => {
      state.isLoadingCategories = false;
      state.failedToLoadCategories = true;
    },
  },
});

export default categoriesSlice.reducer;
