import React, { Component } from 'react'  
import axios from 'axios';  
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import { Link } from 'react-router-dom';

export default class RiskManagementReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
            Mitigations: [],
            Assessments: [],
            CIAs: [],
            Assets: [],
            Asst_Issue: [],
    }
  }

  componentDidMount() {
          
        axios.get('http://localhost:5000/RiskMitigation/')
        .then(res => {
                this.setState({
                        Mitigations: res.data
                });
        });
          
        axios.get('http://localhost:5000/RiskAssessment/')
        .then(res => {
                this.setState({
                        Assessments: res.data
                });
        });
          
        axios.get('http://localhost:5000/CIAMark/')
        .then(res => {
                this.setState({
                        CIAs: res.data
                });
        });
          
        axios.get('http://localhost:5000/Assets/')
        .then(res => {
                this.setState({
                        Assets: res.data
                });
        });
          
        axios.get('http://localhost:5000/AssetIssue/')
        .then(res => {
                this.setState({
                        Asst_Issue: res.data
                });
        });

  }

  render() {
    return (
      <div className="form-box1">
      <h3>Risk Management Report</h3>
      <div className="form-group">
        <table id="rept1">
          <thead>
            <tr>
              <th colSpan="50" style={{background: "#005fcc", fontSize:'15px'}}>Risk Management Report</th>
            </tr>
            </thead>
            <thead>
              <tr>
                      <th style={{width: 200}}>Asset ID</th>
                      <th style={{width: 200}}>Asset Name</th>
                      <th style={{width: 200}}>Confidentiality</th>
                      <th style={{width: 200}}>Integrity</th>
                      <th style={{width: 200}}>Availability</th>
                      <th style={{width: 200}}>Classification</th>
                      <th style={{width: 200}}>Risk</th>
                      <th style={{width: 200}}>Vulnerability</th>
                      <th style={{width: 200}}>Exposure</th>
                      <th style={{width: 200}}>Impact</th>
                      <th style={{width: 200}}>Probability</th>
                      <th style={{width: 200}}>Summary</th>
                      <th style={{width: 200}}>Control</th>
                      <th style={{width: 200}}>Description</th>
                      <th style={{width: 200}}>Exposure</th>
                      <th style={{width: 200}}>Impact</th>
                      <th style={{width: 200}}>Probability</th>
                      <th style={{width: 200}}>Summary</th>
                      <th style={{width: 200}}>Risk Owner</th>
                      <th style={{width: 200}}>Report Case</th>
              </tr>  
            </thead>
            <tbody>
            {
                            this.state.Assets.map((ast,i) => {
                                    return <>
                                            {
                                            this.state.CIAs.filter(cia => cia._id ===
                                                        Math.max(...this.state.CIAs.filter(cia1 => cia1.APID === ast._id && cia1.APType === "Asset").map(function(cia1) {
                                                        return cia1._id })))
                                                        .map(cia => {
                                                        return <>
                                                                {
                                                                        this.state.Assessments.filter(risk =>risk.APID === ast._id && risk.APType === "Asset").map(risk => {
                                                                        return <tr key={i}>
                                                                        <td>{ast._id}</td>
                                                                        <td>{ast.Name}</td>
                                                                        <td>{cia.Confidentiality}</td>
                                                                        <td>{cia.Integrity}</td>
                                                                        <td>{cia.Availability}</td>
                                                                        <td>{cia.Class}</td>
                                                                        <td>{risk.Risk_Name}</td>
                                                                        <td>{risk.Vulnrblt}</td>
                                                                        <td>{risk.Exposr}</td>
                                                                        <td>{risk.Impact}</td>
                                                                        <td>{risk.Probab}</td>
                                                                        <td>{risk.Summary}</td>
                                                                {
                                                                        this.state.Mitigations.filter(mit =>mit.Risk_ID === risk._id && mit.APType === "Asset").map(mit => {
                                                                        return <>
                                                                        <td>{mit.Controls}</td>
                                                                        <td>{mit.Description}</td>
                                                                        <td>{mit.Exposr}</td>
                                                                        <td>{mit.Impact}</td>
                                                                        <td>{mit.Probab}</td>
                                                                        <td>{mit.Summary}</td>
                                                                        </>
                                                                        })
                                                                }
                                                                {
                                                                        this.state.Asst_Issue.filter(isu => isu._id === 
                                                                        Math.max(...this.state.Asst_Issue.filter(isu1 => parseInt(isu1.IssuedID[0]) === ast._id).map(isu1 => {
                                                                        return isu1._id
                                                                        }))).map((isu) => {
                                                                        return <>
                                                                        <td>{isu.IssuedTo}</td>
                                                                        </>
                                                                        })
                                                                }
                                                                        <td>
                                                                        <a className="action2" href={"/reportcase/"+risk._id}>Report</a>
                                                                        </td>
                                                                        </tr>
                                                                        })
                                                                }
                                                        </>
                                                        })
                                                }
                                            
                                        </>
                            })
                    }

                    {/* {
                            this.state.Assessments.filter(risk => risk.APType === "Asset").map((risk,i) => {
                                    return <tr key={i}>
                                            <td>{risk.APID}</td>
                                            <td>{this.state.Assets.filter(ast => ast._id === risk.APID).map(ast => ast.Name)}</td>
                                            {
                                            this.state.CIAs.filter(cia => cia._id ===
                                                        Math.max(...this.state.CIAs.filter(cia1 => cia1.APID === risk.APID && cia1.APType === risk.APType).map(function(cia1) {
                                                        return cia1._id })))
                                                        .map(cia => {
                                                        return <>
                                                                <td>{cia.Confidentiality}</td>
                                                                <td>{cia.Integrity}</td>
                                                                <td>{cia.Availability}</td>
                                                                <td>{cia.Class}</td>
                                                        </>
                                                        })
                                                }
                                                <td>{risk.Risk_Name}</td>
                                                <td>{risk.Vulnrblt}</td>
                                                <td>{risk.Exposr}</td>
                                                <td>{risk.Impact}</td>
                                                <td>{risk.Probab}</td>
                                                <td>{risk.Summary}</td>
                                                {
                                                this.state.Mitigations.filter(mit => mit.Risk_ID === risk._id).map(mit => {
                                                        return <>
                                                        <td>{mit.Controls}</td>
                                                        <td>{mit.Description}</td>
                                                        <td>{mit.Exposr}</td>
                                                        <td>{mit.Impact}</td>
                                                        <td>{mit.Probab}</td>
                                                        <td>{mit.Summary}</td>
                                                        </>
                                                })
                                                }
                                                {
                                                  this.state.Asst_Issue.filter(ast => ast._id === 
                                                    Math.max(...this.state.Asst_Issue.filter(ast1 => parseInt(ast1.IssuedID[0]) === risk.APID).map(ast1 => {
                                                      return ast1._id                    
                                                    }))).map((ast, index) => {
                                                        return <td>{ast.IssuedTo}</td>
                                                  })
                                                }
                                        </tr>
                            })
                    } */}
            </tbody>
          </table>
      </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept1"
                                filename="Risk Management Report"
                                sheet="Risk Management Report"
                                buttonText="Download Report" />  
                        </div>
              
    </div>
    )
  }
}