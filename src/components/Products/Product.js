import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = ({product, showAddToCart, handleCart}) => {
    //console.log(props);
    //const {product, handleCart} = props;
    const { img, name, seller, price, stock, key} = product;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className="product-name"><Link to={"/product/" + key}>{name}</Link></h3>
                <p>By: {seller}</p>
                <h3>${price}</h3>
                <p><small> Only {stock} left in stock - order soon</small></p>
                { showAddToCart && <button className="main-button" onClick={() => handleCart(product)}> 
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;