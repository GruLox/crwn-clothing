import { useContext, useEffect } from "react";

import CheckoutItem from "../../Components/checkout-item/checkout-item.component";

import { CartContext } from "../../contexts/cart.context";
import { ICartItem } from "../../Components/cart-item/cart-item.component";

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles.jsx';

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
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}

            <Total>Total: ${cartTotal}</Total>
    
        </CheckoutContainer>
    )
};

export default Checkout