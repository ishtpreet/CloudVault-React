import React, { useState } from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import Header from './Header';
import SignUp from './SignUp';
import Loginpage from './LoginPage';
import ForgotPassword from './ForgotPassword'
import Dashboard from './Dashboard';
import Logout from './Logout';
import ListFile from  './ListFile';


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
      <Route path="/login">
        <Loginpage />
      </Route>
    <Route exact path='/'> 
    <div>

    <Header />
    <Container>
      <Button>Hello</Button>
    </Container>
    </div>
    </Route>
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
