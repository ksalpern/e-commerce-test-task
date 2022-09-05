import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../index";
import { GET_CURRENCIES_QUERY } from "../queries";

const initCurrenciesState = {
  currencies: [],
  currency: {
    label: "USD",
    symbol: "$",
  },
  isLoadingCurrencies: false,
  failedToLoadCurrencies: false,
};

export const loadCurrencies = createAsyncThunk(
  "currencies/loadCurrencies",
  async () => {
    let data = await client.query({ query: GET_CURRENCIES_QUERY });
    return data.data.currencies;
  }
);

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initCurrenciesState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency.label = action.payload.label;
      state.currency.symbol = action.payload.symbol;
    },
  },
  extraReducers: {
    [loadCurrencies.pending]: (state) => {
      state.isLoadingCurrencies = true;
      state.failedToLoadCurrencies = false;
    },
    [loadCurrencies.fulfilled]: (state, action) => {
      if (action.payload.length !== 0) {
        action.payload.forEach((currency) => {
          state.currencies.push(currency);
        });
      }
    },
    [loadCurrencies.rejected]: (state) => {
      state.isLoadingCurrencies = false;
      state.failedToLoadCurrencies = true;
    },
  },
});

export default currenciesSlice.reducer;
