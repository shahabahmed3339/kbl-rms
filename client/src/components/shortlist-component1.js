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
    this.onChangeChecked = this.onChangeChecked.bind(this);
    this.onChangeEvalDate = this.onChangeEvalDate.bind(this);
    this.onChangeEvalTime = this.onChangeEvalTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      CVs: [],
      Name: [],
      Designation: '',
      EvalDate: [],
      EvalTime: [],
      date: '',
      time: '',
      users1: [],
      users2: [],
      users3: []
    }
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/TechSchedule/')
    //   .then(response3 => {
    //     if (response3.data.length > 0) {
    //       this.setState({
    //         _id: Math.max(...response3.data.map(res => res._id)) + 1
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

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

  }

  onChangeReqID(e) {
    this.setState({
      Designation: this.state.users2.filter(app => app._id == e.target.value).map(app => app.Designation)
    })
  }

  onChangeChecked(e) {
    let newArray = [...this.state.CVs, e.target.value];
    let newArray1 = [...this.state.Name, e.target.name];
    let newArray2 = [...this.state.EvalDate, this.state.date];
    let newArray3 = [...this.state.EvalTime, this.state.time];
    if (this.state.CVs.includes(e.target.value)) {
      newArray = newArray.filter(val => val !== e.target.value);
      newArray1 = newArray1.filter(val => val !== e.target.name);
      newArray2 = newArray2.filter(val => val !== this.state.date);
      newArray3 = newArray3.filter(val => val !== this.state.time);
    }
    this.setState({
      CVs: newArray,
      Name: newArray1,
      EvalDate: newArray2,
      EvalTime: newArray3
    })
  }

  onChangeEvalDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  onChangeEvalTime(e) {
    this.setState({
      time: e.target.value
    })
  }

  onSubmit(e) {
    alert('Your Schedule is successfully submitted')
    e.preventDefault();

    const schedule = {
      _id : this.state._id,
      CVs : this.state.CVs,
      Designation : this.state.Designation[0],
      EvalDate : this.state.EvalDate,
      EvalTime : this.state.EvalTime,
    }

    console.log(schedule);

    // axios.post('http://localhost:5000/TechSchedule/add', schedule)
    //   .then(res => console.log(res.data));

    // window.location = '/shortlist';
  }

  render() {
    return (
    <div>
    {console.log(this.state.Name)}
    {console.log(this.state.EvalDate)}
      {console.log(this.state.EvalTime)}
    <UnlockAccess request={'Admin'}>
      <h3>Shortlist & Scheduling</h3>
      <form onSubmit={this.onSubmit}>
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
        <br/>
        <div className="form-group cols">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Applications</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>Name</th>
                                                        <th>Applied For</th>
                                                        <th>CV</th>
                                                        <th>Date for Tech.Eval</th>
                                                        <th>Time for Tech.Eval</th>
                                                        <th>Select</th>
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
                                                                <a className="action2" href={cv} target="_blank">{cv.split("applications/")[1]}</a>
                                                              </td>
                                                              <td>
                                                                <input  type="date" value={this.state.date} onChange={this.onChangeEvalDate} />
                                                              </td>
                                                              <td>
                                                                <input  type="time" value={this.state.time} onChange={this.onChangeEvalTime} />
                                                              </td>
                                                                <td>
                                                                  <input type="checkbox" 
                                                                  name={p.Name.filter(name => name == this.state.users3.filter(app => app.CV == cv).map(app => app.Name)).map(name => {return name})[0]} 
                                                                  value={cv} 
                                                                  onChange={this.onChangeChecked}/>
                                                                </td>
                                                            </tr>
                                                            })
                                                          })
                                                }
                                        </tbody>
                                </table>
        </div>
        
        <div className="form-group">
          <input type="submit" value="Submit Scheduling" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
                </UnlockAccess>
                <UnlockAccess request={'User'}>
                        Page Not Available...
                </UnlockAccess>
    </div>
    )
  }
}