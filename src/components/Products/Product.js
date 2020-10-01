import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);
    const { img, name, seller, price, stock, key} = props.product;

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
                { props.showAddToCart && <button className="main-button" onClick={() => props.handleCart(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;