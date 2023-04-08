import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem, { ICartItem } from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const context = useContext(CartContext);
    const { cartItems } = context;
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (cartItems.map((item: ICartItem) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )}
                
            </CartItems>
                <Button onClick={goToCheckoutHandler}>Checkout</Button>    
        </CartDropdownContainer>
    );
};

export default CartDropdown