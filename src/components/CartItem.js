import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import "../App.css";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handlePrevButton() {
    if (
      this.state.imageIndex > 0 &&
      this.state.imageIndex <= this.props.product.gallery.length
    ) {
      this.setState((prevState) => {
        return { imageIndex: --prevState.imageIndex };
      });
    } else {
      this.setState({
        imageIndex: this.props.product.gallery.length - 1,
      });
    }
  }
  handleNextButton() {
    if (
      this.state.imageIndex >= 0 &&
      this.state.imageIndex < this.props.product.gallery.length - 1
    ) {
      this.setState((prevState) => {
        return { imageIndex: ++prevState.imageIndex };
      });
    } else {
      this.setState({
        imageIndex: 0,
      });
    }
  }

  handlePlus(id) {
    this.props.saveCounterForProduct({
      type: "plus",
      productId: id,
      atts: this.props.product.chosenAtt,
    });
  }
  handleMinus(id) {
    this.props.saveCounterForProduct({
      type: "minus",
      productId: id,
      atts: this.props.product.chosenAtt,
    });
  }

  handleDelete(id) {
    this.props.deleteFromBusket(this.props.productIndex, id);
  }

  render() {
    return (
      <div
        key={this.props.product.id}
        className={this.props.busket ? "rowBusket" : "rowMinicart"}
      >
        <div
          className={this.props.busket ? "rowLeftBusket" : "rowLeftMinicart"}
        >
          <div
            className={this.props.busket ? "brandBusket" : "brandNameMinicart"}
          >
            {this.props.product.brand}
          </div>

          <div
            className={this.props.busket ? "nameBusket" : "brandNameMinicart"}
          >
            {this.props.product.name}
          </div>

          <div>
            {this.props.product.prices.map((price, index) => {
              return (
                <div
                  className={
                    this.props.busket ? "priceBusket" : "priceMinicart"
                  }
                  key={index}
                >
                  {price.currency.label === this.props.currency.label && (
                    <div>{`${price.currency.symbol}${price.amount}`}</div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            className={this.props.busket ? "attListBusket" : "attListMinicart"}
            ref={(ref) => (this.chosenAttRef = ref)}
          >
            {this.props.product.chosenAtt.length !== 0 &&
              this.props.product.chosenAtt.map((att, index) => {
                return (
                  <div
                    className={
                      this.props.busket
                        ? "attListRowBusket"
                        : "attListRowMinicart"
                    }
                    key={index}
                  >
                    <div
                      className={
                        this.props.busket ? "attNameBusket" : "attNameMinicart"
                      }
                    >
                      {att.attId}
                    </div>
                    <div
                      className={
                        this.props.busket ? "attItemBusket" : "attItemMinicart"
                      }
                      style={{
                        backgroundColor: att.attItemId.includes("#")
                          ? att.attItemId
                          : "white",
                      }}
                    >
                      {!att.attItemId.includes("#") && att.attItemId}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div
          className={this.props.busket ? "rowRightBusket" : "rowRightMinicart"}
        >
          <div
            className={this.props.busket ? "counterBusket" : "counterMinicart"}
          >
            <div
              className={
                this.props.busket ? "counterIconBusket" : "counterIconMinicart"
              }
              onClick={() => this.handlePlus(this.props.product.id)}
            >
              +
            </div>
            <div>{this.props.product.amount}</div>
            <div
              className={
                this.props.busket ? "counterIconBusket" : "counterIconMinicart"
              }
              onClick={() => this.handleMinus(this.props.product.id)}
            >
              -
            </div>
          </div>
          <div>
            <div
              className={this.props.busket ? "imageBusket" : "imageMinicart"}
              style={{
                backgroundImage: `url(${
                  this.props.product.gallery[this.state.imageIndex]
                })`,
              }}
              alt="product picture"
            >
              {this.props.product.gallery.length > 1 && (
                <ArrowLeft onClick={this.handlePrevButton}>{"<"}</ArrowLeft>
              )}
              {this.props.product.gallery.length > 1 && (
                <ArrowRight onClick={this.handleNextButton}>{">"}</ArrowRight>
              )}
              <DeleteItem
                onClick={() => this.handleDelete(this.props.product.id)}
              >
                X
              </DeleteItem>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencies.currency,
    busketProducts: state.busket.busketProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCounterForProduct: (data) =>
      dispatch({ type: "busket/saveCounterForProduct", payload: data }),
    deleteFromBusket: (index, id) =>
      dispatch({
        type: "busket/deleteFromBusket",
        payload: { index: index, id: id },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

const ArrowLeft = styled.div`
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translate(10%, -50%);
  cursor: pointer;
  font-size: 24px;
`;

const ArrowRight = styled.div`
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translate(-10%, -50%);
  cursor: pointer;
  font-size: 24px;
`;

const DeleteItem = styled.div`
  position: absolute;
  background-color: red;
  text-align: center;
  line-height: 20px;
  color: white;
  right: 0%;
  width: 20px;
  height: 20px;
  top: 10px;
  transform: translate(-10%, -50%);
  cursor: pointer;
  font-size: 18px;
`;
