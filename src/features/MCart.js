import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { reduceCartItem, addProduct } from "../app/actions";

const DisplayMiniCartItems = (props) => {
  const dispatch = useDispatch();

  const [selectedAttributeOne, setSelectedAttributeOne] = useState(false);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState(false);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState(false);
  const [selectedAttributeFour, setSelectedAttributeFour] = useState(false);

  return props.items.map((item) => {
    const handleAddProduct = (item) => {
      dispatch(addProduct(item));
    };

    const handleReduceItem = (item) => {
      dispatch(reduceCartItem(item));
    };

    return (
      <div key={item.id} className="displayMCart__item">
        <div className="displayMCart__details">
          <section>
            <h4 className="displayMCart__heading">
              {item.brand} {item.name}
            </h4>
            <p className="displayMCart__cost">
              <strong>
                {item.prices[0].currency.symbol}
                {(item.prices[0].amount * item.quantity).toFixed(2)}
              </strong>
            </p>
          </section>
          {/* ATTRIBUTES */}
          {item.attributes &&
            item.attributes.map(({ name, items, type, id }) => {
              return (
                <div key={id}>
                  {type === "text" ? (
                    <section key={id} className="displayMCart__size">
                      <h3 className="displayMCart__item-heading">{name}:</h3>
                      <div className="displayMCart__size-container">
                        {items.map((attributeItemText) => {
                          return (
                            <button
                              onClick={() => {
                                name === "Capacity"
                                  ? setSelectedAttributeOne(
                                      `${attributeItemText.value}-${name}`
                                    )
                                  : name === "With USB 3 ports"
                                  ? setSelectedAttributeTwo(
                                      `${attributeItemText.value}-${name}`
                                    )
                                  : setSelectedAttributeThree(
                                      `${attributeItemText.value}-${name}`
                                    );
                              }}
                              key={attributeItemText.id}
                              className={
                                selectedAttributeOne ===
                                  `${attributeItemText.value}-${name}` ||
                                selectedAttributeTwo ===
                                  `${attributeItemText.value}-${name}` ||
                                selectedAttributeThree ===
                                  `${attributeItemText.value}-${name}`
                                  ? "btn-default-active"
                                  : "btn-default"
                              }
                            >
                              {attributeItemText.value}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ) : (
                    <section key={id} className="displayMCart__color">
                      <h3 className="displayMCart__item-heading">{name}:</h3>
                      <div className="displayMCart__colors-container">
                        {items.map((attributeItem) => {
                          return (
                            <button
                              onClick={() => {
                                setSelectedAttributeFour(
                                  `${attributeItem.value}-${name}`
                                );
                              }}
                              key={attributeItem.id}
                              style={{ backgroundColor: attributeItem.value }}
                              className={
                                selectedAttributeFour ===
                                `${attributeItem.value}-${name}`
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
        <div className="item-counter">
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
        <div className="item-image">
          <img src={item.gallery[0]} alt={item.id} />
        </div>
      </div>
    );
  });
};

export default DisplayMiniCartItems;
