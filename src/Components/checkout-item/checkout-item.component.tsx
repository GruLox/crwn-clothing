import { useContext } from 'react';

import { ICartItem } from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';
import { CheckoutCartContext } from '../../routes/checkout/checkout.component';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}: {cartItem: ICartItem}) => {
    const { removeProductFromCart, addItemToCart, removeSingleItemFromCart }: CheckoutCartContext = useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => removeProductFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeSingleItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> ${price} </span>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
        </div>
    )

}

export default CheckoutItem;