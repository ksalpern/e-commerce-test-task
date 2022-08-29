export const SHOW_CART = "SHOW_CART";
export const SHOW_MENU = "SHOW_MENU";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REDUCE_CART_ITEM = "REDUCE_CART_ITEM";
export const ADD_TO_CART_ = "ADD_TO_CART_";

// utilis
const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find((item) => item.id === nextCartItem.id);
};

const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  if (cartItemExists) {
    return prevCartItems.map((item) =>
      item.id === nextCartItem.id
        ? {
            ...item,
            quantity: item.quantity + quantityIncrement,
          }
        : item
    );
  }
  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};

const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter((item) => item.id !== cartItemToRemove.id);
};

const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (item) => item.id === cartItemToReduce.id
  );
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter((item) => item.id !== existingCartItem.id);
  }

  return prevCartItems.map((item) =>
    item.id === existingCartItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
//

const initState = {
  setOpen: false,
  show: false,
  items: [],
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return {
        ...state,
        setOpen: !state.setOpen,
      };
    case SHOW_CART:
      return {
        ...state,
        show: !state.show,
      };
    case ADD_TO_CART_:
      return {
        ...state,
        items: handleAddToCart({
          prevCartItems: state.items,
          nextCartItem: action.payload,
        }),
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
          },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: handleRemoveCartItem({
          prevCartItems: state.items,
          cartItemToRemove: action.payload,
        }),
      };
    case REDUCE_CART_ITEM:
      return {
        ...state,
        items: handleReduceCartItem({
          prevCartItems: state.items,
          cartItemToReduce: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default menuReducer;
