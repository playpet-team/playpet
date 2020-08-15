import { useState, useEffect } from 'react';
import { loadProduct } from './../utils/product/index';

function useProduct({ PID }: { PID: string; }) {
    // product type 정해야함
    const [product, setProduct] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getProduct() {
            setLoading(true);
            const productData = await loadProduct(PID);
            setProduct(productData);
            setLoading(false);
        }
        getProduct();
    }, []);

    return {
        product,
        loading,
    }
};

export default useProduct;
