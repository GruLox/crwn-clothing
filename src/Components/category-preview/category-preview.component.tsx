import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import { Product } from '../product-card/product-card.component';

import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles.jsx';

type CategoryPreviewProps = {
    title: string;
    products: Product[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>
                    {title.toUpperCase()}
                </Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => 
                        <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;