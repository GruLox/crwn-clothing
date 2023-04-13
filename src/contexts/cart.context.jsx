import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils"; 

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}: cartItem);
    } 
    return [...cartItems, {...productToAdd, quantity: 1}];
}; 

const removeSingleCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === itemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}: cartItem);
    } else {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
};

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: (bool) => {},
    cartItems: [],
    addItemToCart: (item) => {},
    removeSingleItemFromCart: (item) => {},
    removeProductFromCart: (item) => {},
    cartCount: 0,
    cartTotal: 0

});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { isCartOpen, cartItems } = state;
    const { type, payload } = action;

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }  
        case 'SET_IS_CART_OPEN': 
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);   
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const CartProvider = ({children}) => {
    const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
                cartItems: newCartItems, 
                cartCount: newCartCount, 
                cartTotal: newCartTotal 
            })
        );
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems);
    }

    const removeSingleItemFromCart = (itemToRemove) => {
        const newCartItems = removeSingleCartItem(cartItems, itemToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const removeProductFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal,
        removeSingleItemFromCart, 
        removeProductFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}