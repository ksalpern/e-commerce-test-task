import { gql } from "@apollo/client";

// get products by category
export const GET_PRODUCTS_QUERY = gql`
  query ($cat: String!) {
    category(input: { title: $cat }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        brand
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
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

export const GET_CURRENCIES_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CATEGORIES_QUERY = gql`
query {
    categories {
  		name
    }
  }
`;
