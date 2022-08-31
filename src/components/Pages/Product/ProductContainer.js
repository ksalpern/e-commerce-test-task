import React, { Component } from "react";
import { connect } from "react-redux";
import { addItemToCartHandler } from "../../../app/actions";
import Product from "../../../features/Product";

class ProductContainer extends Component {
  render() {
    return (
      <Product
        items={this.props.items}
        handleCartClick={this.props.addItemToCartHandler}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, {
  addItemToCartHandler
})(ProductContainer)
