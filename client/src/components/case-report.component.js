import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import store from '../store';

export default class CaseReport extends Component {
  constructor(props) {
    super(props);

    this.onChangeProbType = this.onChangeProbType.bind(this);
    this.onChangeProblem = this.onChangeProblem.bind(this);
    this.onChangeProbDetail = this.onChangeProbDetail.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeImportance = this.onChangeImportance.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    this.state = {
      _id: 1,
      rep_id: 0,
      ProbType: '',
      Problem: '',
      ProbDetail: '',
      Severity: 0,
      Importance: 0,
      ReportedBy: store.getState().auth.user.name,
      Status: '',
      sts: '',
      Remarks: '',
      Feedback: '',
      Problems: [],
      Sevrt: [],
      Importances: [],
      CaseReports: [],
      CaseData: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/CaseReport/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            CaseReports: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
    axios.get('http://localhost:5000/ProblemTypes/')
    .then(res => {
      if (res.data.length > 0) {
        this.setState({
          Problems: res.data
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
      
    axios.get('http://localhost:5000/Severity/')
    .then(res => {
      if (res.data.length > 0) {
        this.setState({
          Sevrt: res.data
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
      
    axios.get('http://localhost:5000/Importance/')
    .then(res => {
      if (res.data.length > 0) {
        this.setState({
          Importances: res.data
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }

  onChangeProbType(e) {
    this.setState({
      ProbType: e.target.value
    })
  }

  onChangeProblem(e) {
    this.setState({
      Problem: e.target.value
    })
  }

  onChangeProbDetail(e) {
    this.setState({
      ProbDetail: e.target.value
    })
  }

  onChangeSeverity(e) {
    this.setState({
      Severity: e.target.value
    })
  }

  onChangeImportance(e) {
    this.setState({
      Importance: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
      Status: e.target.value,
      sts: e.target.value === "Submitted" ? "Received" : "Resolved"
    })
  }

  onChangeID(e) {
    this.setState({
      CaseData: this.state.CaseReports.filter(cas => cas._id == e.target.value).map(cas => cas)[0],
      rep_id: e.target.value
    })
  }

  onChangeRemarks(e) {
    this.setState({
      Remarks: e.target.value
    })
  }

  onChangeFeedback(e) {
    this.setState({
      Feedback: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const problem = {
      _id: this.state._id,
      ProbType: this.state.ProbType,
      Problem: this.state.Problem,
      ProbDetail: this.state.ProbDetail,
      Severity: this.state.Severity,
      Importance: this.state.Importance,
      ReportedBy: this.state.ReportedBy,
      AssignedTo: "Admin",
      Date: date,
      Status: "Submitted",
    }

    console.log(problem);

    axios.post('http://localhost:5000/CaseReport/add', problem)
      .then(res => console.log(res.data));

      this.setState({
        _id: this.state._id,
        ProbType: '',
        Problem: '',
        ProbDetail: '',
        Severity: 0,
        Importance: 0,
      })
      this.componentDidMount()

      var msg = document.getElementById("submitcase")
      msg.textContent="Your Case is Reported with id = "+this.state._id+". Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/casereport`);
      link.textContent = 'Refresh Page';
    
      msg.appendChild(link);

      // window.location = '/setProbType';
  }

  onSubmit1(e) {
    e.preventDefault();

    const problem = {
      Risk_ID: this.state.CaseData.Risk_ID,
      ProbType: this.state.CaseData.ProbType,
      Problem: this.state.CaseData.Problem,
      ProbDetail: this.state.CaseData.ProbDetail,
      Severity: this.state.CaseData.Severity,
      Importance: this.state.CaseData.Importance,
      ReportedBy: this.state.CaseData.ReportedBy,
      AssignedTo: this.state.CaseData.AssignedTo,
      Date: this.state.CaseData.Date,
      Status: this.state.sts,
      Remarks: this.state.Remarks
    }

    console.log(problem);

    axios.post('http://localhost:5000/CaseReport/update/'+this.state.rep_id, problem)
      .then(res => console.log(res.data));

      this.setState({
        rep_id: 0,
        Remarks: '',
      })
      this.componentDidMount()

      var msg = document.getElementById("submitcase1")
      msg.textContent="Your Case with id = "+this.state.rep_id+" is updated. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/casereport`);
      link.textContent = 'Refresh Page';
    
      msg.appendChild(link);

      // window.location = '/setProbType';
  }

  onSubmit2(e) {
    e.preventDefault();

    const problem = {
      Risk_ID: this.state.CaseData.Risk_ID,
      ProbType: this.state.CaseData.ProbType,
      Problem: this.state.CaseData.Problem,
      ProbDetail: this.state.CaseData.ProbDetail,
      Severity: this.state.CaseData.Severity,
      Importance: this.state.CaseData.Importance,
      ReportedBy: this.state.CaseData.ReportedBy,
      AssignedTo: this.state.CaseData.AssignedTo,
      Date: this.state.CaseData.Date,
      Status: "Closed",
      Remarks: this.state.CaseData.Remarks,
      Feedback: this.state.Feedback
    }

    console.log(problem);

    axios.post('http://localhost:5000/CaseReport/update/'+this.state.rep_id, problem)
      .then(res => console.log(res.data));

      this.setState({
        rep_id: 0,
        Feedback: '',
      })
      this.componentDidMount()

      var msg = document.getElementById("submitcase2")
      msg.textContent="Your Feedback with Case id = "+this.state.rep_id+" is submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/casereport`);
      link.textContent = 'Refresh Page';
    
      msg.appendChild(link);

      // window.location = '/setProbType';
  }

  render() {
    return (
      <div className="form-box1">
      <h3>Case Report Form</h3>
    <UnlockAccess request={'Admin'}>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onSubmit1}>
        <div className="form-box">
        <div className="form-group"> 
          <label>Case Status: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Status}
              onChange={this.onChangeStatus}>
                <option>---Select Case Status---</option>
                <option>Submitted</option>
                <option>Received</option>
          </select>
        </div>
        <div className="form-group"> 
          <label>Case ID: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.rep_id}
              onChange={this.onChangeID}>
                <option>---Select Case ID---</option>
              {
                this.state.CaseReports.filter(prob => prob.Status === this.state.Status).map(function(prob) {
                  return <option 
                    key={prob._id}
                    value={prob._id}>{prob._id}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Remarks: </label>
            <textarea
              required
              className="form-control"
              value={this.state.Remarks}
              onChange={this.onChangeRemarks}
            />
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update Case" className="btn navbar-gradient navlink-custom" />
        </div>
          <div className="alert" id="submitcase1"></div>
      </form>
        </div>
        <div className="col">
          <div className="form-group">
            <table id="rept">
              <thead>
                <tr>
                  <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Cases Reported</th>
                </tr>
                </thead>
                <thead>
                  <tr>
                    <th style={{width: 200}}>Case ID</th>
                    <th style={{width: 200}}>Problem Type</th>
                    <th style={{width: 200}}>Problem</th>
                    <th style={{width: 200}}>Problem Detail</th>
                    <th style={{width: 200}}>Severity</th>
                    <th style={{width: 200}}>Importance</th>
                    <th style={{width: 200}}>Reported By</th>
                    <th style={{width: 200}}>Assigned To</th>
                    <th style={{width: 200}}>Date of Report</th>
                    <th style={{width: 200}}>Status</th>
                    <th style={{width: 200}}>Remarks</th>
                    <th style={{width: 200}}>Feedback</th>
                  </tr>  
                </thead>
                <tbody>
                  {
                    this.state.CaseReports.map((cases, i) => {
                      return <tr key={i}>
                        <td>{cases._id}</td>
                        <td>{cases.ProbType}</td>
                        <td>{cases.Problem}</td>
                        <td>{cases.ProbDetail}</td>
                        <td>{cases.Severity}</td>
                        <td>{cases.Importance}</td>
                        <td>{cases.ReportedBy}</td>
                        <td>{cases.AssignedTo}</td>
                        <td>{cases.Date}</td>
                        <td>{cases.Status}</td>
                        <td>{cases.Remarks}</td>
                        <td>{cases.Feedback}</td>
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
                                filename="Case Report"
                                sheet="Case Report"
                                buttonText="Download Report" />  
                        </div>
        </div>
        </div>
      </UnlockAccess>

      <UnlockAccess request={'User'}>
      <div className="row">
      <div className="col">
        <div className="form-box">
        <div className="form-group"> 
          <label>Option: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Status}
              onChange={this.onChangeStatus}>
                <option>---New/Feedback---</option>
                <option>New</option>
                <option>Feedback</option>
          </select>
        </div>
        </div>
        {
        this.state.Status === "New" ?

        <form onSubmit={this.onSubmit}>
          <div className="form-box">
          <div className="form-group"> 
            <label>Problem Type: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.ProbType}
                onChange={this.onChangeProbType}>
                  <option>---Select Problem Type---</option>
                {
                  this.state.Problems.map(function(prob) {
                    return <option 
                      key={prob.ProbType}
                      value={prob.ProbType}>{prob.ProbType}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Problem: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Problem}
                onChange={this.onChangeProblem}
                />
          </div>
          <div className="form-group">
            <label>Problem Detail: </label>
              <input type="text"
                required
                className="form-control"
                value={this.state.ProbDetail}
                onChange={this.onChangeProbDetail}
              />
          </div>
          <div className="form-group">
            <label>Severity: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Severity}
                onChange={this.onChangeSeverity}>
                  <option>---Select Severity---</option>
                {
                  this.state.Sevrt.map(function(sevt) {
                    return <option 
                      key={sevt._id}
                      value={sevt._id}>{sevt._id}-{sevt.Severt}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Importance: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Importance}
                onChange={this.onChangeImportance}>
                  <option>---Select Importance---</option>
                {
                  this.state.Importances.map(function(imp) {
                    return <option 
                      key={imp._id}
                      value={imp._id}>{imp._id}-{imp.Importance}
                      </option>;
                  })
                }
            </select>
          </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Report Case" className="btn navbar-gradient navlink-custom" />
          </div>
            <div className="alert" id="submitcase"></div>
        </form>

        : this.state.Status === "Feedback" ?

        <form onSubmit={this.onSubmit2}>
          <div className="form-box">
          <div className="form-group"> 
            <label>Case ID: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.rep_id}
                onChange={this.onChangeID}>
                  <option>---Select Case ID---</option>
                {
                  this.state.CaseReports.filter(prob => prob.Status === "Resolved" && prob.ReportedBy === this.state.ReportedBy).map(function(prob) {
                    return <option 
                      key={prob._id}
                      value={prob._id}>{prob._id}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Feedback: </label>
              <textarea
                required
                className="form-control"
                value={this.state.Feedback}
                onChange={this.onChangeFeedback}
              />
          </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Submit Feedback" className="btn navbar-gradient navlink-custom" />
          </div>
            <div className="alert" id="submitcase2"></div>
        </form>

        : null
        }
        </div>
        <div className="col">
          <div className="form-group">
            <table id="rept1">
              <thead>
                <tr>
                  <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Cases Reported</th>
                </tr>
                </thead>
                <thead>
                  <tr>
                    <th style={{width: 200}}>Case ID</th>
                    <th style={{width: 200}}>Problem Type</th>
                    <th style={{width: 200}}>Problem</th>
                    <th style={{width: 200}}>Problem Detail</th>
                    <th style={{width: 200}}>Severity</th>
                    <th style={{width: 200}}>Importance</th>
                    <th style={{width: 200}}>Assigned To</th>
                    <th style={{width: 200}}>Date of Report</th>
                    <th style={{width: 200}}>Status</th>
                    <th style={{width: 200}}>Remarks</th>
                    <th style={{width: 200}}>Feedback</th>
                  </tr>  
                </thead>
                <tbody>
                  {
                    this.state.CaseReports.filter(cas => cas.ReportedBy === this.state.ReportedBy).map((cases, i) => {
                      return <tr key={i}>
                        <td>{cases._id}</td>
                        <td>{cases.ProbType}</td>
                        <td>{cases.Problem}</td>
                        <td>{cases.ProbDetail}</td>
                        <td>{cases.Severity}</td>
                        <td>{cases.Importance}</td>
                        <td>{cases.AssignedTo}</td>
                        <td>{cases.Date}</td>
                        <td>{cases.Status}</td>
                        <td>{cases.Remarks}</td>
                        <td>{cases.Feedback}</td>
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
                                filename="Case Report"
                                sheet="Case Report"
                                buttonText="Download Report" />  
                        </div>
        </div>
        </div>
      </UnlockAccess>
    </div>
    )
  }
}