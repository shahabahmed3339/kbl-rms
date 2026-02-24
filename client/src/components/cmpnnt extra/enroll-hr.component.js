import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import CameraFeed from './Camera/CameraFeed';

export default class EnrollHR extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Name: '',
      Designation: '',
      Department: '',
      Level: '',
      Image: '',
      Image1: '',
      CNIC: '',
      users1: [],
      users2: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HR/')
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

  onChangeName(e) {
    this.setState({
      Name: e.target.value
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

  onChangeImage(e) {
    this.setState({
      Image: e.target.files[0],
      Image1: URL.createObjectURL(e.target.files[0])
    })
  }

  uploadImage(img) {
    this.setState({
      CNIC: img
    })
  }

  onSubmit(e) {

    // const hr = {
    //   _id: this.state._id,
    //   Name: this.state.Name,
    //   Department: this.state.Department,
    //   Designation: this.state.Designation,
    //   Level: this.state.Level[0],
    //   Image: this.state.Image,
    // }
    
    const hr = new FormData()
    hr.append('_id', this.state._id)
    hr.append('Name', this.state.Name)
    hr.append('Department', this.state.Department)
    hr.append('Designation', this.state.Designation)
    hr.append('Level', this.state.Level)
    hr.append('Image', this.state.Image)
    hr.append('CNIC', this.state.CNIC)

    console.log(hr);

    axios.post('http://localhost:5000/HR/add', hr)
      .then(res => console.log(res.data));

      alert('New HR succefully enrolled with HR ID: ' + this.state._id)
      e.preventDefault();
      window.location = '/enrollhr';
    
  }

  render() {
    return (
    <div>
    <UnlockAccess request={'User'}>
      <h3>HR Enrollment Form</h3>
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
        </div>
        <div className="form-group"> 
          <label>Level: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Level}
              disabled = {true}/>
        </div>
        <div className="form-group">
          <label>Capture Image: </label>
            <CameraFeed sendFile={this.uploadImage} />
        </div>
        <div className="form-group"> 
          <label>Insert CNIC: </label>
          <input type="file"
              required
              className="form-control"
              onChange={this.onChangeImage} />
              <img src={this.state.Image1} style={{width: '200px', marginTop: '10px'}}/>
        </div>

        <div className="form-group">
          <input type="submit" value="Enroll HR" className="btn navbar-gradient navlink-custom" />
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