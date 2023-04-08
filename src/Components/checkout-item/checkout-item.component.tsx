import { useContext } from 'react';

import { ICartItem } from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutCartContext } from '../../routes/checkout/checkout.component';

import {
    CheckoutItemContainer,
    Arrow,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}: {cartItem: ICartItem}) => {
    const { removeProductFromCart, addItemToCart, removeSingleItemFromCart }: CheckoutCartContext = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => removeProductFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeSingleItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <span className='name'> {name} </span>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <span className='price'> ${price} </span>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )

}

export default CheckoutItem;