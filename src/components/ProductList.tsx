import React, { useEffect, useState } from 'react';
import { ListBlock } from '../styles';
import { loadProductList } from '../utils/product';
import ProductListItem, { ProductItem } from './ProductListItem';

function ProductList() {
    const [list, setList] = useState<ProductItem[]>([]);
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