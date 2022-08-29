import { createSelector } from "reselect";

export const selectCartData = (state) => state.items;

export const selectCartItemsCount = createSelector([selectCartData], (items) =>
  items.reduce((quantity, item) => quantity + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartData], (items) =>
  items.reduce(
    (quantity, item) => quantity + item.quantity * item.prices[0].amount,
    0
  )
);
