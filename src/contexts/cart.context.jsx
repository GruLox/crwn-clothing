import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
        setCartCount(newCartCount);
        
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeSingleItemFromCart = (itemToRemove) => {
        setCartItems(removeSingleCartItem(cartItems, itemToRemove))
    }

    const removeProductFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
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