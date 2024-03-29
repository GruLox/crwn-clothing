import { useDispatch, useSelector } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import { ProductCardContainer, Footer, Name, Price } from './product-card.styles.jsx';


export type Product = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
    
}

export default ProductCard