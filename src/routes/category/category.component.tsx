import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../Components/product-card/product-card.component';

import { Product } from '../../Components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import {CategoryContainer, CategoryTitle} from './category.styles.jsx'

const Category = () => {
    const params = useParams<{category: string}>();
    const category: any = params.category!
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState<Product[]>(categoriesMap[category]);

    useEffect(() => {
        if (categoriesMap.hasOwnProperty(category)) {
            setProducts(categoriesMap[category])
        }
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} />) 
            }
        </CategoryContainer>
        </Fragment>
    )
};

export default Category;