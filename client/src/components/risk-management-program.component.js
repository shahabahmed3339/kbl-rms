import React, { Component } from 'react';
import Expand from 'react-expand-animated';
import Collapsible from 'react-collapsible';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import TagsInput from 'react-tagsinput';
import YearPicker from "react-year-picker";

export default class RiskManagementProgram extends Component {
  constructor(props) {
    super(props);

    this.onChangeStartYear = this.onChangeStartYear.bind(this);
    this.onChangeEndYear = this.onChangeEndYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      StartYear: 0,
      EndYear: 0,
      Quarters: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskManagementProgram/')
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
      
    axios.get('http://localhost:5000/Quarters/')
    .then(res => {
      if (res.data.length > 0) {
        this.setState({
          Quarters: res.data
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }

  onChangeStartYear(year) {
    this.setState({
      StartYear: year
    })
  }

  onChangeEndYear(year) {
    this.setState({
      EndYear: year
    })
  }

  onSubmit(e) {
    // alert('New Hierarchy succefully enrolled with ID: ' + this.state._id)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const rmp = {
      _id: this.state._id,
      StartYear: this.state.StartYear,
      EndYear: this.state.EndYear,
      Date: date
    }

    console.log(rmp);

    axios.post('http://localhost:5000/RiskManagementProgram/add', rmp)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submitprog")
      msg.textContent="Your Program is Added. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/riskmanagementprogram`);
      link.textContent = 'Refresh Page';
    
      msg.appendChild(link);

    // window.location = '/riskmanagementprogram';
  }

  render() {
    return (
      <div className="form-box1">
      <UnlockAccess request={'Admin'}>
        <h3>Risk Management Program</h3>
      <div className="row">
      <div className="col">
        <form onSubmit={this.onSubmit}>
        <div className="form-box">
          <div className="form-group"> 
            <label>Start Year: </label>
            <YearPicker
                required
                className="form-control"
                value={this.state.StartYear}
                onChange={this.onChangeStartYear}/>
          </div>
          <div className="form-group"> 
            <label>End Year: </label>
            <YearPicker
                required
                className="form-control"
                value={this.state.EndYear}
                onChange={this.onChangeEndYear}/>
          </div>
          <div className="form-group">
            <table id="rept1">
              <thead>
                <tr>
                  <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Quarterly Division</th>
                </tr>
                </thead>
                <thead>
                  <tr>
                    <th style={{width: 200}}>Quarter</th>
                    <th style={{width: 200}}>Start Date</th>
                    <th style={{width: 200}}>End Date</th>
                  </tr>  
                </thead>
                <tbody>
                  {
                    this.state.Quarters.map((qurtr, i) => {
                      return <tr key={i}>
                        <td>{qurtr.Quarter}</td>
                        <td>{qurtr.Start}</td>
                        <td>{qurtr.End}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
          </div>
        </div>

          <div className="form-group">
            <input type="submit"
            value="Add Program"
            className="btn navbar-gradient navlink-custom"
            style={{marginTop: "10px"}}
            />
          </div>
          <div className="alert" id="submitprog"></div>
        </form>
        </div>
        <div className="col">
          Chart Area
        </div>
        </div>
      </UnlockAccess>

      <UnlockAccess request={'User'}>
        Page Not Available...
      </UnlockAccess>
    </div>
    )
  }
}