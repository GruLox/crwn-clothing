import { Product } from '../product-card/product-card.component';

import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

export interface ICartItem {
    id: number;
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
}

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