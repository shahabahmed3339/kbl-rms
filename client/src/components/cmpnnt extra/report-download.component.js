import React, { Component } from 'react'  
import axios from 'axios';  
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';

export class ReportDownload extends Component {
        constructor(props) {
                super(props)
                this.state = {
                        ProductData: [],
                        ProductData1: [],
                        ProductData2: [],
                        ProductData3: [],
                        ProductData4: [],
                        ProductData5: [],
                        ProductData6: []

                }
        }
        componentDidMount() {
                axios.get('http://localhost:5000/RiskMitigation/').then(response => {
                        console.log(response.data);
                        this.setState({
                                ProductData: response.data
                        });
                });
                axios.get('http://localhost:5000/RiskAssessment/').then(response1 => {
                        console.log(response1.data);
                        this.setState({
                                ProductData1: response1.data
                        });
                });
                axios.get('http://localhost:5000/CIAMark/').then(response2 => {
                        console.log(response2.data);
                        this.setState({
                                ProductData2: response2.data
                        });
                });
                axios.get('http://localhost:5000/AssetIssue/').then(response3 => {
                        console.log(response3.data);
                        this.setState({
                                ProductData3: response3.data
                        });
                });
                axios.get('http://localhost:5000/CIA/').then(response4 => {
                        console.log(response4.data);
                        this.setState({
                                ProductData4: response4.data
                        });
                });
                axios.get('http://localhost:5000/Exposure/').then(response5 => {
                        console.log(response5.data);
                        this.setState({
                                ProductData5: response5.data
                        });
                });
                axios.get('http://localhost:5000/Probability/').then(response6 => {
                        console.log(response6.data);
                        this.setState({
                                ProductData6: response6.data
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
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Risk Assessment Form</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>Asset ID</th>
                                                        <th>Asset Name</th>
                                                        <th>Confidentiality</th>
                                                        <th>Integrity</th>
                                                        <th>Availability</th>
                                                        <th>Classification</th>
                                                        <th>Risk</th>
                                                        <th>Vulnerability</th>
                                                        <th>Control</th>
                                                        <th>Description</th>
                                                        <th>Exposure</th>
                                                        <th>Impact</th>
                                                        <th>Probability</th>
                                                        <th>Summary</th>
                                                        <th>Risk Owner</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.ProductData.filter(astid => astid.APType == 'Asset').map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p.APID}</td>
                                                                <td>{this.state.ProductData3.filter(astid => astid.IssuedID.includes(p.APID)).map((p1) => {return p1.Name})}</td>
                                                                <td>{this.state.ProductData4.filter(cia => cia._id == this.state.ProductData2.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Confidentiality})).map((p1) => {return p1.Confidentiality})}</td>
                                                                <td>{this.state.ProductData4.filter(cia => cia._id == this.state.ProductData2.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Integrity})).map((p1) => {return p1.Integrity})}</td>
                                                                <td>{this.state.ProductData4.filter(cia => cia._id == this.state.ProductData2.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Availability})).map((p1) => {return p1.Availability})}</td>
                                                                <td>{this.state.ProductData2.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Class})}</td>
                                                                <td>{this.state.ProductData1.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Risk_Name})}</td>
                                                                <td>{this.state.ProductData1.filter(astid => astid.APID == p.APID && astid.APType == 'Asset').map((p1) => {return p1.Vulnrblt})}</td>
                                                                <td >{p.Controls}</td>
                                                                <td >{p.Description}</td>
                                                                <td >{this.state.ProductData5.filter(expr => expr._id == p.Exposr).map((p1) => {return p1.Exposr})}</td>
                                                                <td >{p.Impact}</td>
                                                                <td >{this.state.ProductData6.filter(prob => prob._id == p.Probab).map((p1) => {return p1.Probab})}</td>
                                                                <td >{p.Summary}</td>
                                                                <td>{this.state.ProductData3.filter(astid => astid.IssuedID.includes(p.APID)).map((p1) => {return p1.IssuedTo})}</td>
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
                                filename="Asset Report"
                                sheet="Asset Report"
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
export default ReportDownload