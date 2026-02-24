import React, { Component } from 'react'  
import axios from 'axios';  
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";

export class JobDescription extends Component {
        constructor(props) {
                super(props)
                this.state = {
                        ProductData: []

                }
        }
        componentDidMount() {
                axios.get('http://localhost:5000/Hierarchy/').then(response => {
                        console.log(response.data);
                        this.setState({
                                ProductData: response.data
                        });
                });
        }
        render() {
                return (
                <div className="form-box1">
                <UnlockAccess request={'Admin'}>
                        <h3>Roles, Responsibilities & Authorization</h3>
                        <div className="form-group">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Roles, Responsibilities & Authorization</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Department</th>
                                                        <th>Designation</th>
                                                        <th>Job Description</th>
                                                        <th>Authorization</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.ProductData.map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.Department}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.JobDesc.map(function(desc) { 
                                                                        return <option 
                                                                        key={desc}
                                                                        value={desc}>{desc}
                                                                        </option>; })}</td>
                                                                <td>{p.Auth.map(function(auth) { 
                                                                        return <option 
                                                                        key={auth}
                                                                        value={auth}>{auth}
                                                                        </option>; })}</td>
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
                                filename="Job Description Report"
                                sheet="Job Description Report"
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
export default JobDescription