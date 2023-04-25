import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

import { CART_ACTION_TYPES } from './cart.types';

import { CategoryItem } from '../categories/category.types';
import { CartItem } from './cart.types';

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems);
}

export const removeSingleItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeSingleCartItem(cartItems, itemToRemove)
    return setCartItems(newCartItems);
}

export const removeProductFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return setCartItems(newCartItems);
}

export const updateCartItemsReducer = (newCartItems: CartItem[]) => {
  const newCartCount = newCartItems.reduce(
    (count, cartItem) => count + cartItem.quantity,
    0
  );
  const newCartTotal = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    cartCount: newCartCount,
    cartTotal: newCartTotal,
  });
};

export const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeSingleCartItem = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  )!;

  if (existingCartItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
};

export const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};
