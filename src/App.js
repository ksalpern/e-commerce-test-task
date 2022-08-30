import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CardsContainer from "./components/CardsContainer/CardsContainer";
import Navbar from "./components/Navbar/Navbar";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Navbar />
          <Routes>
             <Route path="/" element={<CardsContainer title="Home" />} />
           {/* <Route path="/pages/all" element={<All />} />
            <Route path="/pages/clothes" element={<Clothes />} />
            <Route path="/pages/tech" element={<Tech />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/pages/all/products/:id" element={<Product />} />
            <Route path="/pages/clothes/products/:id" element={<Product />} />
            <Route path="/pages/tech/products/:id" element={<Product />} />
            <Route path="/pages/Cart" element={<Cart />} /> */}
          </Routes>
        </Router>
      </div>
    );
  }
}
