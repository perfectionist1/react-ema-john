import React, { useEffect } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Products/Product';
import Cart from '../../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    //console.log(fakeData);
    const productNum = fakeData.slice(0, 10);
    const [products, setProducts] = useState(productNum);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey );
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart);
        // console.log(previousCart);

    }, []);

    const handleCart = (product) => {
      //console.log('Product Added', product);
      const toBeAddedKey = product.key;
      const sameProduct = cart.find(pd => pd.key ===  toBeAddedKey);
      let count = 1;
      let newCart;
      if(sameProduct){
        const count = sameProduct.quantity + 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAddedKey);
        newCart = [...others, sameProduct];
      }
      else{
          product.quantity = 1;
          newCart = [...cart, product];
      }
      setCart(newCart);
      addToDatabaseCart(product.key, count);
    };
    
    return (
        <div className="shop-container">
            <div className="product-container">
                <h2>Products: {products.length}</h2>
                <ul>
                    {
                        products.map(pd => <Product key={pd.key} showAddToCart={true} product={pd} handleCart={handleCart}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button"> Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;