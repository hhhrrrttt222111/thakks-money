import React, { useContext} from 'react';
import firebase from 'firebase/compat';
import { useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet'

import { AuthContext } from '../../context/AuthContext'
import { auth, db } from '../../firebase/firebase';

import './Login.css'

function Login() {

    const { handleUser } = useContext(AuthContext);
    let navigate = useNavigate();
    function goToHome() {
      navigate("/");
    }

    const handleOnClick = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        auth
           .signInWithPopup(googleProvider)
           .then(res => {
               console.log(res.user)
               handleUser(res.user)
               if(res) {
                db.collection('users').doc(res.user.uid).set({
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    profilePhoto: res.user.photoURL
                });
               }              
           })
           .then(() => {
                goToHome();
           })
            .catch((er) => {
                console.log(er)
            })
    
    }
   
    return (
        <div className="login">
            <Helmet>
                <title>ThakksMoney | Login</title>
            </Helmet>
            <div className="login-container">
                    <div className="login-leftcontainer">
                        <p>Use ThakksMoney to keep track of your money</p>
                    </div>
                    <div className="login-rightcontainer">
                        <div className="logo-container">
                        </div>
                        <div className="login-right-content">
                            <p>Welcome to</p>
                            <h1>Thakks<span style={{color: '#e6b800'}}>Money</span></h1>
                            <h4>Manage your money easily!</h4>
                        </div>
                        <button onClick={handleOnClick} className="sign-in">
                            Sign In with Google
                        </button>
                    </div>
            </div>
            
        </div>
    )
}

export default Login