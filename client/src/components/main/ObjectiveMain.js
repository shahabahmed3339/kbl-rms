import "./Main.css";
import React, { Component } from 'react';
import "../auth/Login.css";

export default class Main extends Component {
    render () {
    return(
        <main>
            <div className="main__container">
                        <div className="main__title">
                            <i className="fa fa-calendar-check-o fa-3x"></i>
                            <div className="main__greeting">
                                <h1>Welcome to Objective Management</h1>
                            </div>
                        </div>
            </div>
        </main>
    )}
}