import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    //console.log('Clicked here!');
    return firebase.auth().signInWithPopup(googleProvider)
    .then( res => {
      //console.log(res);
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName, 
        email: email,        
        photo: photoURL,
        success: true
      }
      return signedInUser;
      //console.log(displayName, email, photoURL); 
    })  
    .catch( err => {
      console.log(err);
      console.log(err.message);
    });  
  }


export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then( result =>  {      
      var token = result.credential.accessToken;     
      var user = result.user;
      user.success = true;
      return user;      
    }).catch(function(error) {      
      var errorCode = error.code;
      var errorMessage = error.message;      
    });
  }

export const handleSignOut = () => {
  return firebase.auth().signOut()
  .then( res => {
    const signedOutUser ={
      isSignedIn: false,        
      name: '',
      photo: '',
      email: '',
      error: '',
      success: false
    }  
    return signedOutUser;
    //console.log(res);
  })
  .catch( () => {

  });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(name, email, password)
        .then( res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
        })
        .catch( error => {
          // Handle Errors here.
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then( res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
        //console.log('Sign in User info', res.user);
      })
      .catch(function(error) {        
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name      
    }).then( () => {
      // Update successful.
      console.log('User Name updated successfully');
    }).catch( error => {
      // An error happened.
      console.log(error);
    });
}