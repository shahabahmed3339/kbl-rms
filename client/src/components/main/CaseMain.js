import "./Main.css";
import React, { Component } from 'react';
import "../auth/Login.css";

export default class Main extends Component {
    render () {
    return(
        <main>
            <div className="main__container">
                        <div className="main__title">
                            <i className="fa fa-gg fa-3x"></i>
                            <div className="main__greeting">
                                <h1>Welcome to Case Management</h1>
                            </div>
                        </div>
            </div>
        </main>
    )}
}