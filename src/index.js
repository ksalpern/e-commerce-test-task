import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";

export const client = new ApolloClient({
  uri: "https://localhost:4000",
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
