import "./Main.css";
import React, { Component } from 'react';
import "../auth/Login.css";
import Chart from "../charts/Chart";

export default class Main extends Component {
    render () {
    return(
        <main>
            <div className="main__container">
                        <div className="main__title">
                            <i className="fa fa-warning fa-3x"></i>
                            <div className="main__greeting">
                                <h1>Welcome to Risk Management</h1>
                            </div>
                        </div>
            </div>
            <div style={{marginTop:'100px'}}>
            <Chart/>
            </div>
        </main>
    )}
}