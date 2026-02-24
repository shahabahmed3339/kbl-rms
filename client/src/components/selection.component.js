import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';

export default class Selection extends Component {
  constructor(props) {
    super(props);

    this.onChangeReqID = this.onChangeReqID.bind(this);
    this.onChangeChecked = this.onChangeChecked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      CVs: [],
      Designation: '',
      users1: [],
      users2: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ShortList/')
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

    axios.get('http://localhost:5000/Application/')
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

  }

  onChangeReqID(e) {
    this.setState({
      Designation: this.state.users2.filter(app => app._id == e.target.value).map(app => app.Designation)
    })
  }

  onChangeChecked(e) {
    let newArray = [...this.state.CVs, e.target.value];
    if (this.state.CVs.includes(e.target.value)) {
      newArray = newArray.filter(val => val !== e.target.value);
    }
    this.setState({
      CVs: newArray
    })
  }

  onSubmit(e) {
    // alert('Your ShortList is successfully submitted')
    e.preventDefault();

    const shortlist = {
      _id : this.state._id,
      CVs : this.state.CVs,
      Designation : this.state.Designation[0],
    }

    console.log(shortlist);

    axios.post('http://localhost:5000/ShortList/add', shortlist)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submitselect")
      msg.textContent="Your Selection is Submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/enrollhr`);
      link.textContent = 'Enroll HR';
    
      msg.appendChild(link);

    // window.location = '/pool';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Selection</h3>
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
                                                        <th>Email</th>
                                                        <th>Contact</th>
                                                        <th>Cover Letter</th>
                                                        <th>CV</th>
                                                        <th>Select</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter(req => req.Designation == this.state.Designation).map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p.Name}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.Email}</td>
                                                                <td>{p.Contact}</td>
                                                                <td>
                                                                  <a className="action2" href={p.CL} target="_blank">View Letter</a>
                                                                </td>
                                                                <td>
                                                                  <a className="action2" href={p.CV} target="_blank">View CV</a>
                                                                </td>
                                                                <td>
                                                                  <input type="checkbox" value={p.CV} onChange={this.onChangeChecked}/>
                                                                </td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit ShortList" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="submitselect"></div>
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