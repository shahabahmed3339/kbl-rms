import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class Application extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeCL = this.onChangeCL.bind(this);
    this.onChangeCV = this.onChangeCV.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Name: '',
      Designation: this.props.match.params.Designation,
      Email: '',
      Contact: '',
      CL: '',
      CV: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Application/')
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

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      Email: e.target.value
    })
  }

  onChangeContact(e) {
    this.setState({
      Contact: e.target.value
    })
  }

  onChangeCL(e) {
    this.setState({
      CL: e.target.files[0]
    })
  }

  onChangeCV(e) {
    this.setState({
      CV: e.target.files[0]
    })
  }

  onSubmit(e) {
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const appl = new FormData()
    appl.append('_id', this.state._id)
    appl.append('Name', this.state.Name)
    appl.append('Designation', this.state.Designation)
    appl.append('Email', this.state.Email)
    appl.append('Contact', this.state.Contact)
    appl.append('CL', this.state.CL)
    appl.append('CV', this.state.CV)
    appl.append('ApplDate', date)
    appl.append('Status', 'In Process')

    console.log(appl);

    axios.post('http://localhost:5000/Application/add' , appl)
      .then(res => console.log(res.data));

      alert('Your application is submitted')
      e.preventDefault();
      window.location = '/careers';
  }

  render() {
    return (
      <div className="row">
      <div className="col">
      </div>
      <div className="col form-box1">
        <br/><br/><br/><br/>
      <h3>Job Application Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Post: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Designation}
              disabled = {true}/>
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
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group"> 
          <label>Contact: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Contact}
              onChange={this.onChangeContact}
              />
        </div>
        <div className="form-group"> 
          <label>Cover Letter: </label>
          <input type="file"
              required
              className="form-control"
              onChange={this.onChangeCL} />
        </div>
        <div className="form-group"> 
          <label>Curriculum Vitae: </label>
          <input type="file"
              required
              className="form-control"
              onChange={this.onChangeCV} />
        </div>

        <div className="form-group">
          <input type="submit"
          value="Submit Appication"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
      </form>
    </div>
      <div className="col">
      </div>
    </div>
    )
  }
}