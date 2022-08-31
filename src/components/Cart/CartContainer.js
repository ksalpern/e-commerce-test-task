import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addItemToCartHandler,
  removeItemFromCartHandler,
} from "../../app/actions";
import { selectCartItemsCount, selectCartTotal } from "../../app/cartSelectors";
import DisplayCartItems from "../../features/Cart";

class CartContainer extends Component {
  render() {
    return (
      <div className="cartContainer">
        <h1 className="cartContainer__header">Cart</h1>
        {this.props.items.length > 0 ? (
          <>
            <DisplayCartItems
              items={this.props.items}
              handleCartClick={this.props.addItemToCartHandler}
              handleRemoveCartClick={this.props.removeItemFromCartHandler}
            />
            <section className="cartContainer__order">
              <p>
                tax 21%:
                <strong>${(this.props.totalPrice * 0.21).toFixed(2)}</strong>
              </p>
              <p>
                Quantity: <strong>{this.props.totalNumberCartItems}</strong>
              </p>
              <p className="cartContainer__total">
                total: <strong>${this.props.totalPrice.toFixed(2)}</strong>
              </p>

              <button className="cartContainer__order-btn">Order</button>
            </section>
          </>
        ) : (
          <p className="cartContainer__empty">
            You Have No Items In Your Cart !
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    totalNumberCartItems: selectCartItemsCount(state),
    totalPrice: selectCartTotal(state),
  };
};

export default connect(mapStateToProps, {
  addItemToCartHandler,
  removeItemFromCartHandler,
})(CartContainer);
