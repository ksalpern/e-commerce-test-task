import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "./Minicart.css";
import "../App.css";

class Minicart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    this.props.busketProducts.forEach((prod) => {
      prod.prices.forEach((price) => {
        if (price.currency.label === this.props.currency.label) {
          total += prod.amount * price.amount;
        }
      });
    });

    this.setState({ total: total.toFixed(2) });
  }

  render() {
    return (
      <div className="minicart">
        <div className="minicart__title">
          {<span>My Bag,</span>}
          {`${this.props.busketCounter} items`}
        </div>
        <div className="minicart__items">
          {this.props.busketProducts.map((product, index) => {
            return (
              <CartItem
                busket={false}
                key={index}
                productIndex={index}
                product={product}
              />
            );
          })}
        </div>
        <div className="minicart__bottom">
          <div className="minicart__total">
            <span>Total</span>
            <span>{`${this.props.currency.symbol}${this.state.total}`}</span>
          </div>
          <div className="minicart__buttons">
            <Link className="navLink" to={`/cart`}>
              <div
                className="minicart__view-bag"
                onClick={this.props.toggleModalMinicart}
              >
                View bag
              </div>
            </Link>
            <div className="minicart__add">Check out</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currency !== prevProps.currency ||
      this.props.busketProducts !== prevProps.busketProducts
    ) {
      this.calculateTotal();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencies.currency,
    busketCounter: state.busket.busketCounter,
    busketProducts: state.busket.busketProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCounterForProduct: (amount) =>
      dispatch({ type: "busket/saveCounterForProduct", payload: amount }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
