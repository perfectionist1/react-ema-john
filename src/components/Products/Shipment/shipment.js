import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log("form submitted", data)
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (    
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>        
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
        {errors.email && <span className="error">Email is required</span>}

        <input name="address1" ref={register({ required: true })} placeholder="Address Line 1" />
        {errors.address1 && <span className="error">Phone is required</span>}

        <input name="address2" ref={register({ required: false })}placeholder="Address Line 2" />
        {errors.address && <span className="error">Address is required</span>}

        <input name="city"  ref={register({ required: true })} placeholder="City" />
        {errors.city && <span className="error">City is required</span>}

        <input name="country"  ref={register({ required: true })} placeholder="Country" />
        {errors.country && <span className="error">Country is required</span>}

        <input name="zip"  ref={register({ required: true })} placeholder="zip" />
        {errors.zip && <span className="error">Zip is required</span>}
     
        <input type="submit" />
        </form>
    );
};

export default Shipment;