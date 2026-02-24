import React, { Component } from 'react';
import axios from 'axios';
import './RegisterForm.css';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      name: '',
      username: '',
      username1: [],
      email: '',
      email1: [],
      password: ''
    }

    
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Register/')
      .then(response1 => {
          this.setState({
            _id: response1.data.length+1,
            username1: response1.data.map(p1 => p1.username),
            email1: response1.data.map(p1 => p1.email)
          })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.username == this.state.username1.filter(usr => usr == this.state.username).map((p1) => {return p1}))
        {
          alert('Username Already Exists')
        }
    else if (this.state.email == this.state.email1.filter(usr => usr == this.state.email).map((p1) => {return p1}))
        {
          alert('Email Already Exists')
        }
    else{
  
      const register = {
        _id: this.state._id,
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
  
      console.log(register);
  
      axios.post('http://localhost:5000/Register/add', register)
        .then(res => console.log(res.data));

        alert('Yout are registered successfully\nYou can now login to your account')
        window.location = '/';
        }
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
  
          <div className="form-group">
            <input type="submit" value="Register Now" className="btn navbar-gradient navlink-custom" />
          </div>
        </form>
      </div>
    )
  }
}