import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import busket from "../assets/cartWhite.svg";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incart: false,
    };

    this.handleAddToBusketClick = this.handleAddToBusketClick.bind(this);
  }

  handleAddToBusketClick() {
    if (this.props.product.attributes.length !== 0) {
      alert("Please go to product page and choose attribute...");
    } else {
      let chosenAtt = { chosenAtt: [] };
      let amount = { amount: 1 };
      let toBusket = { ...this.props.product, ...chosenAtt, ...amount };

      this.props.setBusketProducts(toBusket);
    }
  }

  render() {
    return (
      <div
        className="cart"
        style={{
          opacity: !this.props.product.inStock ? 0.5 : 1,
        }}
      >
        {this.props.product.gallery.map((image, index) => {
          return (
            index === 0 && (
              <div key={index}>
                {this.props.product.inStock && (
                  <div
                    className="cart__toBusket"
                    id="CartToBusket"
                    onClick={this.handleAddToBusketClick}
                  >
                    <img src={busket} alt="" />
                  </div>
                )}
                <Link
                  to={`/${this.props.product.category}/${this.props.product.id}`}
                >
                  <div
                    className="cart__out"
                    style={{
                      display: !this.props.product.inStock ? "block" : "none",
                    }}
                  >
                    Out of stock
                  </div>
                  <div
                    className="cart__img"
                    style={{ backgroundImage: `url(${image})` }}
                    alt="main logo"
                  ></div>
                </Link>
              </div>
            )
          );
        })}
        <Link
          className="link"
          to={`/${this.props.product.category}/${this.props.product.id}`}
        >
          <div className="cart__brand">{this.props.product.brand}</div>
        </Link>
        <Link
          className="link"
          to={`/${this.props.product.category}/${this.props.product.id}`}
        >
          <div className="cart__name">{this.props.product.name}</div>
        </Link>

        <div className="cart__price">
          {this.props.product.prices.map((price, index) => {
            return (
              price.currency.label === this.props.currency.label && (
                <div
                  key={index}
                >{`${price.currency.symbol}${price.amount}`}</div>
              )
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    busketProducts: state.busket.busketProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBusketProducts: (busketProducts) =>
      dispatch({ type: "busket/setBusketProducts", payload: busketProducts }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
