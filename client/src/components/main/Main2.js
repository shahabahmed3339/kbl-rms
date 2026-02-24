import "./Main.css";
import hello from "../../RiskManagementIcon.png";
import Chart from "../charts/Chart";
import React, { Component } from 'react';

export default class Main extends Component {
    render () {
    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    <img src={hello} alt="hello"/>
                    <div className="main__greeting">
                        <h1>Hello</h1>
                        <p>Welcome to Admin Dashboard</p>
                    </div>
                </div>

                <div className="main__cards">

                    <div className="card">
                        <i className="fa fa-user-o fa-2x text-lightblue"></i>
                        <div className="card__inner">
                            <p className="text-primary-p">Number of HR</p>
                            <span className="font-bold text-title">578</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-calendar fa-2x text-red"></i>
                        <div className="card__inner">
                            <p className="text-primary-p">Deadlines Meet</p>
                            <span className="font-bold text-title">2467</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-coffee fa-2x text-yellow"></i>
                        <div className="card__inner">
                            <p className="text-primary-p">Cups of Coffee</p>
                            <span className="font-bold text-title">340</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-thumbs-up fa-2x text-green"></i>
                        <div className="card__inner">
                            <p className="text-primary-p">Number of Likes</p>
                            <span className="font-bold text-title">645</span>
                        </div>
                    </div>

                </div>

                <div className="charts">
                        <div className="charts__left">
                            <div className="charts__left__title">
                            <div>
                                <h1>Reports</h1>
                                <p>Risk Level Classification</p>
                            </div>
                            <i className="fa fa-line-chart"></i>
                            </div>
                            <Chart/>
                        </div>

                        <div className="charts__right">
                            <div className="charts__right__title">
                                <div>
                                <h1>Stats Reports</h1>
                                <p>General Information</p>
                                </div>
                            <i className="fa fa-check-square-o"></i>
                            </div>

                            <div className="charts__right__cards">
                                <div className="card1">
                                    <h1>Assets</h1>
                                    <p>1678</p>
                                </div>
                                
                                <div className="card2">
                                    <h1>Processes</h1>
                                    <p>784</p>
                                </div>
                                
                                <div className="card3">
                                    <h1>Risks</h1>
                                    <p>1376</p>
                                </div>
                                
                                <div className="card4">
                                    <h1>Controlled</h1>
                                    <p>876</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </main>
    )}
}