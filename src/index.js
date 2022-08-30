import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./app/store";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
