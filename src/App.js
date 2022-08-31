import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CardsContainer from "./components/CardsContainer/CardsContainer";
import CartContainer from "./components/Cart/CartContainer";
import Navbar from "./components/Navbar/Navbar";
import AllContainer from "./components/Pages/All/AllContainer";
import ClothesContainer from "./components/Pages/Clothes/ClothesContainer";
import ProductContainer from "./components/Pages/Product/ProductContainer";
import TechContainer from "./components/Pages/Tech/TechContainer";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Navbar />
          <Routes>
             <Route path="/" element={<CardsContainer title="Home" />} />
            <Route path="/pages/all" element={<AllContainer />} />
            <Route path="/pages/clothes" element={<ClothesContainer />} />
           <Route path="/pages/tech" element={<TechContainer />} />
             <Route path="/products/:id" element={<ProductContainer />} />
           {/* <Route path="/pages/all/products/:id" element={<Product />} />
            <Route path="/pages/clothes/products/:id" element={<Product />} />
            <Route path="/pages/tech/products/:id" element={<Product />} />*/}
            <Route path="/pages/Cart" element={<CartContainer />} /> 
          </Routes>
        </Router>
      </div>
    );
  }
}
