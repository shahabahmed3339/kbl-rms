import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";

export default class SetVision extends Component {
  constructor(props) {
    super(props);

    this.onChangeVision = this.onChangeVision.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeOutcome = this.onChangeOutcome.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Vision: '',
      Description: '',
      From: '',
      To: '',
      Outcome: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Vision/')
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

  onChangeVision(e) {
    this.setState({
      Vision: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      Description: e.target.value
    })
  }

  onChangeFrom(e) {
    this.setState({
      From: e.target.value
    })
  }

  onChangeTo(e) {
    this.setState({
      To: e.target.value
    })
  }

  onChangeOutcome(e) {
    this.setState({
      Outcome: e.target.value
    })
  }

  onSubmit(e) {
    alert('Your vision is successfully submitted')
    e.preventDefault();

    const vision = {
      _id: this.state._id,
      Vision: this.state.Vision,
      Description: this.state.Description,
      From: this.state.From,
      To: this.state.To,
      Outcome: this.state.Outcome
    }

    console.log(vision);

    axios.post('http://localhost:5000/Vision/add', vision)
      .then(res => console.log(res.data));

      window.location = '/setvision';
  }

  render() {
    return (
    <div>
    <UnlockAccess request={'Admin'}>
      <h3>Set Vision</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Vision}
              onChange={this.onChangeVision}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Description}
              onChange={this.onChangeDescription}
              />
        </div>
        <h5>Vision Tenure</h5>
        <div className="form-group">
          <label>From: </label>
            <input type="date"
              required
              className="form-control"
              value={this.state.From}
              onChange={this.onChangeFrom}
            />
        </div>
        <div className="form-group">
          <label>To: </label>
            <input type="date"
              required
              className="form-control"
              value={this.state.To}
              onChange={this.onChangeTo}
            />
        </div>
        <div className="form-group">
          <label>Expected Outcome: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.Outcome}
              onChange={this.onChangeOutcome}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Set Vision" className="btn navbar-gradient navlink-custom" />
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