import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditHR extends Component {
  constructor(props) {
    super(props);

    this.onChange_id = this.onChange_id.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Name: '',
      Designation: '',
      Department: '',
      users1: [],
      users2: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HR/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          Name: response.data.Name,
          Department: response.data.Department,
          Designation: response.data.Designation
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:5000/Department/')
      .then(response1 => {
        if (response1.data.length > 0) {
          this.setState({
            users1: response1.data.map(user1 => user1.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
      axios.get('http://localhost:5000/Designation/')
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users2: response2.data.map(user2 => user2.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    })
  }

  onChangeDepartment(e) {
    this.setState({
      Department: e.target.value
    })
  }

  onChangeDesignation(e) {
    this.setState({
      Designation: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>HR Enrollment Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>ID: </label>
          <input  type="Number"
              required
              className="form-control"
              value={this.state._id}
              onChange={this.onChange_id}
              />
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Department: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Department}
              onChange={this.onChangeDepartment}>
              {
                this.state.users1.map(function(user1) {
                  return <option 
                    key={user1}
                    value={user1}>{user1}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Designation: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Designation}
              onChange={this.onChangeDesignation}>
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
          <input type="submit" value="Enroll HR" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}