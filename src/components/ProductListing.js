import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import { loadProducts } from "../store/productsReducer";

import Cart from "../components/Cart";
import "./ProductListing.css";
import Container from "./Container";

class ProductListing extends Component {
  componentDidMount() {
    if (this.props.categoryParams !== undefined) {
      this.props.categoryParams === this.props.category &&
        this.props.saveProductsToStore(this.props.category);

      this.props.saveCategoryToStore(this.props.categoryParams);
      this.props.saveProductsToStore(this.props.categoryParams);
    } else {
      this.props.saveProductsToStore(this.props.category);
    }
  }
  render() {
    return (
      <Container>
        <div className="productListing">
          <h1 className="productListing__header">{this.props.category}</h1>

          {this.props.isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="productListing__items">
              {this.props.products.map((prod, index) => {
                return (
                  <Cart
                    product={prod}
                    key={index}
                    currency={this.props.currency}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Container>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryParams !== prevProps.categoryParams) {
      this.props.saveProductsToStore(this.props.categoryParams);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const cat = ownProps.match.params.category;

  return {
    products: state.products.allProducts,
    categoryParams: cat,
    category: state.products.category,
    isLoading: state.products.isLoadingProducts,
    currency: state.currencies.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductsToStore: (cat) => loadProducts(cat)(dispatch),
    saveCategoryToStore: (cat) =>
      dispatch({ type: "products/setCategory", payload: cat }),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductListing);
