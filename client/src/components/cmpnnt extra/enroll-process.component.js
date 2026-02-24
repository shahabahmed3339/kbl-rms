import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { Multiselect } from 'multiselect-react-dropdown';
import UnlockAccess from './roles/UnlockAccess';

export default class EnrollProcess extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDepartments = this.onChangeDepartments.bind(this);
    this.onChangeDesignations = this.onChangeDesignations.bind(this);
    this.onChangeProcessOwner = this.onChangeProcessOwner.bind(this);
    this.onChangeActivities = this.onChangeActivities.bind(this);
    this.onChangeAsset = this.onChangeAsset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Name: '',
      Departments: [],
      Designations: '',
      ProcessOwner: '',
      Activities: [],
      Asset: '',
      users1: [],
      users2: [],
      users3: [],
      users4: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Process/')
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

    axios.get('http://localhost:5000/Assets/')
      .then(response4 => {
        if (response4.data.length > 0) {
          this.setState({
            users4: response4.data.map(user4 => user4.Name)
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

  onChangeDepartments(e) {
    this.setState({
      Departments: this.state.Departments.concat(e.target.value)
    })
  }

  onChangeDesignations(e) {
    e.persist();
    this.setState({
      Designations: e.target.value
    })

    axios.get('http://localhost:5000/HR/')
    .then(response3 => {
      if (response3.data.length > 0) {
        this.setState({
          users3: response3.data.filter(dsgn => dsgn.Designation == e.target.value).map(user3 => user3.Name)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeProcessOwner(e) {
    this.setState({
      ProcessOwner: e.target.value
    })
  }

  onChangeActivities(Activities) {
    this.setState({
      Activities
    })
  }

  onChangeAsset(e) {
    this.setState({
      Asset: e.target.value
    })
  }

  onSubmit(e) {
    alert('New process is enrolled successfully with process ID : ' + this.state._id)
    e.preventDefault();

    const process = {
      _id: this.state._id,
      Name: this.state.Name,
      Departments: this.state.Departments,
      Designations: this.state.Designations,
      ProcessOwner: this.state.ProcessOwner,
      Activities: this.state.Activities,
      Asset: this.state.Asset
    }

    console.log(process);

    axios.post('http://localhost:5000/Process/add', process)
      .then(res => console.log(res.data));

    window.location = '/enrollprocess';
  }

  render() {
    return (
    <div>
    <UnlockAccess request={'User'}>
      <h3>Process Enrollment Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}
              />
        </div>
        <h5>Process Applied On</h5>
        <div className="form-group">
          <label>Departments:</label>
          <select ref="userInput"
              required multiple
              className="form-control"
              value={this.state.Departments}
              onChange={this.onChangeDepartments}>
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
          <label>Process Owner:</label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Designations}
              onChange={this.onChangeDesignations}>
              <option>---Select Process Owner---</option>
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
          <label>Resource Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.ProcessOwner}
              onChange={this.onChangeProcessOwner}>
                <option>---Select Resource Name---</option>
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
          <label>Activities: </label>
          <TagsInput
              required
              className="form-control"
              value={this.state.Activities}
              onChange={this.onChangeActivities}
              />
        </div>
        <div className="form-group">
          <label>Process Impact on Asset: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Asset}
              onChange={this.onChangeAsset}>
                <option>---Select Asset---</option>
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

        <div className="form-group">
          <input type="submit" value="Enroll Process" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
    </UnlockAccess>

    <UnlockAccess request={'Admin'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}