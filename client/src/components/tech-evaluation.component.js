import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import store from '../store';

export default class ShortList extends Component {
  constructor(props) {
    super(props);

    this.onChangeReqID = this.onChangeReqID.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);

    this.state = {
      Designation: '',
      Title: '',
      Status: '',
      Feedback: '',
      Evaluator: store.getState().auth.user.name,
      users1: [],
      users2: [],
      users3: [],
      users4: [],
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/TechEvaluation/')
      .then(response1 => {
          this.setState({
            users1: response1.data
          })
      })
      .catch((error) => {
        console.log(error);
      })
      
      axios.get('http://localhost:5000/Requisition/')
        .then(response1 => {
            this.setState({
              users2: response1.data
            })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/Application/')
          .then(response1 => {
              this.setState({
                users3: response1.data
              })
          })
          .catch((error) => {
            console.log(error);
          })

          axios.get('http://localhost:5000/TechSchedule/')
            .then(response1 => {
                this.setState({
                  users4: response1.data
                })
            })
            .catch((error) => {
              console.log(error);
            })

  }

  onChangeReqID(e) {
    this.setState({
      Designation: this.state.users2.filter(app => app._id == e.target.value).map(app => app.Designation),
      Title: this.state.users2.filter(app => app._id == e.target.value).map(app => app.Title)
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

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Technical Evaluation</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group">
          <label>Select Requisition ID: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.reqID}
              onChange={this.onChangeReqID}>
              <option>---Select Requisition ID---</option>
              {
                this.state.users2.map(function(user2) {
                  return <option 
                    key={user2._id}
                    value={user2._id}>{user2._id}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Title}
              disabled = {true}/>
        </div>
        <br/>
        <div className="form-group cols">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Shortlisted Applications</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>Name</th>
                                                        <th>Applied For</th>
                                                        <th>CV</th>
                                                        <th>Evaluation</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users4.filter(req => req.Designation == this.state.Designation).map((p, index) => {
                                                    return  <tr key={index}>
                                                              <td>{p.Name}</td>
                                                              <td>{p.Designation}</td>
                                                              <td>
                                                                <a className="action2" href={p.CV} target="_blank">View CV</a>
                                                              </td>
                                                              <td>
                                                                {
                                                                  this.state.users1.filter(sts => sts.CV == p.CV && sts.Evaluator === this.state.Evaluator).map(sts => {return sts.Evaluator})[0] ? <>Evaluated</> :
                                                                  <Link className="action2" to={"/techevaluation/"+this.state.users3.filter(app => app.CV == p.CV).map(app => app.Name)[0]}>Evaluate</Link>
                                                                }
                                                              </td>
                                                            </tr>
                                                          })
                                                }
                                        </tbody>
                                </table>
        </div>
        </div>
      </form>
                </UnlockAccess>
                <UnlockAccess request={'User'}>
                        Page Not Available...
                </UnlockAccess>
      </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}