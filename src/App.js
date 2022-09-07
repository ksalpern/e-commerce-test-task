import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { loadCurrencies } from "./store/currenciesReducer";
import { loadCategories } from "./store/categoriesReducer";

import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import ProductListing from "./components/ProductListing";

class App extends Component {
  constructor(props) {
    super(props);
    this.selectCurrency = this.selectCurrency.bind(this);
  }

  componentDidMount() {
    this.props.saveCurrenciesToStore();
    this.props.saveCategoriesToStore();
  }

  selectCurrency(e) {
    this.setState({
      currency: e.target.value,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <ProductListing />
          </Route>
          <Route path="/:category/:id">
            <ProductPage />
          </Route>
          <Route path="/:category">
            <ProductListing />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.products.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrenciesToStore: () => loadCurrencies()(dispatch),
    saveCategoriesToStore: () => loadCategories()(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
