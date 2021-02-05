import React, { useState } from 'react';
import { BrowserRouter,Switch,Route, Redirect } from 'react-router-dom';

import SignUp from './SignUp';
import Loginpage from './LoginPage';
import ForgotPassword from './ForgotPassword'
import Dashboard from './Dashboard';
import Logout from './Logout';
import ListFile from  './ListFile';
import Fpass from './Fpass';


function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path="/dashboard">
      <Dashboard/>
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/register">
        <SignUp />
      </Route>
      <Route path="/fileList">
        <ListFile />
      </Route>
      <Route path="/forget-password">
        <ForgotPassword />
      </Route>
      <Route path="/fpass/:token"
      render={(props)=> <Fpass {...props}/>}
      ></Route>
      <Route path="/login">
        <Loginpage />
      </Route>
    <Route exact path='/'> 
    <div>
      <Redirect to={{pathname: '/dashboard'}} />
      </div>
    </Route>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
