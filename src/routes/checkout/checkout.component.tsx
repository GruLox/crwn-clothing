import { useContext, useEffect } from "react";

import CheckoutItem from "../../Components/checkout-item/checkout-item.component";

import { CartContext } from "../../contexts/cart.context";
import { ICartItem } from "../../Components/cart-item/cart-item.component";

import './checkout.styles.scss';

export type CheckoutCartContext = {
    cartItems: ICartItem[], 
    addItemToCart: any, 
    removeSingleItemFromCart: any,
    setIsCartOpen: any,
    removeProductFromCart: any,
    cartTotal: number
}

const Checkout = () => {
    const context = useContext(CartContext);
    const { setIsCartOpen, cartItems, cartTotal }: CheckoutCartContext = context

    useEffect (() => {
        setIsCartOpen(false);
    }, [])

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}

            <span className="total">Total: ${cartTotal}</span>
    
        </div>
    )
};

export default Checkout