import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

export default class RiskMitigation extends Component {
  constructor(props) {
    super(props);

    this.onChangeChoice = this.onChangeChoice.bind(this);
    this.onChangeAPID = this.onChangeAPID.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeRiskID = this.onChangeRiskID.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeMngmnt_System = this.onChangeMngmnt_System.bind(this);
    this.onChangeControls = this.onChangeControls.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeProbab = this.onChangeProbab.bind(this);
    this.onChangeExposr = this.onChangeExposr.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Choice: '',
      APID: 0,
      Action: '',
      Mngmnt_System: '',
      Risk_ID: 0,
      Controls: '',
      Department: '',
      Description: '',
      Probab: 0,
      Exposr: 0,
      Class: '',
      Impact: 0,
      Summary: 0,
      users1: [],
      users2: [],
      users3: [],
      users4: [],
      users6: [],
      risks: [],
      Assets: [],
      depts: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskMitigation/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:5000/RiskAssessment/')
        .then(response3 => {
          if (response3.data.length > 0) {
            this.setState({
              risks: response3.data
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
        axios.get('http://localhost:5000/Department/')
          .then(response3 => {
            if (response3.data.length > 0) {
              this.setState({
                depts: response3.data
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

  }

  onChangeAPID(e) {
    e.persist();
    this.setState({
      APID: e.target.value,
    })
  
            axios.get('http://localhost:5000/CIAMark/')
              .then(response7 => {
                  this.setState({
                    Class : response7.data.filter(cia => cia._id ===
                      Math.max(...response7.data.filter(cia1 => cia1.APID == e.target.value && cia1.APType === this.state.Choice).map(function(cia1) {
                        return cia1._id
                      })
                      )).map(cia => cia.Class)
                    // Class: response7.data.filter(cias => cias.APID == e.target.value && cias.APType === this.state.Choice).map(user7 => user7.Class)
                  })
              })
              .catch((error) => {
                console.log(error);
              })

  }

  onChangeChoice(e){
    e.persist();
    this.setState({
      Choice: e.target.value,
      users1: 
        this.state.risks.filter(risk => risk._id ===
          Math.max(...this.state.risks.filter(risk1 => risk1.APID === risk.APID && risk1.APType === e.target.value).map(function(risk1) {
            return risk1._id
          })
          )).map(risk => risk)
    })

  }

  onChangeDepartment(e){
    this.setState({
      Department: e.target.value,
      Choice: "Asset"
    })

  }

  onChangeRiskID(e){
    this.setState({
      Risk_ID: e.target.value
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

  onChangeAction(e){
    this.setState({
      Action: e.target.value
    })

  }

  onChangeMngmnt_System(e){
    this.setState({
      Mngmnt_System: e.target.value
    })
    if (e.target.value == 'Information Security Management System')
    {

      axios.get('http://localhost:5000/InformationSecurityManagementSystem/')
        .then(response3 => {
            this.setState({
              users3: response3.data.map(user3 => user3.ClauseID + ' - ' + user3.Description)
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else if (e.target.value == 'Quality Management System')
    {

      axios.get('http://localhost:5000/QualityManagementSystem/')
        .then(response3 => {
            this.setState({
              users3: response3.data.map(user3 => user3.ClauseID + ' - ' + user3.Description)
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else if (e.target.value == 'Service Management System')
    {

      axios.get('http://localhost:5000/ServiceManagementSystem/')
        .then(response3 => {
            this.setState({
              users3: response3.data.map(user3 => user3.ClauseID + ' - ' + user3.Description)
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
    
  }

  onChangeControls(e){
    this.setState({
      Controls: e.target.value
    })
    
  }

  onChangeDescription(e){
    this.setState({
      Description: e.target.value
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

  onSubmit(e) {
    alert('Classification: ' + this.state.Class + '\n\nImpact Rating: ' + this.state.Impact + '\n\nSummary Rating: ' + this.state.Summary)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const riskmtgtn = {
      _id: this.state._id,
      APType: "Asset",
      APID: this.state.APID,
      Risk_ID: this.state.Risk_ID,
      Action: this.state.Action,
      Mngmnt_System: this.state.Mngmnt_System,
      Controls: this.state.Controls,
      Description: this.state.Description,
      Exposr: this.state.Exposr,
      Impact: this.state.Impact,
      Probab: this.state.Probab,
      Summary: this.state.Summary,
      Date: date,
    }

    console.log(riskmtgtn);

    axios.post('http://localhost:5000/RiskMitigation/add', riskmtgtn)
      .then(res => console.log(res.data));
      
      this.setState({
        _id: 1,
        Choice: '',
        APID: 0,
        Action: '',
        Mngmnt_System: '',
        Risk_ID: 0,
        Controls: '',
        Department: '',
        Description: '',
        Probab: 0,
        Exposr: 0,
        Class: '',
        Impact: 0,
        Summary: 0,
      })

    // window.location = '/riskmitigation';
  }

  render() {
    return (
      <div className="form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Risk Mitigation</h3>

    <Tabs>
      <TabList>
        <Tab>Asset Wise</Tab>
        <Tab>Department Wise</Tab>
      </TabList>

      <TabPanel>
      <div className="row">
      <div className="col">
        <form onSubmit={this.onSubmit}>
      <div className="form-box">
          <div className="form-group"> 
            <label>Select: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Choice}
                onChange={this.onChangeChoice}>
                  <option>---Asset/Process---</option>
                  <option>Asset</option>
                  <option>Process</option>
            </select>
            </div>
          <div className="form-group"> 
            <label>Risk Assessed ID: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.APID}
                onChange={this.onChangeAPID}>
                  <option>---Select Asset/Process ID---</option>
                {
                  this.state.users1.map(function(user1) {
                    return <option 
                      key={user1.APID}
                      value={user1.APID}>{user1.APID}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Risk ID: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Risk_ID}
                onChange={this.onChangeRiskID}>
                  <option>---Select Risk ID---</option>
                {
                  this.state.risks.filter(risk => risk.APID == this.state.APID && risk.APType === this.state.Choice).map(function(risk) {
                    return <option 
                      key={risk._id}
                      value={risk._id}>{risk._id}
                      </option>;
                  })
                }
            </select>
          </div>
          </div>
      <div className="form-box">
          <div className="form-group"> 
            <label>Select Action: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Action}
                onChange={this.onChangeAction}>
                <option>---Select Action---</option>
                <option>Corrective Action</option>
                <option>Preventive Action</option>
                <option>Compliance Action</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Management: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Mngmnt_System}
                onChange={this.onChangeMngmnt_System}>
                <option>---Select Management System---</option>
                <option>Quality Management System</option>
                <option>Service Management System</option>
                <option>Information Security Management System</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Select Control: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Controls}
                onChange={this.onChangeControls}>
                  <option>---Select Control---</option>
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
            <label>Enter Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Description}
                onChange={this.onChangeDescription}
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
            <input type="submit" value="Calculate Risk Level" className="btn navbar-gradient navlink-custom" />
          </div>
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
                                                        <th style={{width: 200}}>Risk ID</th>
                                                        <th style={{width: 200}}>Risk</th>
                                                        <th style={{width: 200}}>Vulnerability</th>
                                                        <th style={{width: 200}}>Exposure</th>
                                                        <th style={{width: 200}}>Impact</th>
                                                        <th style={{width: 200}}>Probability</th>
                                                        <th style={{width: 200}}>Summary</th>
                                                        <th style={{width: 200}}>Risk Owner</th>
                                                        {/* <th style={{width: 200}}>Action</th> */}
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                  this.state.risks.filter(risk => risk.APID == this.state.APID && risk.APType === this.state.Choice).map((risk, index) => {
                                                    return <tr key={index}>
                                                    <td style={{width: 200}}>{risk._id}</td>
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
                                                        {/* <td>
                                                          <Link className="action2" to={"/controlrisk/"+this.state.APID+risk.Risk_Name}>Mitigate</Link>
                                                        </td> */}
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
      </TabPanel>
      <TabPanel>
      <div className="row">
      <div className="col">
        <form onSubmit={this.onSubmit}>
      <div className="form-box">
          <div className="form-group"> 
            <label>Select Department: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Department}
                onChange={this.onChangeDepartment}>
                  <option>---Select Department---</option>
                {
                  this.state.depts.map(function(dept) {
                    return <option 
                      key={dept.Name}
                      value={dept.Name}>{dept.Name}
                      </option>;
                  })
                }
            </select>
            </div>
          <div className="form-group"> 
            <label>Risk Assessed ID: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.APID}
                onChange={this.onChangeAPID}>
                  <option>---Select Asset/Process ID---</option>
                                                {
                                                  this.state.Assets.filter(asst => asst.Department == this.state.Department).map((asst, index) => {
                                                    return <>
                                                    {
                                                      this.state.risks.filter(risk1 => risk1._id == 
                                                        Math.max(...this.state.risks.filter(risk => risk.APID == asst.IssuedID.split("-")[0] && risk.APType === "Asset").map((risk, i) => {
                                                        return risk._id
                                                      })
                                                      )).map((risk1, i) => {
                                                        return <option 
                                                        key={i}
                                                        value={risk1.APID}>{risk1.APID}
                                                        </option>;
                                                      })
                                                    }
                                                    </>
                                                  })
                                                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Risk ID: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Risk_ID}
                onChange={this.onChangeRiskID}>
                  <option>---Select Risk ID---</option>
                                                    {
                                                      this.state.risks.filter(risk => risk.APID == this.state.APID && risk.APType === "Asset").map((risk, i) => {
                                                        return <option 
                                                        key={i}
                                                        value={risk._id}>{risk._id}
                                                        </option>;
                                                      })
                                                    }
            </select>
          </div>
          </div>
      <div className="form-box">
          <div className="form-group"> 
            <label>Select Action: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Action}
                onChange={this.onChangeAction}>
                <option>---Select Action---</option>
                <option>Corrective Action</option>
                <option>Preventive Action</option>
                <option>Compliance Action</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Management: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Mngmnt_System}
                onChange={this.onChangeMngmnt_System}>
                <option>---Select Management System---</option>
                <option>Quality Management System</option>
                <option>Service Management System</option>
                <option>Information Security Management System</option>
            </select>
          </div>
          <div className="form-group"> 
            <label>Select Control: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Controls}
                onChange={this.onChangeControls}>
                  <option>---Select Control---</option>
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
            <label>Enter Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Description}
                onChange={this.onChangeDescription}
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
            <input type="submit" value="Calculate Risk Level" className="btn navbar-gradient navlink-custom" />
          </div>
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
                                                        <th style={{width: 200}}>Asset ID</th>
                                                        <th style={{width: 200}}>Risk ID</th>
                                                        <th style={{width: 200}}>Risk</th>
                                                        <th style={{width: 200}}>Vulnerability</th>
                                                        <th style={{width: 200}}>Exposure</th>
                                                        <th style={{width: 200}}>Impact</th>
                                                        <th style={{width: 200}}>Probability</th>
                                                        <th style={{width: 200}}>Summary</th>
                                                        <th style={{width: 200}}>Risk Owner</th>
                                                        {/* <th style={{width: 200}}>Action</th> */}
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                  this.state.Assets.filter(asst => asst.Department == this.state.Department).map((asst, index) => {
                                                    return <>
                                                    {
                                                      this.state.risks.filter(risk => risk.APID == asst.IssuedID.split("-")[0] && risk.APType === "Asset").map((risk, i) => {
                                                        return <tr key={i}>
                                                          <td style={{width: 200}}>{risk.APID}</td>
                                                          <td style={{width: 200}}>{risk._id}</td>
                                                          <td style={{width: 200}}>{risk.Risk_Name}</td>
                                                          <td style={{width: 200}}>{risk.Vulnrblt}</td>
                                                          <td style={{width: 200}}>{risk.Exposr}</td>
                                                          <td style={{width: 200}}>{risk.Impact}</td>
                                                          <td style={{width: 200}}>{risk.Probab}</td>
                                                          <td style={{width: 200}}>{risk.Summary}</td>
                                                          <td style={{width: 200}}>{asst.IssuedTo}</td>
                                                              {/* <td>
                                                                <Link className="action2" to={"/controlrisk/"+risk.APID+risk.Risk_Name}>Mitigate</Link>
                                                              </td> */}
                                                        </tr>
                                                      })
                                                    }
                                                    </>
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
      </TabPanel>
    </Tabs>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}