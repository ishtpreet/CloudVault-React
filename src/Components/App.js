import React, { useState } from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import Header from './Header';
import SignUp from './SignUp';
import Loginpage from './LoginPage';
import ForgotPassword from './ForgotPassword'


function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path="/register">
        <SignUp />
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
    <Container fluid>
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
