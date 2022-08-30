import React, { Component } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withHooksHOC } from "../../app/hoc";
import { showMenu, showCart } from "../../app/actions";
import { selectCartItemsCount } from '../../app/cartSelectors'

import cart from "../../assets/cart.svg";
import greenCart from "../../assets/greenCart.svg";
import DisplayCurrency from "../../features/DisplayCurrency";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggleCurrencyDropdown = this.toggleCurrencyDropdown.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }
  toggleCurrencyDropdown() {
    this.props.showMenu();
  }
  toggleMiniCart() {
    this.props.showCart();
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <>
        <div className="navbar">
          <ul className="navbar__container">
            <li className="navbar__links">
              <NavLink
                to="./pages/all"
                className={path === "/pages/all" ? "active" : ""}
              >
                All
              </NavLink>
            </li>
            <li className="navbar__links">
              <NavLink
                to="./pages/clothes"
                className={path === "/pages/clothes" ? "active" : ""}
              >
                Clothes
              </NavLink>
            </li>
            <li className="navbar__links">
              <NavLink
                to="./pages/tech"
                className={path === "/pages/tech" ? "active" : ""}
              >
                Tech
              </NavLink>
            </li>
          </ul>
          <NavLink to="./" className="navbar__logo">
            <img src={greenCart} alt="" />
          </NavLink>
          <section className="navbar__categories">
            <a
              href="\\"
              onClick={this.toggleCurrencyDown}
              className="navbar__currency"
            >
              <strong>$</strong>
            </a>
            <ul
              className={
                this.props.setOpen
                  ? "navbar__dropdown"
                  : "navbar__dropdown-show"
              }
            >
              <DisplayCurrency/>
              currency
            </ul>
            <div className="navbar__cart">
              <button className="navbar__cart-btn">
                <span className="navbar__counter">
                  {this.props.totalNumberCartItems}
                </span>
                <img src={cart} alt="cart" />
              </button>
              {/* {this.props.show && <MiniCart  totalItems={this.props.totalNumberCartItems}/>} */}
            </div>
          </section>
        </div>
        <div className={this.props.show ? "navbar__backdrop" : null}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setOpen: state.setOpen,
    show: state.show,
    items: state.items,
    totalNumberCartItems: selectCartItemsCount(state),
  };
};

export default connect(mapStateToProps, { showMenu, showCart })(
  withHooksHOC(Navbar)
);
