import React, { useEffect, useState } from 'react';
import Cart from '../../cart/Cart';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = () => {
        // console.log('Order Placed!');
        setOrderPlaced(true);
        setCart([]);
        processOrder();
    }

    const removeProduct = (productKey) => {
        console.log('Remove Clicked', productKey);
        const newCart = cart.filter( pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect( () => {
        //cart
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        //console.log(cartProducts);
    }, []);
    
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">                                
                {
                    cart.map( pd => <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct} ></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={ () => handlePlaceOrder()} className="main-button"> Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;