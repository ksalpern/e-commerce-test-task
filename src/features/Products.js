import React from "react";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import Cart from "../assets/cartWhite.svg";
import { PRODUCTS_QUERY } from "../app/queries";

const DisplayProducts = (props) => {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;

  return data.categories[0].products.map(
    ({ id, inStock, name, gallery, prices }) => {
      return (
        <NavLink key={id} to={inStock && `./products/${id}`}>
          <section className={inStock ? "displayProducts__card" : "displayProducts__card-disable"}>
            <div className="displayProducts__card-image">
              <div className="displayProducts__product-image">
                <img
                  className="displayProducts__product"
                  src={gallery[5] ? gallery[5] : gallery[0]}
                  alt={id}
                />
                <button className="displayProducts__cart-icon">
                  <img src={Cart} alt="" />
                </button>
              </div>
            </div>
            <section className="displayProducts__card-description">
              <h4 className="displayProducts__card-header">{name}</h4>
              <p className="displayProducts__cost">
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
export default DisplayProducts;
