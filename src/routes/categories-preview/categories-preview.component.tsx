import { Fragment, useContext } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../Components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap }: { categoriesMap: any }  = useContext(CategoriesContext)
    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title: any) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </Fragment>
    );
};

export default CategoriesPreview