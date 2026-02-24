import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

export default class RiskAssessmentDeptWise extends Component {
  constructor(props) {
    super(props);
    this.onChangeRisk = this.onChangeRisk.bind(this);
    this.onChangeRisk_Details = this.onChangeRisk_Details.bind(this);
    this.onChangeVulnrblt = this.onChangeVulnrblt.bind(this);
    this.onChangeVulnrblt_Details = this.onChangeVulnrblt_Details.bind(this);
    this.onChangeProbab = this.onChangeProbab.bind(this);
    this.onChangeExposr = this.onChangeExposr.bind(this);
    this.onAddRisk = this.onAddRisk.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Department: '',
      Choice: '',
      APID: 2,
      Risk_Name: '',
      Risk_Details: '',
      Vulnrblt: '',
      Vulnrblt_Details: '',
      Probab: 0,
      Exposr: 0,
      Class: '',
      Impact: 0,
      Summary: 0,
      Asst_CIAs: [],
      Asst_CIA: [],
      users2: [],
      users3: [],
      users4: [],
      users6: [],
      Assets: [],
      depts: [],
      risks: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskAssessment/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            risks: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/AssetIssue/')
        .then(response1 => {
            this.setState({
              Assets: response1.data
            })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/CIAMark/' + 2)
          .then(response1 => {
              this.setState({
                Class: response1.data.Class
              })
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('http://localhost:5000/Risk/')
            .then(response2 => {
                this.setState({
                  users2: response2.data.map(user2 => user2.Risk_Name)
                })
            })
            .catch((error) => {
              console.log(error);
            })
      
            axios.get('http://localhost:5000/Vulnerability/')
              .then(response3 => {
                  this.setState({
                    users3: response3.data.map(user3 => user3.Vulnrblt)
                  })
              })
              .catch((error) => {
                console.log(error);
              })
      
              axios.get('http://localhost:5000/Probability/')
                .then(response4 => {
                    this.setState({
                      users4: response4.data.map(user4 => user4._id)
                    })
                })
                .catch((error) => {
                  console.log(error);
                })
      
                  axios.get('http://localhost:5000/Exposure/')
                    .then(response6 => {
                        this.setState({
                          users6: response6.data.map(user6 => user6._id)
                        })
                    })
                    .catch((error) => {
                      console.log(error);
                    })

  }

  onChangeRisk(e){
    this.setState({
      Risk_Name: e.target.value
    })

  }

  onChangeRisk_Details(e){
    this.setState({
      Risk_Details: e.target.value
    })
    
  }

  onChangeVulnrblt(e){
    this.setState({
      Vulnrblt: e.target.value
    })
    
  }

  onChangeVulnrblt_Details(e){
    this.setState({
      Vulnrblt_Details: e.target.value
    })
    
  }

  onChangeExposr(e){
    this.setState({
      Exposr: e.target.value
    })

    if (this.state.Class == 'LBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 1 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 2 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 3 })
      }
    }
    else if (this.state.Class == 'MBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 2 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 3 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 4 })
      }
    }
    else if (this.state.Class == 'HBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 3 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 4 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 5 })
      }
    }
    
  }

  onChangeProbab(e){
    this.setState({
      Probab: e.target.value
    })

    if (this.state.Impact == 1)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 1 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 3 })
      }
    }
    else if (this.state.Impact == 2)
    {
      if (e.target.value == 1)
      {
        this.setState({ Summary: 1 })
      }
      else if (e.target.value == 2 || e.target.value == 3)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 4)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 5)
      {
        this.setState({ Summary: 4 })
      }
    }
    else if (this.state.Impact == 3)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 4 })
      }
    }
    else if (this.state.Impact == 4)
    {
      if (e.target.value == 1)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 2)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 3 || e.target.value == 4)
      {
        this.setState({ Summary: 4 })
      }
      else if (e.target.value == 5)
      {
        this.setState({ Summary: 5 })
      }
    }
    else if (this.state.Impact == 5)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 4 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 5 })
      }
    }
    
  }

  onAddRisk(e) {
    alert('Classification: ' + this.state.Class + '\n\nImpact Rating: ' + this.state.Impact + '\n\nSummary Rating: ' + this.state.Summary)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const riskassmnt = {
      _id: this.state._id,
      APType: "Asset",
      APID: this.state.APID,
      Risk_Name: this.state.Risk_Name,
      Risk_Details: this.state.Risk_Details,
      Vulnrblt: this.state.Vulnrblt,
      Vulnrblt_Details: this.state.Vulnrblt_Details,
      Exposr: this.state.Exposr,
      Impact: this.state.Impact,
      Probab: this.state.Probab,
      Summary: this.state.Summary,
      Date:  date,
    }

    console.log(riskassmnt);

    axios.post('http://localhost:5000/RiskAssessment/add', riskassmnt)
      .then(res => console.log(res.data));

      this.setState({
        Risk_Name: '',
        Risk_Details: '',
        Vulnrblt: '',
        Vulnrblt_Details: '',
        Probab: 0,
        Exposr: 0,
        Impact: 0,
        Summary: 0,
      })
      this.componentDidMount()

      // var msg = document.getElementById("submitcia")
      // msg.textContent="Risk Assessment Done. Click to "
      // const link = document.createElement("a");
    
      // link.setAttribute('href', `/riskassessment`);
      // link.textContent = 'Risk Assessment';
    
      // msg.appendChild(link);

    // window.location = '/riskassessment';
  }

  onSubmit(e){
    window.location = '/riskassessment';
  }

  render() {
    return (
      <div className="form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Risk Assessment Form</h3>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onAddRisk}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Asset ID: </label>
          <input  type="number"
              required
              className="form-control"
              defaultValue={this.state.APID}
              disabled = {true}/>
        </div>
        </div>
        <div className="form-box">
        <div className="form-group"> 
          <label>Select Risk: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Risk_Name}
              onChange={this.onChangeRisk}>
                <option>---Risk---</option>
              {
                this.state.users2.map(function(user2) {
                  return <option 
                    key={user2}
                    value={user2}>{user2}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Enter Risk Details: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Risk_Details}
              onChange={this.onChangeRisk_Details}
              />
        </div>
        <div className="form-group"> 
          <label>Select Vulnerability: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Vulnrblt}
              onChange={this.onChangeVulnrblt}>
                <option>---Vulnerability---</option>
              {
                this.state.users3.map(function(user3) {
                  return <option 
                    key={user3}
                    value={user3}>{user3}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Enter Vulnerability Details: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Vulnrblt_Details}
              onChange={this.onChangeVulnrblt_Details}
              />
        </div>
        <div className="form-group"> 
          <label>Select Exposure: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Exposr}
              onChange={this.onChangeExposr}>
                <option>---Exposure---</option>
              {
                this.state.users6.map(function(user6) {
                  return <option 
                    key={user6}
                    value={user6}>{user6}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Select Probability: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Probab}
              onChange={this.onChangeProbab}>
                <option>---Probability---</option>
              {
                this.state.users4.map(function(user4) {
                  return <option 
                    key={user4}
                    value={user4}>{user4}
                    </option>;
                })
              }
          </select>
        </div>
        </div>
        
        <div className="form-group">
          <input type="submit" value="Add New Risk" className="btn navbar-gradient navlink-custom"/>
          <button className="btn navbar-gradient navlink-custom" onClick={this.onSubmit}>Submit</button>
        </div>
        <div className="alert" id="submitcia"></div>
      </form>
      </div>

      
      <div className="col">
                        <div className="form-group">
                                <table id="rept1">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Risk Assessment Report</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th style={{width: 200}}>Risk</th>
                                                        <th style={{width: 200}}>Vulnerability</th>
                                                        <th style={{width: 200}}>Exposure</th>
                                                        <th style={{width: 200}}>Impact</th>
                                                        <th style={{width: 200}}>Probability</th>
                                                        <th style={{width: 200}}>Summary</th>
                                                        <th style={{width: 200}}>Risk Owner</th>
                                                        <th style={{width: 200}}>Mitigation</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                  this.state.risks.filter(risk => risk.APID == this.state.APID).map((risk, index) => {
                                                    return <tr key={index}>
                                                    <td style={{width: 200}}>{risk.Risk_Name}</td>
                                                    <td style={{width: 200}}>{risk.Vulnrblt}</td>
                                                    <td style={{width: 200}}>{risk.Exposr}</td>
                                                    <td style={{width: 200}}>{risk.Impact}</td>
                                                    <td style={{width: 200}}>{risk.Probab}</td>
                                                    <td style={{width: 200}}>{risk.Summary}</td>
                                                    <td style={{width: 200}}>{
                                                      this.state.Assets.filter(asst => asst._id === 
                                                        Math.max(...this.state.Assets.filter(asst => asst.IssuedID.split("-")[0] === this.state.APID).map(asst => {
                                                          return asst._id                    
                                                        }))).map(asst => {
                                                          return asst.IssuedTo
                                                        })}</td>
                                                        <td>
                                                          <Link className="action2" to="/reportdownload">View Details</Link>
                                                        </td>
                                                    </tr>
                                                  })
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept1"
                                filename="Asset Report"
                                sheet="Asset Report"
                                buttonText="Download Report" />  
                        </div>
      </div>
      </div>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}