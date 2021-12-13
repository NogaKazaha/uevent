import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import WelcomePage from './Pages/Welcome/Welcome'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ResetPassword from './Pages/ResetPass/ResetPass';
import ResetPasswordToken from './Pages/ResetPass/ResetPassToken';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ WelcomePage }/>
        <Route path="/sign_in" exact component={ Login }/>
        <Route path="/sign_up" exact component={ Register }/>
        <Route path="/reset_pass" exact component={ ResetPassword }/>
        <Route path="/reset_pass/:token" exact component={ ResetPasswordToken }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
