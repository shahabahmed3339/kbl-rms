import React, { Component } from 'react';

export default class SubmitButton extends Component {

  render() {
    return (
      <div className="submitButton">
        <button
          className="btn"
          disabled={this.props.disabled}
          onClick={ () => this.props.onClick() }
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}