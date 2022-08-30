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

// products query

export const PRODUCTS_QUERY = gql`
  query GetProducts {
    categories {
      name
      products {
        id
        name
        inStock
        description
        brand
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
