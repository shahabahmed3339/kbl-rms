import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';

export default class EditRequisition extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeRequestedBy = this.onChangeRequestedBy.bind(this);
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
      RequestedBy: '',
      Department: '',
      Designation: '',
      Level: '',
      Title: '',
      Purpose: '',
      Type: '',
      RequDate: '',
      Status: '',
      Comments: '',
      Facilities: [],
      Roles: [],
      AsgndPrcss: [],
      users1: [],
      users2: [],
      users3: [],
      users4: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Approval/' + this.props.match.params.id)
      .then(response1 => {
          this.setState({
            _id: response1.data._id,
            RequestedBy: response1.data.RequestedBy,
            Department: response1.data.Department,
            Designation: response1.data.Designation,
            Level: response1.data.Level,
            Title: response1.data.Title,
            Purpose: response1.data.Purpose,
            Type: response1.data.Type,
            RequDate: response1.data.RequDate,
            Facilities: response1.data.Facilities,
            Roles: response1.data.Roles,
            AsgndPrcss: response1.data.AsgndPrcss
          })
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
              users3: response3.data.map(user3 => user3.Name)
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

  onChangeRequestedBy(e) {
    this.setState({
      RequestedBy: e.target.value
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
  }

  onChangeFacilities(Facilities) {
    this.setState({
      Facilities
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
      RequestedBy: this.state.RequestedBy,
      Department: this.state.Department,
      Designation: this.state.Designation,
      Level: this.state.Level,
      Title: this.state.Title,
      Purpose: this.state.Purpose,
      Type: this.state.Type,
      RequDate: this.state.RequDate,
      Facilities: this.state.Facilities,
      Roles: this.state.Roles,
      AsgndPrcss: this.state.AsgndPrcss,
      Status: "Pending",
      Comments: "",
    }

    console.log(req);

    axios.post('http://localhost:5000/Approval/update/' + this.props.match.params.id , req)
      .then(res => console.log(res.data));

      alert('Requisition has been updated')
      e.preventDefault();
      window.location = '/requested';
  }

  render() {
    return (
    <div>
      <h3>Requisition Modification Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group cols">

          <label>Requested By: </label>
          <select  type="text"
              required
              className="form-control-sm margs"
              value={this.state.RequestedBy}
              onChange={this.onChangeRequestedBy}>
              <option>---Select Name---</option>
              {
                this.state.users3.map(function(user3) {
                  return <option 
                    key={user3}
                    value={user3}>{user3}
                    </option>;
                })
              }
          </select>

          <label>Request For: </label>
          <select ref="userInput"
              required
              className="form-control-sm margs"
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
          
          <select ref="userInput"
              required
              className="form-control-sm margs"
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
          
          <input  type="text"
              required
              className="form-control-sm margs"
              defaultValue={this.state.Level}
              disabled = {true}
              placeholder = "Level of Designation"
              />

        </div>
        
        <div className="form-group cols"> 
              
          <label>Title of Project/Assignment: </label>
          <input  type="text"
              required
              className="form-control-sm margs"
              value={this.state.Title}
              onChange={this.onChangeTitle}
              />
              
            <label>Purpose: </label>
            <input  type="text"
                required
                className="form-control-sm margs"
                value={this.state.Purpose}
                onChange={this.onChangePurpose}
              />
                  
              <label>Type of Requisition: </label>
              <select ref="userInput"
                  required
                  className="form-control-sm margs"
                  value={this.state.Type}
                  onChange={this.onChangeType}>
                    <option>---Select Type---</option>
                    <option>Temporary</option>
                    <option>Permanent</option>
              </select>

        </div>

        <div className="form-group cols">
          
        <label>Requisition Date (In Case of Temporary): </label>
          <input  type="date"
              className="form-control-sm margs"
              value={this.state.RequDate}
              onChange={this.onChangeRequDate}
              />

        </div>

        <div className="form-group cols">
          <label>Facilities Required: </label>
          <TagsInput
              required
              className="form-control-sm margs"
              placeholder = "Add Facilities"
              value={this.state.Facilities}
              onChange={this.onChangeFacilities}
              />
        </div>

        <div className="form-group cols">
          <label>Roles and Responsibilities: </label>
          <TagsInput
              required
              className="form-control-sm margs"
              value={this.state.Roles}
              onChange={this.onChangeRoles}
              />
        </div>

        <div className="form-group cols">
          <label>To be Assigned Processes: </label>
          <select ref="userInput"
              required multiple
              className="form-control-sm margs"
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
          value="Update Requisition"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
      </form>
    </div>
    )
  }
}