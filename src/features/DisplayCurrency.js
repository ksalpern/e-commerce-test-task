import React from "react";
import { useQuery } from "@apollo/client";
import { CURRENCIES_QUERY } from "../app/queries";

const DisplayCurrency = (props) => {
  const { loading, error, data } = useQuery(CURRENCIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message} ${error.extraInfo} `;
  const currencies = data.currencies;
  return currencies.map(({ label, symbol }, i) => (
    <li key={i} className="displayCurrency">
      <a href="#!" className="displayCurrency__btn">
        <strong>
          {symbol} {label}
        </strong>
      </a>
    </li>
  ));
};

export default DisplayCurrency;
