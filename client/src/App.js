import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import WelcomePage from './Pages/Welcome/Welcome'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import ResetPassword from './Pages/ResetPass/ResetPass';
import ResetPasswordToken from './Pages/ResetPass/ResetPassToken';
import Settings from './Pages/Settings/UserAccount';
import Public from './Pages/Public/Public';
import Event from './Pages/Events/Event';
import Events from './Pages/Events/Events';
import CreateEvent from './Pages/Events/CreateEvent';
import EventsSubs from './Pages/Subs/EventsSubs';
import OrganizersSubs from './Pages/Subs/OrganizersSubs';
import EditEvent from './Pages/Events/EditEvent';
import SubedUsers from './Pages/Public/SubedUsers';
import User from './Pages/Public/User';
import CreateComment from './Pages/Comments/CreateComment';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ WelcomePage }/>
        <Route path="/sign_in" exact component={ Login }/>
        <Route path="/sign_up" exact component={ Register }/>
        <Route path="/reset_pass" exact component={ ResetPassword }/>
        <Route path="/reset_pass/:token" exact component={ ResetPasswordToken }/>
        <Route path="/me" exact component={ Settings }/>
        <Route path="/account" exact component={ Public }/>
        <Route path="/events" exact component={ Events }/>
        <Route path="/event/create" exact component={ CreateEvent }/>
        <Route path="/event/subs" exact component={ EventsSubs }/>
        <Route path="/event/:id" exact component={ Event }/>
        <Route path="/event/edit/:id" exact component={ EditEvent }/>
        <Route path="/organizers/subs" exact component={ OrganizersSubs }/>
        <Route path="/users/list/:id" exact component={ SubedUsers }/>
        <Route path="/user/:id" exact component={ User }/>
        <Route path="/comments/create/:id" exact component={ CreateComment }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
