import React, { Component } from 'react';
import axios from 'axios';
import './LoginForm.css';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      username1: [],
      email1: [],
      password1: []
    }

    
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Register/')
      .then(response1 => {
          this.setState({
            username1: response1.data.map(p1 => p1.username),
            email1: response1.data.map(p1 => p1.email),
            password1: response1.data.map(p1 => p1.password)
          })
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if ((this.state.username == this.state.username1.filter(usr => usr == this.state.username).map((p1) => {return p1}) || 
         this.state.username == this.state.email1.filter(usr => usr == this.state.username).map((p1) => {return p1})) && 
         this.state.password == this.state.password1.filter(pwd => pwd == this.state.password).map((p1) => {return p1}))
        {
          alert('Login Successful')
          window.location = '/';
        }
    else{
      alert('Invalid Username or Password\nLogin Again')
        }

  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username/Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
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
            <input type="submit" value="Log In" className="btn navbar-gradient navlink-custom" />
          </div>
        </form>
      </div>
    )
  }
}