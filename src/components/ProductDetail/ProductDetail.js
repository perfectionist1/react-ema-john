import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h2>Product Detail</h2>
            <h5>{productKey} Coming Soon ...</h5>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;