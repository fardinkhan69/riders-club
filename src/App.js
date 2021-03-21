import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import Notfound from './components/NotFound/Notfound';
import GoogleMap from './components/Map/GoogleMap';

export const UserContext = createContext();


function App() {

  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value= {[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path='/'>
            
            <Home></Home>
            
          </Route>
          <PrivateRoute path='/destination/:transport'>
            <Destination></Destination>
          </PrivateRoute>
          
          
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route path='/map'>
            <GoogleMap></GoogleMap>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
     
    </UserContext.Provider>
  );
}

export default App;
