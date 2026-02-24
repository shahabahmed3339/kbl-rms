import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Custom.css';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import store from '../store';

export default class HREvaluationForm extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);

    this.state = {
      _id: 1,
      Name: this.props.match.params.Name,
      Designation: '',
      Status: '',
      Feedback: '',
      reqs: [],
      Applicant: [],
      TechEval: [],
      hrs: [],
      hrschedule: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HREvaluation/')
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

    axios.get('http://localhost:5000/HR/')
      .then(response1 => {
          this.setState({
            hrs: response1.data
          })
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/TechEvaluation/')
      .then(response1 => {
          this.setState({
            TechEval: response1.data
          })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Application/')
        .then(res => {
            this.setState({
              Applicant: res.data,
              Designation: res.data.filter(app => app.Name === this.state.Name).map(cv=> cv.Designation)[0]
            })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/Requisition/')
          .then(res => {
              this.setState({
                reqs: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('http://localhost:5000/HRSchedule/')
            .then(response1 => {
                this.setState({
                  hrschedule: response1.data
                })
            })
            .catch((error) => {
              console.log(error);
            })

  }

  onChangeStatus(e) {
    this.setState({
      Status: e.target.value
    })
  }

  onChangeFeedback(e) {
    this.setState({
      Feedback: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Evaluation is successfully submitted')
    e.preventDefault();

    const id = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl._id)[0]

    const evaluation = {
      Name : this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Name)[0],
      Designation : this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Designation)[0],
      Email : this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Email)[0],
      Contact : this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Contact)[0],
      ApplDate : this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.ApplDate)[0],
      Status : 'Rejected',
    }

    console.log(evaluation);

    axios.post('http://localhost:5000/Application/update/' + id, evaluation)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submitreject")
      msg.textContent="This application has been rejected. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/hrevaluation`);
      link.textContent = 'Schedule Other HR Evaluation';
    
      msg.appendChild(link);

    // window.location = '/hrevaluation';
  }

  onSubmit1(e) {
    // alert('Your Evaluation is successfully submitted')
    e.preventDefault();

    const id = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl._id)[0]
    const Name = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Name)[0]
    const Designation = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Designation)[0]
    const Email = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Email)[0]
    const Contact = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.Contact)[0]
    const ApplDate = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.ApplDate)[0]
    const CV = this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => appl.CV)[0]

    const evaluation = {
      Name : Name,
      Designation : Designation,
      Email : Email,
      Contact : Contact,
      ApplDate : ApplDate,
      Status : this.state.Status,
    }

    console.log(evaluation);

    axios.post('http://localhost:5000/Application/update/' + id, evaluation)
      .then(res => console.log(res.data));
      
    const evaluation1 = {
      _id: this.state._id,
      CV: CV,
      Name : Name,
      Designation : Designation,
      Status : this.state.Status,
      Feedback: this.state.Feedback
    }

    console.log(evaluation1);

    axios.post('http://localhost:5000/HREvaluation/add', evaluation1)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submiteval")
      msg.textContent="Your Evaluation is Submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/hrevaluation`);
      link.textContent = 'Schedule Other HR Evaluation';
    
      msg.appendChild(link);

    // window.location = '/hrevaluation';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>HR Evaluation Details</h3>
      <div className="form-box">
      <h5>Requisition Details:</h5>
        <div className="form-group cols">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Department</th>
                                                        <th>Designation</th>
                                                        <th>Requested By</th>
                                                        <th>Requisition Date</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.reqs.filter(req => req.Designation === this.state.Designation).map(req => {
                                                    return  <tr>
                                                              <td>{req._id}</td>
                                                              <td>{req.Department}</td>
                                                              <td>{req.Designation}</td>
                                                              <td>{req.RequestedBy}</td>
                                                              <td>{req.ReqsDate}</td>
                                                            </tr>
                                                          })[0]
                                                }
                                        </tbody>
                                </table>
        </div>
        
      <h5>Applicant Details:</h5>
        <div className="form-group cols">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th>Application Date</th>
                                                        <th>Name</th>
                                                        <th>CV</th>
                                                        <th>Cover Letter</th>
                                                        <th>Application Status</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.Applicant.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => {
                                                    return  <tr>
                                                              <td>{appl.ApplDate}</td>
                                                              <td>{appl.Name}</td>
                                                              <td>
                                                                <a className="action2" href={appl.CV} target="_blank">View CV</a>
                                                              </td>
                                                              <td>
                                                                <a className="action2" href={appl.CL} target="_blank">View Cover Letter</a>
                                                              </td>
                                                              <td>{appl.Status}</td>
                                                            </tr>
                                                          })[0]
                                                }
                                        </tbody>
                                </table>
        </div>
        
        <h5>Technical Evaluation Details:</h5>
          <div className="form-group cols">
                                  <table id="rept">
                                          <thead>
                                                  <tr>
                                                          <th>S.No.</th>
                                                          <th>Name</th>
                                                          <th>Designation</th>
                                                          <th>Remarks</th>
                                                          <th>Status</th>
                                                  </tr>  
                                          </thead>
                                          <tbody>
                                                  {
                                                  this.state.TechEval.filter(appl => appl.Designation === this.state.Designation && appl.Name == this.state.Name).map((appl, index) => {
                                                      return  <tr key={index}>
                                                                <td>{index+1}</td>
                                                                <td>{appl.Evaluator}</td>
                                                                <td>{this.state.hrs.filter(hr => hr.Name === appl.Evaluator).map(hr => hr.Designation)}</td>
                                                                <td>{appl.Feedback}</td>
                                                                <td>{appl.Status}</td>
                                                              </tr>
                                                            })
                                                  }
                                          </tbody>
                                  </table>
          </div>
          </div>

      {/* {
        this.state.reqs.filter(req => req.Designation === this.state.Designation).map(req => {
          return <div className="form-control">
          <p><label style={{fontWeight:"500"}}>ID:</label> {req._id}</p>
          <p><label style={{fontWeight:"500"}}>Department:</label> {req.Department}</p>
          <p><label style={{fontWeight:"500"}}>Designation:</label> {req.Designation}</p>
          <p><label style={{fontWeight:"500"}}>Requested By:</label> {req.RequestedBy}</p>
          <p><label style={{fontWeight:"500"}}>Requisition Date:</label> {req.ReqsDate}</p>
          </div>
        })[0]
      } */}




      { this.state.Applicant.filter(sts => sts.Name == this.state.Name && sts.Designation === this.state.Designation).map(sts => {return sts.Status})[0] === 'Rejected' ?
      <>
      This Application has been Rejected
      </>
      : this.state.Applicant.filter(sts => sts.Name == this.state.Name && sts.Designation === this.state.Designation).map(sts => {return sts.Status})[0] === 'Approved' ?
      <>
      This Application has been Approved
      </>
      : <>{
        this.state.hrschedule.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => {return appl.Status})[0] != 'Scheduled' ?
        
      <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="submit"
            value="Reject"
            className="btn navbar-gradient navlink-custom"
            style={{marginTop: "10px"}}
            />
          </div>
        <div className="alert" id="submitreject"></div>
          <Button className="btn navbar-gradient navlink-custom">
            <Link className="action2" to={"/hrschedule/"+this.state.Name}>Schedule HR Evaluation</Link>
          </Button>
      </form>
      : <>
          <h5>HR Evaluation Scheduled on {this.state.hrschedule.filter(appl => appl.Designation === this.state.Designation && appl.Name === this.state.Name).map(appl => {return <>{appl.EvalDate} at {appl.EvalTime}</>})[0]}</h5>

          <form onSubmit={this.onSubmit1}>
              <div className="form-group"> 
                <label>Status: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.Status}
                    onChange={this.onChangeStatus}>
                      <option>---Approve/Reject---</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                </select>
              </div>
              <div className="form-group"> 
                <label>Feedback: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Feedback}
                    onChange={this.onChangeFeedback}
                    />
              </div>
              <div className="form-group">
                <input type="submit"
                value="Submit Evaluation"
                className="btn navbar-gradient navlink-custom"
                style={{marginTop: "10px"}}
                />
              </div>
        <div className="alert" id="submiteval"></div>
          </form>
        </> 
      }</>
      }
      </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}