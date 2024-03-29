import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../Components/product-card/product-card.component";
import Spinner from "../../Components/spinner/spinner.component";

import { Product } from "../../Components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { useSelector } from "react-redux";

const Category = () => {
  const params = useParams<{ category: string }>();
  const category: any = params.category!;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<Product[]>(categoriesMap[category]);

  useEffect(() => {
    if (categoriesMap.hasOwnProperty(category)) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
