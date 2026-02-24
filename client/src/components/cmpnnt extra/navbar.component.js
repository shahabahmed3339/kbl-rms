import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Custom.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-gradient navbar-expand-lg">
        <Link to="/" className="navbar-brand navlink-custom" style={{padding: "10px"}}>Risk Management</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/enrollhr" className="nav-link navlink-custom">Enroll HR</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enrollasset" className="nav-link navlink-custom">Enroll Asset</Link>
          </li>
          <li className="navbar-item">
          <Link to="/assetissue" className="nav-link navlink-custom">Asset Issuance</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enrollprocess" className="nav-link navlink-custom">Enroll Process</Link>
          </li>
          <li className="navbar-item">
          <Link to="/assetciamark" className="nav-link navlink-custom">Mark Asset CIA</Link>
          </li>
          <li className="navbar-item">
          <Link to="/processciamark" className="nav-link navlink-custom">Mark Process CIA</Link>
          </li>
          <li className="navbar-item">
          <Link to="/riskassessment" className="nav-link navlink-custom">Risk Assessment</Link>
          </li>
          <li className="navbar-item">
          <Link to="/riskmitigation" className="nav-link navlink-custom">Risk Mitigation</Link>
          </li>
          <li className="navbar-item">
          <Link to="/reportdownload" className="nav-link navlink-custom">Download Report</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}