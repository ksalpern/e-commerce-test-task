// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import menuReducer from "./reducers";

// const store = createStore(menuReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productsReducer from "../app/reducers";
// import productReducer from "./productReducer";
// import currenciesReducer from "./currenciesReducer";
// import categoriesReducer from "./categoriesReducer";
// import busketReducer from "./busketReducer";

const persistConfig = {
  key: "busket",
  version: 1,
  storage,
  whitelist: ["busket"],
};

const reducer = combineReducers({
  products: productsReducer,
//   product: productReducer,
//   currencies: currenciesReducer,
//   categories: categoriesReducer,
//   busket: busketReducer,
});

let persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
