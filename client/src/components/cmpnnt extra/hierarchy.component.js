import React, { Component } from 'react';
import Expand from 'react-expand-animated';
import Collapsible from 'react-collapsible';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import './Custom.css';
import AddDepartment from './department.component';
import AddDesignation from './designation.component';
import UnlockAccess from './roles/UnlockAccess';

export default class Hierarchy extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      open: false,
      _id: 1,
      Department: '',
      Designation: '',
      Level: '',
      users1: [],
      users2: [],
      users3: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Hierarchy/')
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

  }

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

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

    axios.get('http://localhost:5000/Levels/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            users3: response3.data.map(user3 => user3.Level)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeLevel(e) {
    this.setState({
      Level: e.target.value
    })
  }

  onSubmit(e) {
    alert('New Hierarchy succefully enrolled with ID: ' + this.state._id)
    e.preventDefault();

    const hr = {
      _id: this.state._id,
      Department: this.state.Department,
      Designation: this.state.Designation,
      Level: this.state.Level
    }

    console.log(hr);

    axios.post('http://localhost:5000/Hierarchy/add', hr)
      .then(res => console.log(res.data));

    window.location = '/hierarchy';
  }

  render() {
    return (
    <div>
      <UnlockAccess request={'Admin'}>
        <h3>Hierarchy Form</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Department: </label>
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
            <Button className="btn navbar-gradient navlink-custom" id="toggler">
              Add Department
            </Button>
            <UncontrolledCollapse toggler="#toggler">
                <CardBody>
                  <AddDepartment/>
                </CardBody>
            </UncontrolledCollapse>
          </div>
          <div className="form-group">
            <label>Designation: </label>
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
            <Button className="btn navbar-gradient navlink-custom" id="toggler1">
              Add Designation
            </Button>
            <UncontrolledCollapse toggler="#toggler1">
                <CardBody>
                  <AddDesignation/>
                </CardBody>
            </UncontrolledCollapse>
          </div>
          <div className="form-group"> 
            <label>Level: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Level}
                onChange={this.onChangeLevel}>
                <option>---Select Level---</option>
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
            <input type="submit"
            value="Add Hierarchy"
            className="btn navbar-gradient navlink-custom"
            style={{marginTop: "10px"}}
            />
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