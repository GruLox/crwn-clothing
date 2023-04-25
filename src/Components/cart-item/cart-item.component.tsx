import { Product } from '../product-card/product-card.component';
import { ICartItem } from '../../store/cart/cart.types';

import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }: {cartItem: ICartItem}) => {
    const {name, imageUrl, quantity, price} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <span className='price'>
                    {quantity} x ${price}
                </span>
                
                
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem