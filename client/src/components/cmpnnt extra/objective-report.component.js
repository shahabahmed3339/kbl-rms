import React, { Component } from 'react'  
import axios from 'axios';  
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";

export class ObjectiveReport extends Component {
        constructor(props) {
                super(props)
                this.state = {
                        ProductData: []

                }
        }
        componentDidMount() {
                axios.get('http://localhost:5000/Objective/').then(response => {
                        console.log(response.data);
                        this.setState({
                                ProductData: response.data
                        });
                });
        }
        render() {
                return (
                <div>
                <UnlockAccess request={'Admin'}>
                        <div className="form-group">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Objective Report</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Objective</th>
                                                        <th>Description</th>
                                                        <th>Goal</th>
                                                        <th>Assigned To</th>
                                                        <th>Resource</th>
                                                        <th>Action</th>
                                                        <th>Deadline</th>
                                                        <th>Result In Evidence</th>
                                                        <th>Evaluation Frequency</th>
                                                        <th>Total Score</th>
                                                        <th>Priority</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.ProductData.map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.Objective}</td>
                                                                <td>{p.Description}</td>
                                                                <td>{p.Goal}</td>
                                                                <td>{p.AssignedTo}</td>
                                                                <td>{p.Resource}</td>
                                                                <td>{p.Action}</td>
                                                                <td>{p.Deadline}</td>
                                                                <td>{p.ResultInEvidence}</td>
                                                                <td>{p.EvalFreq}</td>
                                                                <td>{p.TotalScore}</td>
                                                                <td>{p.Priority}</td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept"
                                filename="Objective Report"
                                sheet="Objective Report"
                                buttonText="Download Report" />  
                        </div>
                </UnlockAccess>
                <UnlockAccess request={'User'}>
                        Page Not Available...
                </UnlockAccess>
                </div>  
                )
        }
}
export default ObjectiveReport