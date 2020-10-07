import React from 'react';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Products/Shipment/shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h2>Logged In User: {loggedInUser.email}</h2>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">            
            <Shop></Shop> 
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/manage">
            <Inventory></Inventory>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/shipment">
            <Shipment />
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
     
           
    </UserContext.Provider>
  );
}

export default App;
