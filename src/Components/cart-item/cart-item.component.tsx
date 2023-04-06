import { Product } from '../product-card/product-card.component';

import './cart-item.styles.scss';

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
        <div className='cart-item-container'>
            <img src={imageUrl} alt={name} />
            <div className="item-details">
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
                
                
            </div>
        </div>
    )
}

export default CartItem