import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import MinicartModal from "./Modals/MinicartModal";
import CurrencySelectorModal from "./Modals/CurrencySelectorModal";
import "./Header.css";
import "../App.css";

import logo from "../assets/greenCart.svg";
import busket from "../assets/cart.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMinicart: false,
      isOpenSelector: false,
    };
    this.selectorArrow = React.createRef();
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.toggleModalMinicart = this.toggleModalMinicart.bind(this);
    this.toggleModalSelector = this.toggleModalSelector.bind(this);
  }

  handleCategoryClick(cat) {
    this.props.saveCategoryToStore(cat);
  }

  toggleModalMinicart() {
    this.setState({ isOpenMinicart: !this.state.isOpenMinicart });
  }
  toggleModalSelector() {
    this.setState({ isOpenSelector: !this.state.isOpenSelector });
    if (!this.state.isOpenSelector) {
      this.selectorArrow.current.style.transform = "rotate(270deg)";
    } else {
      this.selectorArrow.current.style.transform = "rotate(90deg)";
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header__list">
          {this.props.categoryNames.map((cat) => {
            let active = cat === this.props.category;
            return (
              <NavLink className="navLink" key={cat} to={`/${cat}`}>
                <div
                  className="header__list-item"
                  onClick={() => this.handleCategoryClick(cat)}
                  style={{
                    borderBottom: active && "solid",
                    borderBottomWidth: active && "2px",
                    borderColor: active && "#5ECE7B",
                    color: active && "#5ECE7B",
                  }}
                  key={cat}
                >
                  {cat}
                </div>
              </NavLink>
            );
          })}
        </div>
        <img src={logo} alt="" />
        <div className="header__cart">
          <div
            className="header__currency-selector"
            onClick={this.toggleModalSelector}
          >
            <span className="header__cart-header">
              {this.props.currency.symbol}
            </span>
            <span className="arrow" ref={this.selectorArrow}>
              {">"}
            </span>
          </div>
          <div className="header__cart-logo" onClick={this.toggleModalMinicart}>
            {this.props.busketCounter !== 0 && (
              <div className="header__cart-counter">
                {this.props.busketCounter}
              </div>
            )}
            <img className="header__cart-img" src={busket} alt='' />
          </div>

          <MinicartModal
            isOpen={this.state.isOpenMinicart}
            toggleModalMinicart={this.toggleModalMinicart}
          />
          <CurrencySelectorModal
            isOpen={this.state.isOpenSelector}
            toggleModalSelector={this.toggleModalSelector}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.products.allProducts,
    categoryNames: state.categories.categoryNames,
    currency: state.currencies.currency,
    category: state.products.category,
    busketCounter: state.busket.busketCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategoryToStore: (cat) =>
      dispatch({ type: "products/setCategory", payload: cat }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
