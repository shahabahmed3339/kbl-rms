import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

export default class RiskMitigationAsset extends Component {
  constructor(props) {
    super(props);

    this.onChangeChoice = this.onChangeChoice.bind(this);
    this.onChangeAPID = this.onChangeAPID.bind(this);
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
      APID: this.props.match.params.id,
      Risk_Name: this.props.match.params.Risk_Name,
      Action: '',
      Mngmnt_System: '',
      Controls: '',
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
      riskmtg: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskMitigation/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            riskmtg: response3.data
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

        axios.get('http://localhost:5000/AssetIssue/')
          .then(response1 => {
              this.setState({
                Assets: response1.data
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
      
                axios.get('http://localhost:5000/CIAMark/')
                  .then(response7 => {
                      this.setState({
                        Class : response7.data.filter(cia => cia._id ===
                          Math.max(...response7.data.filter(cia1 => cia1.APID == this.state.APID && cia1.APType === "Asset").map(function(cia1) {
                            return cia1._id
                          })
                          )).map(cia => cia.Class)
                        // Class: response7.data.filter(cias => cias.APID == this.state.APID && cias.APType === "Asset").map(user7 => user7.Class)
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
      Risk_Name: this.state.Risk_Name,
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

    // window.location = '/riskmitigation';
  }

  render() {
    return (
      <div className="form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Risk Mitigation</h3>
      <div className="row">
      <div className="col">
        <form onSubmit={this.onSubmit}>
      <div className="form-box">
          <div className="form-group"> 
            <label>Risk ID: </label>
            <input  type="number"
              required
              className="form-control"
              defaultValue={this.state.APID}
              disabled = {true}/>
          </div>
          <div className="form-group"> 
            <label>Risk Name: </label>
            <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Risk_Name}
              disabled = {true}/>
          </div>
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
          Chart Area
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