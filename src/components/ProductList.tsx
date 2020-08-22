import React, { useEffect, useState } from 'react';
import { ListBlock } from '../styles';
import ProductListItem from './ProductListItem';
import { loadProductList, ProductForm } from '../utils/product';

function ProductList() {
    const [list, setList] = useState<ProductForm[]>([]);
    useEffect(() => {
        async function loadList() {
            setList(await loadProductList());
        }
        loadList();
    }, []);
    return (
        <ListBlock>
            {list.map(product => (
                <ProductListItem
                    key={product.id}
                    {...product}
                />
            ))}
        </ListBlock>
    );
};

export default ProductList;