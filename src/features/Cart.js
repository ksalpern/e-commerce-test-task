import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  removeItemFromCartHandler,
  reduceCartItem,
  addProduct,
} from "../app/actions";

const DisplayCartItems = (props) => {
  const dispatch = useDispatch();
  const [selectedAttributeOne, setSelectedAttributeOne] = useState(false);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState(false);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState(false);
  const [selectedAttributeFour, setSelectedAttributeFour] = useState(false);

  return props.items.map((item) => {
    const handleAddProduct = (item) => {
      dispatch(addProduct(item));
    };

    const handleRemoveCartItem = (id) => {
      dispatch(
        removeItemFromCartHandler({
          id,
        })
      );
    };

    const handleReduceItem = (item) => {
      dispatch(reduceCartItem(item));
    };
    console.log(props);

    return (
      <section key={item.id} className="displayCartItems">
        <div className="displayCartItems__description">
          <section className="displayCartItems__title">
            <h3 className="displayCartItems__brand">{item.brand}</h3>
            <h3 className="displayCartItems__type">{item.name}</h3>
            <h3 className="displayCartItems__price">
              {item.prices[0].currency.symbol}
              {(item.prices[0].amount * item.quantity).toFixed(2)}
            </h3>
          </section>
          {/* ATTRIBUTES */}
          {item.attributes &&
            item.attributes.map(({ name, items, type, id }) => {
              return (
                <div key={id}>
                  {type === "text" ? (
                    <section key={id} className="displayCartItems__size">
                      <h3 className="displayCartItems__header">{name}:</h3>
                      <div className="displayCartItems__size">
                        {items.map(({ value, id }) => {
                          return (
                            <button
                              onClick={() => {
                                name === "Capacity"
                                  ? setSelectedAttributeOne(`${value}-${name}`)
                                  : name === "With USB 3 ports"
                                  ? setSelectedAttributeTwo(`${value}-${name}`)
                                  : setSelectedAttributeThree(
                                      `${value}-${name}`
                                    );
                              }}
                              key={id}
                              className={
                                selectedAttributeOne === `${value}-${name}` ||
                                selectedAttributeTwo === `${value}-${name}` ||
                                selectedAttributeThree === `${value}-${name}`
                                  ? "btn-default-active"
                                  : "btn-default"
                              }
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ) : (
                    <section key={id} className="displayCartItems__color">
                      <h3 className="displayCartItems__header">{name}:</h3>
                      <div className="displayCartItems__color">
                        {items.map(({ value, id }) => {
                          return (
                            <button
                              onClick={() => {
                                setSelectedAttributeFour(`${value}-${name}`);
                              }}
                              key={id}
                              style={{ backgroundColor: value }}
                              className={
                                selectedAttributeFour === `${value}-${name}`
                                  ? "btn-color-active"
                                  : "btn-color"
                              }
                            ></button>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </div>
              );
            })}
        </div>
        <div className="displayCartItems__counter">
          <div className="displayCartItems__counter-item">
            <button
              onClick={() => {
                handleAddProduct(item);
              }}
              className="btn-default"
            >
              +
            </button>
            <p className="num-items">{item.quantity}</p>
            <button
              onClick={() => {
                handleReduceItem(item);
              }}
              className="btn-default"
            >
              -
            </button>
          </div>
          <div className="cart__image">
            <img src={item.gallery[0]} alt="" />
            <button className="arrow"> &lt;</button>
            <button className="arrow"> &gt; </button>
            <button
              onClick={() => {
                handleRemoveCartItem(item.id);
              }}
              className="arrow"
            >
              {" "}
              x{" "}
            </button>
          </div>
        </div>
      </section>
    );
  });
};

export default DisplayCartItems;
