import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        error: '',
        success: false,
        displayName: '',
        email: '',
        password: '',
        photoURL: ''

    })
    console.log(newUser)
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    var provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;


                var token = credential.accessToken;

                var user = result.user;
                let resUser = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    success:true
                }
                console.log(user);
                setUser(resUser);
                setLoggedInUser(user);
                history.replace(from);
                
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const handleBlur = (event) => {
        console.log(event.target.name, event.target.value);
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPassValid = event.target.value.length > 6;
            const passHasNum = /\d{1}/.test(event.target.value);
            isFormValid = isPassValid && passHasNum;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
            console.log(newUserInfo);

        }
        


    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            console.log("sing p prop")
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // ...
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUserInfo(user.displayName);
                    setUser(newUserInfo)
                    
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    let newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo)
                    console.log(errorMessage, errorCode)
                });
        }

        if (!newUser && user.email && user.password) {
            console.log('log in pro')
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('user looged in ',userCredential.user)

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    let newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo)
                    console.log(errorMessage, errorCode)
                });
        }

        e.preventDefault()
    }
    const updateUserInfo = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
          console.log('user name updated')
        }).catch(function (error) {
            console.log(error)
        });
    }



    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-3">
                    <span></span>
                </div>
                <div className="col-md-6">
                  
                    {newUser ? (
                        <Form className='login-form my-5 p-5' onSubmit={handleSubmit}>

                        <Form.Group controlId="formBasicName">
                            
                            <Form.Control required name='displayName' onBlur={handleBlur} type="text" placeholder="Enter name" required />

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                           
                            <Form.Control name='email' onBlur={handleBlur} type="email" placeholder="Enter email" required />
                           
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            
                            <Form.Control required name='password' onBlur={handleBlur} type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button onClick={handleSubmit} className="mx-4 w-75 btn btn-orange" variant="primary" type="submit">
                           Create A New Account
                    </Button>
                    <div className="sign-up m-2 text-center">
                        Already Have an account? <button className="btm-btn" onClick={() => setNewUser(!newUser)}>Login</button>
                    </div>
                    


                    </Form>
                    ) : (
                        
                    <Form className='login-form my-5 p-5'  onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control name='email' onBlur={handleBlur} type="email" placeholder="Enter email" required />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                  
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control required name='password' onBlur={handleBlur} type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button onClick={handleSubmit} className="mx-4 w-75 btn btn-orange" type="submit">
                      Log in 
                    </Button>
                    <div className="sign-up m-2 text-center">
                        Don't Have an account? <button className="btm-btn" onClick={() => setNewUser(!newUser)}>Sign up</button>
                    </div>
                    
                  </Form>
                    )}

                    
                    <div className="mt-3 other-login">
                    <h5 className="divider"><span>OR</span></h5>
                    <button onClick={handleGoogleSignIn} className="w-75 btn btn-primary social-btn mb-2"><span><FontAwesomeIcon icon={faGoogle} /> Continue With Google </span></button>

                    
                    

                    </div>
                    
                    
                   
                    {user.success && <p style={{ color: "green" }}> user {newUser ? "created" : "logged in"} successfully</p>}
                    <p style={{ color: 'red' }}>{user.error}</p>
                   
                   
                </div>
                <div className="col-md-3">
                     <span></span>
                </div>
            </div>

        </div>
    );
};

export default Login;