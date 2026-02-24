import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import UnlockAccess from './roles/UnlockAccess';

export default class ProcessDocumentation extends Component {
  constructor(props) {
    super(props);

    this.onChangePrName = this.onChangePrName.bind(this);
    this.onChangeDocType = this.onChangeDocType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      PrName: '',
      DocType: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ProcessDocumentation/')
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

  onChangePrName(e) {
    this.setState({
      PrName: e.target.value
    })
  }

  onChangeDocType(e) {
    this.setState({
      DocType: e.target.value
    })
  }

  onSubmit(e) {
    alert('New Process Documentation succefully saved with ID: ' + this.state._id)
    e.preventDefault();

    const prdoc = {
      _id: this.state._id,
      PrName: this.state.PrName,
      DocType: this.state.DocType
    }

    console.log(prdoc);

    axios.post('http://localhost:5000/ProcessDocumentation/add', prdoc)
      .then(res => console.log(res.data));

      this.setState({
        PrName: '',
        DocType: ''
      })
      window.location = '/writeprocess';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Process Documentation</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Process Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.PrName}
              onChange={this.onChangePrName}
              />
        </div>
        <div className="form-group"> 
          <label>Document Type: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.DocType}
              onChange={this.onChangeDocType}>
                <option>---Select Document Type---</option>
                <option>Word</option>
                <option>Excel</option>
                <option>Powerpoint</option>
          </select>
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Start Documentation" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
    </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}