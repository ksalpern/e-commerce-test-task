import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import DisplayMiniCartItems from "../../../features/MCart";
import { selectCartTotal } from '../../../app/cartSelectors';

class MiniCart extends Component {
  render() {
    return (
      <div className="miniCart">
        <div className="miniCart__total">
          <h3 className="miniCart__items">
            My Bag,{" "}
            <span className="miniCart__number">
              {this.props.totalItems} Items
            </span>
          </h3>
        </div>
        {this.props.items.length > 0 ? (
          <>
            <DisplayMiniCartItems items={this.props.items} />
            <div className="miniCart__check-out">
              <h3>Total</h3>
              <h3>${this.props.totalPrice.toFixed(2)}</h3>
            </div>
            <div className="miniCart__check-btn-container">
              <NavLink to="./pages/cart">
                <button className="miniCart__btn-default">View Bag </button>
              </NavLink>
              <button className="miniCart__btn-default">Check Out</button>
            </div>
          </>
        ) : (
          <p className="miniCart__empty">You Have No Items In Your Cart !</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    totalPrice: selectCartTotal(state),
  };
};
export default connect(mapStateToProps, null)(MiniCart);
