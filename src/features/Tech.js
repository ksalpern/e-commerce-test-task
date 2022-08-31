import React from "react";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { PRODUCTS_QUERY } from "../app/queries";
import cart from "../assets/cartWhite.svg";

const Tech = (props) => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;

  return data.categories[2].products.map(
    ({ id, inStock, name, gallery, prices }) => {
      return (
        <NavLink key={id} to={inStock && `./products/${id}`}>
          <section className={inStock ? "card" : "card-disable"}>
            <div className="card__image">
              <div className="product__image">
                <img
                  className="product"
                  src={gallery[5] ? gallery[5] : gallery[0]}
                  alt={id}
                />
                <button className="cart__icon">
                  <img src={cart} alt="cart" />
                </button>
              </div>
            </div>
            <section className="card__description">
              <h4 className="card__header">{name}</h4>
              <p className="card__cost">
                <strong>
                  {prices[0].currency.symbol}
                  {prices[0].amount}
                </strong>
              </p>
            </section>
          </section>
        </NavLink>
      );
    }
  );
};

export default Tech;
