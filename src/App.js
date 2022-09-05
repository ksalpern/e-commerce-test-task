import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { loadCurrencies } from "./store/currenciesReducer";
import { loadCategories } from "./store/categoriesReducer";

import Container from "./components/Container";
import ProductListing from "./components/ProductListing";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";

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
            <Container>
              <ProductListing />
            </Container>
          </Route>
          <Route exact path="/cart">
            <Container>
              <CartPage />
            </Container>
          </Route>
          <Route path="/:category/:id">
            <Container>
              <ProductPage />
            </Container>
          </Route>
          <Route path="/:category">
            <Container>
              <ProductListing />
            </Container>
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
