import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, price, key} = props.product;
    return (
        <div style={{borderBottom: '1px solid grey', marginLeft:'200px', marginBottom: '10px', paddingBottom: '10px'}} className="review-item">
            
            <h4 className="product-name">{name} </h4>
            <p><small>{price}</small></p>
            <p>Quantity: {quantity}</p>
            <br />
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;