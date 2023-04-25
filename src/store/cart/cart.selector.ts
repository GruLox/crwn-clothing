import { createSelector } from 'reselect';
import { CartItem } from './cart.types';

import { CartState } from './cart.reducer';

export const selectCartReducer = (state): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (count: number, cartItem: CartItem) => count + cartItem.quantity,
    0
  )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: CartItem) =>
      total + cartItem.quantity * cartItem.price,
    0
  )
);
