import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import store from '../store';

export default class Requisition extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePurpose = this.onChangePurpose.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeRequDate = this.onChangeRequDate.bind(this);
    this.onChangeFacilities = this.onChangeFacilities.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);
    this.onChangeAsgndPrcss = this.onChangeAsgndPrcss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      _id1: 1,
      RequestedBy: store.getState().auth.user.name,
      Department: '',
      Designation: '',
      Level: '',
      Title: '',
      Purpose: '',
      Type: '',
      RequDate: '',
      Status: 'Pending',
      Facilities: [],
      Facilities1: [],
      Roles: [],
      AsgndPrcss: [],
      users1: [],
      users2: [],
      users3: [],
      users4: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Approval/')
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

      axios.get('http://localhost:5000/Requisition/')
        .then(response3 => {
          if (response3.data.length > 0) {
            this.setState({
              _id1: Math.max(...response3.data.map(res => res._id)) + 1
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

      axios.get('http://localhost:5000/HR/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            users3: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Process/')
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

      axios.get('http://localhost:5000/Facility/')
        .then(facilities => {
          if (facilities.data.length > 0) {
            this.setState({
              Facilities1: facilities.data.map(facility => facility.Facility)
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeDepartment(e) {
    e.persist();
    this.setState({
      Department: e.target.value
    })

    axios.get('http://localhost:5000/Designation/')
    .then(response2 => {
      if (response2.data.length > 0) {
        this.setState({
          users2: response2.data.filter(dsgn => dsgn.Department === e.target.value).map(user2 => user2.Name)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeDesignation(e) {
    e.persist();
    this.setState({
      Designation: e.target.value
    })

    axios.get('http://localhost:5000/Hierarchy/')
      .then(response0 => {
        if (response0.data.length > 0) {
          this.setState({
            Level: response0.data.filter(lvl => lvl.Designation === e.target.value).map(user0 => user0.Level)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTitle(e) {
    this.setState({
      Title: e.target.value
    })
  }

  onChangePurpose(e) {
    this.setState({
      Purpose: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
      Type: e.target.value
    })
  }

  onChangeRequDate(e) {
    this.setState({
      RequDate: e.target.value
    })
    if ('Level 1' === this.state.users3.filter(hr => hr.Name === this.state.RequestedBy)[0].Level) {
      this.setState({
        Status : "Approved"
      })
    }
  }

  onChangeFacilities(e) {
    this.setState({
      Facilities: this.state.Facilities.concat(e.target.value)
    })
  }

  onChangeRoles(Roles) {
    this.setState({
      Roles
    })
  }

  onChangeAsgndPrcss(e) {
    this.setState({
      AsgndPrcss: this.state.AsgndPrcss.concat(e.target.value)
    })
  }

  onSubmit(e) {
    const req = {
      _id: this.state._id,
      RequestedBy: this.state.RequestedBy,
      Department: this.state.Department,
      Designation: this.state.Designation,
      Level: this.state.Level[0],
      Title: this.state.Title,
      Purpose: this.state.Purpose,
      Type: this.state.Type,
      RequDate: this.state.RequDate,
      Facilities: this.state.Facilities,
      Roles: this.state.Roles,
      AsgndPrcss: this.state.AsgndPrcss,
      Status: this.state.Status
    }
    if (this.state.Status === 'Approved') {
      const req1 = {
        _id: this.state._id1,
        RequestedBy: this.state.RequestedBy,
        Department: this.state.Department,
        Designation: this.state.Designation,
        Level: this.state.Level[0],
        Title: this.state.Title,
        Purpose: this.state.Purpose,
        Type: this.state.Type,
        RequDate: this.state.RequDate,
        Facilities: this.state.Facilities,
        Roles: this.state.Roles,
        AsgndPrcss: this.state.AsgndPrcss,
      }
      console.log(req);
      axios.post('http://localhost:5000/Requisition/add', req1)
        .then(res => console.log(res.data));
  
      axios.post('http://localhost:5000/Approval/add', req)
        .then(res => console.log(res.data));
  
        alert('New Requisition has been added')
        e.preventDefault();
        // window.location = '/requisition';
      } else {
      console.log(req);
      axios.post('http://localhost:5000/Approval/add', req)
        .then(res => console.log(res.data));
  
        alert('New Requisition has been sent for Approval')
        e.preventDefault();
        window.location = '/requisition';
      }
  }

  render() {
    return (
    <div>
      <h3>Requisition Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Your Name: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.RequestedBy}
              disabled = {true}/>
        </div>

        <div className="form-group">
          <label>Request For: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Department}
              onChange={this.onChangeDepartment}>
                <option>---Select Department---</option>
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
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Designation}
              onChange={this.onChangeDesignation}>
              <option>---Select Designation---</option>
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
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Level}
              disabled = {true}
              placeholder = "Level of Designation"
              />

        </div>
        
        <div className="form-group">
          <label>Title of Project/Assignment: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Title}
              onChange={this.onChangeTitle}
              />
        </div>

        <div className="form-group">
            <label>Purpose: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.Purpose}
                onChange={this.onChangePurpose}
              />
        </div>

        <div className="form-group">
              <label>Type of Requisition: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.Type}
                  onChange={this.onChangeType}>
                    <option>---Select Type---</option>
                    <option>Temporary</option>
                    <option>Permanent</option>
              </select>

        </div>

        <div className="form-group">
        <label>Requisition Date (In Case of Temporary): </label>
          <input  type="date"
              className="form-control"
              value={this.state.RequDate}
              onChange={this.onChangeRequDate}
              />
        </div>

        <div className="form-group">
          <label>Facilities Required: </label>
          <select ref="userInput"
              required multiple
              className="form-control"
              value={this.state.Facilities}
              onChange={this.onChangeFacilities}>
              {
                this.state.Facilities1.map(function(facility) {
                  return <option 
                    key={facility}
                    value={facility}>{facility}
                    </option>;
                })
              }
          </select>
          {/* <TagsInput
              required
              className="form-control"
              placeholder = "Add Facilities"
              value={this.state.Facilities}
              onChange={this.onChangeFacilities}
              /> */}
        </div>

        <div className="form-group">
          <label>Roles and Responsibilities: </label>
          <TagsInput
              required
              className="form-control"
              value={this.state.Roles}
              onChange={this.onChangeRoles}
              />
        </div>

        <div className="form-group">
          <label>To be Assigned Processes: </label>
          <select ref="userInput"
              required multiple
              className="form-control"
              value={this.state.AsgndPrcss}
              onChange={this.onChangeAsgndPrcss}>
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
          <input type="submit"
          value="Add Requisition"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
      </form>
    </div>
    )
  }
}