import React, { Component } from 'react';
import axios from 'axios';
import './LoginForm.css';

export default class InputField extends Component {

  render() {
    return (
      <div className="inputField">
        <input
          className="input"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={ (e) => this.props.onChange(e.target.value) }
          />
      </div>
    )
  }
}