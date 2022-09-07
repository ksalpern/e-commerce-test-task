import React, { Component } from "react";
import parse from "html-react-parser";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";
import { loadProduct } from "../store/productReducer";

import "./ProductPage.css";
import "../App.css";
import styled from "styled-components";
import Container from "./Container";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      clickedAtts: [],
      swatch: false,
      activeAtt: [],
    };
    this.setCurrentImage = this.setCurrentImage.bind(this);
    this.setCurrentAtt = this.setCurrentAtt.bind(this);
    this.handleAddToBusketClick = this.handleAddToBusketClick.bind(this);
  }

  async componentDidMount() {
    await this.props.saveProductToStore(this.props.productId);
    !this.props.isLoading && this.props.setCustomAttributes();
  }

  setCurrentImage(index) {
    this.setState({
      currentImageIndex: index,
    });
  }

  handleAttClick(attType, attValue) {
    this.setCurrentAtt(attType, attValue);
    this.props.setActiveAtt(attType, attValue);
  }

  setCurrentAtt(attType, attValue) {
    let attObj = {
      attId: attType,
      attItemId: attValue,
    };

    if (this.props.chosenAtts.length !== 0) {
      let attIds = [];
      this.props.chosenAtts.forEach((att) => {
        attIds.push(att.attId);
        if (att.attId === attType && att.attItemId !== attValue) {
          this.props.updateChosenAtts(attObj);
        }
      });

      if (!attIds.includes(attType)) {
        this.props.setChosenAtts(attObj);
      }
    } else {
      this.props.setChosenAtts(attObj);
    }
  }

  checkAttChosen() {
    if (this.props.chosenAtts.length === 0) {
      let stringOfAtt = "";

      for (let i = 0; i < this.props.product.attributes.length; i++) {
        if (i < this.props.product.attributes.length - 1) {
          stringOfAtt += `${this.props.product.attributes[i].id} and `;
        }
        if (i === this.props.product.attributes.length - 1) {
          stringOfAtt += `${this.props.product.attributes[i].id}`;
        }
      }
      alert(`Please choose ${stringOfAtt} `);
      return;
    }

    if (this.props.product.attributes.length > this.props.chosenAtts.length) {
      alert("Select all attributes of the product...");
      return;
    }
  }

  handleAddToBusketClick() {
    this.checkAttChosen();

    let chosenAtt = { chosenAtt: this.props.chosenAtts };
    let amount = { amount: 1 };

    let toBusketProducts = { ...this.props.product, ...chosenAtt, ...amount };

    this.props.setBusketProducts(toBusketProducts);
    this.props.clearActiveAtt();
  }

  render() {
    return (
      <Container>
        <div className="productPage__container">
          <div>
            {this.props.isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {this.props.product.gallery && (
                  <div className="productPage">
                    <div className="productPage__image-row">
                      {this.props.product.gallery.map((image, index) => {
                        return (
                          <div
                            className="productPage__image-item"
                            key={index}
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => this.setCurrentImage(index)}
                            alt="product"
                          ></div>
                        );
                      })}
                    </div>

                    <div
                      className="productPage__image"
                      style={{
                        backgroundImage: `url(${
                          this.props.product.gallery[
                            this.state.currentImageIndex
                          ]
                        })`,
                      }}
                      alt="main logo"
                    ></div>
                    <div className="productPage__info">
                      <div className="productPage__brand">
                        {this.props.product.brand}
                      </div>
                      <div className="productPage__name">
                        {this.props.product.name}
                      </div>
                      <div className="productPage__att-list">
                        {this.props.prodAtts.length !== 0 &&
                          this.props.prodAtts.map((att, index) => {
                            return (
                              <div key={index} className="pdpAttListContainer">
                                <div className="productPage__header">{`${att.id}:`}</div>
                                <div className="pdpAttList">
                                  {att.items.map((attItem) => {
                                    return (
                                      <AttItem
                                        key={attItem.value}
                                        style={{
                                          backgroundColor:
                                            attItem.value.includes("#")
                                              ? attItem.value
                                              : "white",
                                        }}
                                        className={[
                                          attItem.active && !attItem.isSwatch
                                            ? "activeAtt"
                                            : null,
                                          attItem.isSwatch && attItem.active
                                            ? "activeSwatch"
                                            : null,
                                        ]}
                                        onClick={() => {
                                          this.handleAttClick(
                                            att.id,
                                            attItem.value
                                          );
                                        }}
                                        id={attItem.value}
                                      >
                                        {!attItem.value.includes("#") &&
                                          attItem.value}
                                      </AttItem>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="productPage__header">Price:</div>
                      <div>
                        {this.props.product.prices.map((price, index) => {
                          return (
                            price.currency.label ===
                              this.props.currency.label && (
                              <div
                                className="productPage__price"
                                key={index}
                              >{`${price.currency.symbol}${price.amount}`}</div>
                            )
                          );
                        })}
                      </div>
                      {this.props.product.inStock ? (
                        <div
                          className="productPage__btn"
                          onClick={this.handleAddToBusketClick}
                        >
                          Add to cart
                        </div>
                      ) : (
                        <p className="pdpOutOfStock">
                          Product is out of stock...
                        </p>
                      )}
                      <div className="productPage__descr">
                        {parse(this.props.product.description)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.props.saveProductToStore(this.props.productId);
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return {
    productId: id,
    currency: state.currencies.currency,
    product: state.product.product,
    isLoading: state.product.isLoadingProduct,
    busketProducts: state.busket.busketProducts,
    chosenAtts: state.busket.chosenAtts,
    prodAtts: state.product.prodAtts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductToStore: (productId) => loadProduct(productId)(dispatch),
    clearActiveAtt: () => dispatch({ type: "product/clearActiveAtt" }),
    setCustomAttributes: () =>
      dispatch({ type: "product/setCustomAttributes" }),

    setBusketProducts: (busketProducts) =>
      dispatch({ type: "busket/setBusketProducts", payload: busketProducts }),

    saveCounterForProduct: (amount) =>
      dispatch({ type: "busket/saveCounterForProduct", payload: amount }),

    setChosenAtts: (att) =>
      dispatch({ type: "busket/setChosenAtts", payload: att }),

    updateChosenAtts: (att) =>
      dispatch({ type: "busket/updateChosenAtts", payload: att }),

    setActiveAtt: (attType, attValue) =>
      dispatch({
        type: "product/setActiveAtt",
        payload: { attType: attType, attValue: attValue },
      }),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProductPage);

const AttItem = styled.div`
  display: flex;
  justify-content: center;
  width: 63px;
  height: 45px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-right: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  border: 1px solid #1d1f22;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #fff;
  color: #000;
`;
