import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './Homepage.css';

export default class Homepage extends Component {

  render() {
    return (
      <Router>
      <nav className="navbar navbar-dark navbar-gradient navbar-expand-lg">
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/login" className="nav-link navlink-custom">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link navlink-custom">Register</Link>
          </li>
        </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
      </Switch>
      </Router>
    )
  }
}