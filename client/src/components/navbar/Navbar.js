import "./Navbar.css";
import logo from "../../qc.png";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import openSidebar from "../../RiskManagement";
import UnlockAccess from "../roles/UnlockAccess";

class Navbar extends Component {
    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
    render () {
    const { user } = this.props.auth;
    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={this.props.openSidebar}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                <span>
                    <a href="/dashboard"><img src={logo} alt="logo"/></a>
                </span>
                <a href="/hrmanagement" className="font-bold text-title">
                    HR Management
                </a>
                <a href="/assetmanagement" className="font-bold text-title">
                    Asset Management
                </a>
                <a href="/Processmanagement" className="font-bold text-title">
                    Process Management
                </a>
                <a href="/riskmanagement" className="font-bold text-title">
                    Risk Management
                </a>
                <a href="/objectivemanagement" className="font-bold text-title">
                    Objective Management
                </a>
                <UnlockAccess request={'Admin'}>
                <a href="/budgetmanagement" className="font-bold text-title">
                    Budget Management
                </a>
                </UnlockAccess>
                <a href="/casemanagement" className="font-bold text-title">
                    Case Management
                </a>
                <a href="/attendancereport" className="font-bold text-title">
                    Attendance Report
                </a>
                <a href="/payrollmanagement" className="font-bold text-title">
                    Payroll Management
                </a>
                {/* <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a className="active_link" href="#">Admin</a> */}
            </div>
            <div className="navbar__right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>
                <a href="#">
                    <i className="fa fa-clock-o"></i>
                </a>
                <a href="#" onClick={this.onLogoutClick} data-toggle="tooltip" data-placement="bottom" title="Logout">
                    <i className="fa fa-power-off text-danger"></i>
                </a>
            </div>
        </nav>
    )
            }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar);