import React, { useState } from 'react';

import './Login.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  
const googleSignIn = () => {
    handleGoogleSignIn()
    .then( res => {
        handleResponse(res, true);
    }) 
}

const fbSignIn = () => {
    handleFbSignIn()
    .then( res => {
        handleResponse(res, true);
    }) 
}

const  signOut = () => {
    handleSignOut()
    .then( res => {        
        handleResponse(res, false);
    })
}

const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
}

  const handleBlur = (e) => {
    //console.log(e.target.name, e.target.value);
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      //console.log(isEmailValid);
    }
    if(e.target.name === 'password'){
      const isPassWordValid = e.target.value.length > 6 ;
      const hasPasswordNumber = /\d{1}/.test(e.target.value);
      //console.log(isPassWordValid && hasPasswordNumber);
      isFormValid = isPassWordValid && hasPasswordNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
        //console.log('submitting');
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then( res => {
            handleResponse(res, true);
        })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
        handleResponse(res, true);
      })
    }
    
    e.preventDefault();
  }


  return (
    <div className="login-style">      
      {
        user.isSignedIn ? <button onClick={signOut}> Sign out</button>:        
        <button onClick={googleSignIn}> Sign In</button>      
      }
      <br />
      <button onClick={fbSignIn}> Sign in using Facebook</button>
      {
        user.isSignedIn && <div> 
            <p> Welcome, {user.name}</p>
            <p> Email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
      }
      <h1> Our own Authentication</h1>
        <input type="checkbox" onChange={ () => setNewUser(!newUser)} name="" id="newUser"/>
        <label htmlFor="newUser">New User Sign Up</label>
        <form action="" onSubmit={handleSubmit}>
          { newUser && <p><input type="text" name="name" id=""placeholder="Name" onBlur={handleBlur} /></p>}
          <p><input type="text" name="email" id=""placeholder="Email" onBlur={handleBlur} required="required"/></p>
          <p> <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required="required"/> </p>
          <p><input type="submit" value={newUser ? 'Sign Up': 'Sign In'}/></p>
        </form>  
        <p style={{color: 'red'}}>{user.error}</p>  
        { user.success && <p style={{color: 'green'}}> User { newUser ? 'Created' : 'Logged in'} successfully</p>}
    </div>
  );
}

export default Login;
