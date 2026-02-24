import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';

export default class ShortList extends Component {
  constructor(props) {
    super(props);

    this.onChangeReqID = this.onChangeReqID.bind(this);

    this.state = {
      Designation: '',
      Title: '',
      users1: [],
      users2: [],
      users3: [],
      users4: [],
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/ShortList/')
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

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Shortlist & Scheduling</h3>
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
                                                        <th>Status</th>
                                                        <th>Evaluators</th>
                                                        <th>Action</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter(req => req.Designation == this.state.Designation).map((p, index) => {
                                                  return p.CVs.map((cv, index) => {
                                                    return  <tr key={index}>
                                                              <td>{p.Name.filter(name => name == this.state.users3.filter(app => app.CV == cv).map(app => app.Name)).map(name => {return name})[0]}</td>
                                                              <td>{p.Designation}</td>
                                                              <td>
                                                                <a className="action2" href={cv} target="_blank">View CV</a>
                                                              </td>
                                                              <td>{this.state.users4.filter(sts => sts.CV == cv).map(sts => {return <>{sts.Status}<br/>on {sts.EvalDate}<br/>at {sts.EvalTime}</>})[0]}</td>
                                                              <td>{this.state.users4.filter(sts => sts.CV == cv).map(sts => {return sts.Evaluators.map(evl => <>{evl}<br/></>)})[0]}</td>
                                                              <td>
                                                                { this.state.users4.filter(sts => sts.CV == cv).map(sts => {return sts.Status})[0] != 'Scheduled' ?
                                                                  <Link className="action2" to={"/techschedule/"+this.state.users3.filter(app => app.CV == cv).map(app => app.Name)[0]}>Schedule</Link>
                                                                : null }
                                                              </td>
                                                            </tr>
                                                            })
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