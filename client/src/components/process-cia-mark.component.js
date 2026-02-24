import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';

export default class ProcessCIAMark extends Component {
  constructor(props) {
    super(props);

    this.onChangeAPID = this.onChangeAPID.bind(this);
    this.onChangeConfidentiality = this.onChangeConfidentiality.bind(this);
    this.onChangeIntegrity = this.onChangeIntegrity.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      APID: 0,
      PrcsID: null,
      PrcsName: '',
      Departments: [],
      Designations: [],
      ProcessOwner: '',
      Activities: [],
      Confidentiality: 0,
      Integrity: 0,
      Availability: 0,
      Mult: 0,
      Class: '',
      users2: []

    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/CIAMark/')
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

  onChangeAPID(e) {
    this.setState({
      APID: e.target.value,
      PrcsID: null,
      PrcsName: '',
      Departments: [],
      Designations: [],
      ProcessOwner: '',
      Activities: [],
    })

        axios.get('http://localhost:5000/Process/' + e.target.value)
          .then(response2 => {
              this.setState({
                PrcsID: response2.data._id,
                PrcsName: response2.data.Name,
                Departments: response2.data.Departments,
                Designations: response2.data.Designations,
                ProcessOwner: response2.data.ProcessOwner,
                Activities: response2.data.Activities
              })
          })
          .catch((error) => {
            console.log(error);
          })

      axios.get('http://localhost:5000/CIA/')
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users2: response2.data.map(user2 => user2._id)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeConfidentiality(e){
    this.setState({
      Confidentiality: e.target.value
    })

  }

  onChangeIntegrity(e){
    this.setState({
      Integrity: e.target.value
    })
    
  }

  onChangeAvailability(e){
    this.setState({
      Availability: e.target.value,
      Mult: this.state.Confidentiality * this.state.Integrity * e.target.value
    })
    if ((this.state.Confidentiality * this.state.Integrity * e.target.value) > 0 && (this.state.Confidentiality * this.state.Integrity * e.target.value) <= 25)
    {
      this.setState({
        Class: 'LBI'
      })
    }
    else if ((this.state.Confidentiality * this.state.Integrity * e.target.value) > 25 && (this.state.Confidentiality * this.state.Integrity * e.target.value) <= 75)
    {
      this.setState({
        Class: 'MBI'
      })
    }
    else
    {
      this.setState({
        Class: 'HBI'
      })
    }
  }

  onSubmit(e) {
    alert('Your CIA is: ' + this.state.Mult + '\n\nYour Classification is: ' + this.state.Class)
    e.preventDefault();

    const ciamark = {
      _id: this.state._id,
      APID: this.state.APID,
      APType: 'Process',
      Confidentiality: this.state.Confidentiality,
      Integrity: this.state.Integrity,
      Availability: this.state.Availability,
      Mult: this.state.Mult,
      Class: this.state.Class
    }

    console.log(ciamark);

    axios.post('http://localhost:5000/CIAMark/add', ciamark)
      .then(res => console.log(res.data));

    window.location = '/processciamark';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Process CIA Marking Form</h3>
      <form onSubmit={this.onSubmit}>
    <div className="form-box">
        <div className="form-group"> 
          <label>Enter Process ID: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.APID}
              onChange={this.onChangeAPID}>
          </input>
        </div>
        <div className="form-group">
          <table>
            <thead>
            <tr>
              <th style={{width: 200}}>Process ID</th>
              <th style={{width: 200}}>Process Name</th>
              <th style={{width: 200}}>Departments</th>
              <th style={{width: 200}}>Designations</th>
              <th style={{width: 200}}>Process Owner</th>
              <th style={{width: 200}}>Activities</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style={{width: 200}}>{this.state.PrcsID}</td>
              <td style={{width: 200}}>{this.state.PrcsName}</td>
              <td style={{width: 200}}>{this.state.Departments}</td>
              <td style={{width: 200}}>{this.state.Designations}</td>
              <td style={{width: 200}}>{this.state.ProcessOwner}</td>
              <td style={{width: 200}}>{this.state.Activities}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group"> 
          <label>Mark CIA: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Confidentiality}
              onChange={this.onChangeConfidentiality}>
                <option>---Confidentiality---</option>
              {
                this.state.users2.map(function(user2) {
                  return <option 
                    key={user2}
                    value={user2}>{user2}
                    </option>;
                })
              }
          </select>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Integrity}
              onChange={this.onChangeIntegrity}>
                <option>---Integrity---</option>
              {
                this.state.users2.map(function(user2) {
                  return <option 
                    key={user2}
                    value={user2}>{user2}
                    </option>;
                })
              }
          </select>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Availability}
              onChange={this.onChangeAvailability}>
                <option>---Availability---</option>
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
        </div>

        
        <div className="form-group">
          <input type="submit" value="Mark CIA" className="btn navbar-gradient navlink-custom" />
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