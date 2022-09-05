import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SHOW_CART,
  SHOW_MENU,
  REDUCE_CART_ITEM,
  ADD_TO_CART_,
} from "./reducers";

const showMenu = () => (dispatch) => {
  dispatch({ type: SHOW_MENU });
};

const showCart = () => (dispatch) => {
  dispatch({ type: SHOW_CART });
};

const addProduct = (item) => ({
  type: ADD_TO_CART_,
  payload: item,
});

const addItemToCartHandler = (item) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: item });
};

const removeItemFromCartHandler = (item) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: item });
};

const reduceCartItem = (item) => ({
  type: REDUCE_CART_ITEM,
  payload: item,
});

export {
  showMenu,
  showCart,
  addItemToCartHandler,
  removeItemFromCartHandler,
  reduceCartItem,
  addProduct,
};
