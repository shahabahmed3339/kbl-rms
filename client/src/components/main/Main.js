import "./Main.css";
import axios from 'axios';
import hello from "../../qc.png";
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Blur from "react-blur";
import Background from "../../IT_management.jpg";
import Navbar from '../navbar/Navbar1';
import "../auth/Login.css";
import UnlockAccess from "../roles/UnlockAccess";

export default class Main extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        Vision: "",
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/Vision/')
        .then(response => {
            this.setState({
              Vision : response.data[0].Description
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render () {
    return(
        <main>
            <Navbar/>

                <div className="main__container">
                        <Blur img={Background} blurRadius={10} className="main__title1">
                            <div className="main__title">
                                <img src={hello} alt="hello"/>
                                <div className="main__greeting">
                                    <UnlockAccess request={'Admin'}>
                                    <h1>Admin Dashboard</h1>
                                    </UnlockAccess>
                                    <UnlockAccess request={'User'}>
                                    <h1>User Dashboard</h1>
                                    </UnlockAccess>
                                </div>
                                <div className="main__greeting">
                                    <div className="hwrap">
                                        <div className="hmove">
                                            <div className="hitem">Our vision is to {this.state.Vision}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Blur>

                    <div className="main__cards  text-center">

                        <div className="card">
                            <Link to="/hrmanagement" className="font-bold text-title">
                                <i className="far fa-users fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        HR Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/assetmanagement" className="font-bold text-title">
                                <i className="far fa-shopping-basket fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Asset Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/processmanagement" className="font-bold text-title">
                                <i className="far fa-recycle fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Process Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/riskmanagement" className="font-bold text-title">
                                <i className="far fa-warning fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Risk Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="card">
                            <Link to="/objectivemanagement" className="font-bold text-title">
                                <i className="far fa-calendar-check fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Objective Management
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <UnlockAccess request={'Admin'}>
                        <div className="card">
                            <Link to="/budgetmanagement" className="font-bold text-title">
                                <i className="far fa-cash-register fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Budget Management
                                    </span>
                                </div>
                            </Link>
                        </div>
                        </UnlockAccess>
                        <div className="card">
                            <Link to="/casemanagement" className="font-bold text-title">
                                <i className="far fa-bug fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Case Management
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="card">
                            <Link to="/attendancereport" className="font-bold text-title">
                                <i className="far fa-clipboard-user fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Attendance Report
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="card">
                            <Link to="/payrollmanagement" className="font-bold text-title">
                                <i className="far fa-money-check-alt fa-5x"></i>
                                <div className="card__inner">
                                    <span>
                                        Payroll Management
                                    </span>
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                </div>

        </main>
    )}
}