import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
        cartItems: newCartItems, 
        cartCount: newCartCount, 
        cartTotal: newCartTotal 
    })
}

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}: cartItem);
    } 
    return [...cartItems, {...productToAdd, quantity: 1}];
}; 

export const removeSingleCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === itemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}: cartItem);
    } else {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
};

export const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeSingleItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeSingleCartItem(cartItems, itemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeProductFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
