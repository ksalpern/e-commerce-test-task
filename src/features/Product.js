import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCartHandler, addProduct } from "../app/actions";

const Product = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAttributeOne, setSelectedAttributeOne] = useState(false);
  const [selectedAttributeTwo, setSelectedAttributeTwo] = useState(false);
  const [selectedAttributeThree, setSelectedAttributeThree] = useState(false);
  const [selectedAttributeFour, setSelectedAttributeFour] = useState(false);

  const PRODUCT_QUERY = gql`
  query GetAProduct {
    product(id: "${id}") {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;

  const { loading, error, data } = useQuery(PRODUCT_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;

  const Src_One = data.product.gallery[0];
  const name = data.product.name;
  const brand = data.product.brand;
  const attributes = data.product.attributes;
  const price = data.product.prices[0].amount;
  const currency = data.product.prices[0].currency.symbol;
  const description = data.product.description.replace(/(<([^>]+)>)/gi, "");
  const imageSrc = data.product.gallery;

  const handleAddToCart = (item) => {
    if (!item) return;
    dispatch(addProduct(item));
  };

  return (
    <div className="product">
      <div className="product__mini-photos">
        {/* IMAGES */}
        {imageSrc.map((src, id) => {
          return (
            <img
              key={id}
              className="product__mini-photo"
              src={src}
              alt={id}
              onClick={() => setSelectedImage(src)}
            />
          );
        })}
      </div>
      <div className="product__large-photo">
        <img src={selectedImage === null ? Src_One : selectedImage} alt={id} />
      </div>
      <div className="product__item-description">
        <section className="product__item-title">
          <h3 className="product__brand">{brand}</h3>
          <h3 className="product__type">{name}</h3>
        </section>

        {/* ATTRIBUTES */}
        {attributes &&
          attributes.map(({ name, items, type, id }) => {
            return (
              <div key={id}>
                {type === "text" ? (
                  <section key={id} className="product__size">
                    <h3 className="product__item-header">{name}:</h3>
                    <div className="product__size-container">
                      {items.map(({ value, id }) => {
                        return (
                          <button
                            key={id}
                            onClick={() => {
                              name === "Capacity"
                                ? setSelectedAttributeOne(`${value}-${name}`)
                                : name === "With USB 3 ports"
                                ? setSelectedAttributeTwo(`${value}-${name}`)
                                : setSelectedAttributeThree(`${value}-${name}`);
                            }}
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
                  <section key={id} className="product__color">
                    <h3 className="product__item-header">{name}:</h3>
                    <div className="product__colors-container">
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
        <section className="product__price-container">
          <h3 className="product__item-heading">Price:</h3>
          <h3 className="product__price">
            {currency}
            {price}
          </h3>
        </section>
        <div className="product__btn-cart-container">
          <button
            onClick={() => {
              addItemToCartHandler({
                ...data.product,
                selectedAttributeOne,
                selectedAttributeTwo,
                selectedAttributeThree,
                selectedAttributeFour,
                amount: 1,
              });
              handleAddToCart(data.product);
            }}
            className="product__btn-add-to-cart"
          >
            ADD TO CART
          </button>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
