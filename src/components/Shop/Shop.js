import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Products/Product';
import Cart from '../../cart/Cart';

const Shop = () => {
    //console.log(fakeData);
    const productNum = fakeData.slice(0, 10);
    const [products, setProducts] = useState(productNum);
    const [cart, setCart] = useState([]);

    const handleCart = (product) => {
      console.log('Product Added', product);
      const newCart = [...cart, product];
      setCart(newCart);
    };
    
    return (
        <div className="shop-container">
            <div className="product-container">
                <h2>Products: {products.length}</h2>
                <ul>
                    {
                        products.map(pd => <Product showAddToCart={true} product={pd} handleCart={handleCart}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;