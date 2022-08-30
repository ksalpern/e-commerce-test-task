import { gql } from "@apollo/client";

/* currency - navbar */
export const CURRENCIES_QUERY = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
