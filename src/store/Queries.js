import { gql } from "@apollo/client";

export const GET_CATEGORIES_QUERY = gql`
  query {
    categories {
      name
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

export const GET_PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      prices {
        amount
        currency {
          label
          symbol
        }
      }
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
    }
  }
`;

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
