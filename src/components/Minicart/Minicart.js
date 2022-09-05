import React, { Component } from "react";
import { connect } from "react-redux";
import busket from "../../assets/cart.svg";
import { Link } from "react-router-dom";

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
              <BusketItem
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
              <ViewBagButton onClick={this.props.toggleModalMinicart}>
                View bag
              </ViewBagButton>
            </Link>
            <ProductAddToCart>Check out</ProductAddToCart>
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
