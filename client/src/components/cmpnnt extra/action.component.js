import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class Requisition extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      req_id: 1,
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

      axios.get('http://localhost:5000/Requisition/')
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

  }

  onChangeStatus(e){
    this.setState({
      Status: e.target.value
    })

  }

  onChangeComments(e){
    this.setState({
      Comments: e.target.value
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
      Status: this.state.Status,
      Comments: this.state.Comments,
    }
    const req1 = {
      _id: this.state.req_id,
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
    }

    console.log(req);

    axios.post('http://localhost:5000/Approval/update/' + this.props.match.params.id , req)
      .then(res => console.log(res.data));

      if (this.state.Status == "Approved")
      {
        axios.post('http://localhost:5000/Requisition/add' , req1)
          .then(res => console.log(res.data));}

      alert('Requisition has been updated')
      e.preventDefault();
      window.location = '/approval';
  }

  render() {
    return (
    <div>
      <h3>Requisition Approval Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group cols">

          <label>ID: </label>
          <input  type="text"
              required
              className="form-control-sm margs"
              defaultValue={this.state._id}
              disabled = {true}/>

          <label>Requested By: </label>
          <input  type="text"
              required
              className="form-control-sm margs"
              defaultValue={this.state.RequestedBy}
              disabled = {true}/>

        </div>

        <div className="form-group cols">

          <label>Request For: </label>
          <label style={{marginLeft:"10px"}}>Department: </label>
          <input
              required
              className="form-control-sm margs"
              defaultValue={this.state.Department}
              disabled = {true}/>
          
          <label>Designation: </label>
          <input
              required
              className="form-control-sm margs"
              defaultValue={this.state.Designation}
              disabled = {true}/>
          
          <label>Level: </label>
          <input  type="text"
              required
              className="form-control-sm margs"
              defaultValue={this.state.Level}
              disabled = {true}/>

        </div>
        
        <div className="form-group cols"> 
              
          <label>Title of Project/Assignment: </label>
          <input  type="text"
              required
              className="form-control-sm margs"
              defaultValue={this.state.Title}
              disabled = {true}/>
              
            <label>Purpose: </label>
            <input  type="text"
                required
                className="form-control-sm margs"
                defaultValue={this.state.Purpose}
                disabled = {true}/>
                  
              <label>Type of Requisition: </label>
              <input
                  required
                  className="form-control-sm margs"
                  defaultValue={this.state.Type}
                  disabled = {true}/>

        </div>

        <div className="form-group cols">
          
        <label>Requisition Date: </label>
          <input  type="date"
              required
              className="form-control-sm margs"
              defaultValue={this.state.RequDate}
              disabled = {true}/>
              
          <label>Facilities Required: </label>
          <input
              required
              className="form-control-sm margs"
              defaultValue={this.state.Facilities}
              disabled = {true}/>

        </div>

        <div className="form-group cols">
          <label>Roles and Responsibilities: </label>
          <input
              required
              className="form-control-sm margs"
              defaultValue={this.state.Roles}
              disabled = {true}/>
              
          <label>To be Assigned Processes: </label>
          <input
              required
              className="form-control-sm margs"
              defaultValue={this.state.AsgndPrcss}
              disabled = {true}/>

        </div>
        
        <h5 className="margs">Select Action</h5>
        <div className="form-group cols"> 
          <label>Status: </label>
          <select ref="userInput"
              required
              className="form-control-sm margs"
              value={this.state.Status}
              onChange={this.onChangeStatus}>
                <option>---Select Status---</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Need Modification</option>
          </select>
          
          <label>Comments: </label>
          <textarea
              className="form-control-sm margs"
              value={this.state.Comments}
              onChange={this.onChangeComments}
              />

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