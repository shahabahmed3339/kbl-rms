import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateHR extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      department: '',
      designation: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    })
  }

  onChangeDesignation(e) {
    this.setState({
      designation: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const hr = {
      username: this.state.username,
      department: this.state.department,
      designation: this.state.designation
    }

    console.log(hr);

    axios.post('http://localhost:5000/hrs/add', hr)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>HR Enrollment Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Department: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
              />
        </div>
        <div className="form-group">
          <label>Designation: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.designation}
              onChange={this.onChangeDesignation}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Enroll HR" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}