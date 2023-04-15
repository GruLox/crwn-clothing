import { useDispatch, useSelector } from 'react-redux';

import { ICartItem } from '../cart-item/cart-item.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeSingleItemFromCart, removeProductFromCart } from '../../store/cart/cart.action';

import {
    CheckoutItemContainer,
    Arrow,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}: {cartItem: ICartItem}) => {
    const dispatch = useDispatch();
    const  cartItems  = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => dispatch(removeProductFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeSingleItemFromCart(cartItems, cartItem));

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