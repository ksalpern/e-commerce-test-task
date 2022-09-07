import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import BusketItem from "./BusketItem";
import Container from "./Container";

class CartPage extends Component {
  render() {
    return (
      <Container>
        <CartContainer>
          <CartTitle>Cart</CartTitle>
          {(this.props.busketProducts.length !== 0
            ? this.props.busketProducts
            : this.props.busketProducts
          ).map((product, index) => {
            return (
              <BusketItem
                busket={true}
                key={product.id}
                product={product}
                productIndex={index}
              />
            );
          })}
        </CartContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    busketProducts: state.busket.busketProducts,
  };
};

export default connect(mapStateToProps)(CartPage);

const CartContainer = styled.div`
  display: block;
  padding-right: calc(0px + (242 - 0) * ((100vw - 320px) / (1440 - 320)));
  padding-left: calc(10px + (100 - 10) * ((100vw - 320px) / (1440 - 320)));
`;
const CartTitle = styled.h2`
  font-family: Raleway;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  text-transform: uppercase;
  margin-top: calc(10px + (0 - 10) * ((100vw - 320px) / (1440 - 320)));
  margin-bottom: calc(20px + (80 - 20) * ((100vw - 320px) / (1440 - 320)));
`;
