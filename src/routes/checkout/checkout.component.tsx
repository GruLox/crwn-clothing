import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import CheckoutItem from "../../Components/checkout-item/checkout-item.component";

import { ICartItem } from "../../Components/cart-item/cart-item.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import PaymentForm from "../../Components/payment-form/payment-form.component";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

export type CheckoutCartContext = {
    cartItems: ICartItem[],
    addItemToCart: any,
    removeSingleItemFromCart: any,
    setIsCartOpen: any,
    removeProductFromCart: any,
    cartTotal: number
}

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems: ICartItem[] = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
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
            {cartItems.map((item): any => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}

            <Total>Total: ${cartTotal}</Total>
            <PaymentForm />

        </CheckoutContainer>
    )
};

export default Checkout