import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="header">
            <img src={logo} alt="Brand Logo"/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                { loggedInUser.name && <span style={{color: 'green', paddingRight: '20px'}}> Welcome, {loggedInUser.name}</span>}
                { loggedInUser.name && <button onClick={ () => setLoggedInUser({})}>Sign Out</button>}
            </nav>
        </div>
    );
};

export default Header;