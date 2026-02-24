import "./Main.css";
import hello from "../../qc.png";
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Blur from "react-blur";
import Background from "../../IT_management.jpg";
import Navbar from '../navbar/Navbar1';
import "../auth/Login.css";

export default class Main extends Component {
    render () {
    return(
        <main>
            <Navbar/>
            <div className="main__container">
                    <Blur img={Background} blurRadius={10} className="main__title1">
                        <div className="main__title" style={{padding: "20px 750px 20px 20px"}}>
                            <img src={hello} alt="hello"/>
                            <div className="main__greeting">
                                <h1>Admin Dashboard</h1>
                            </div>
                        </div>
                    </Blur>

                <div className="main__cards  text-center">

                    <div className="card">
                        <Link to="/assetmanagement" className="font-bold text-title">
                            <i className="fa fa-sitemap fa-5x"></i>
                            <div className="card__inner">
                                <span>
                                    Asset Management
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="card">
                        <Link to="/processmanagement" className="font-bold text-title">
                            <i className="fa fa-recycle fa-5x"></i>
                            <div className="card__inner">
                                <span>
                                    Process Management
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="card">
                        <Link to="/riskmanagement" className="font-bold text-title">
                            <i className="fa fa-warning fa-5x"></i>
                            <div className="card__inner">
                                <span>
                                    Risk Management
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="card">
                        <Link to="/objectivemanagement" className="font-bold text-title">
                            <i className="fa fa-calendar-check-o fa-5x"></i>
                            <div className="card__inner">
                                <span>
                                    Objective Management
                                </span>
                            </div>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </main>
    )}
}