import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Custom.css';

export default class Careers extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {
      searchVal: '',
      users1: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Requisition/')
      .then(response1 => {
          this.setState({
            users1: response1.data
          })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeSearch(e) {
    this.setState({
      searchVal: e.target.value
    })
  }

  render() {
    return (
      <div className="row">
      <div className="col"></div>
      <div className="col form-box1" style={{textAlign: "center"}}>
      <h3>Welcome to Careers Portal</h3>
      <h3>Opened Vacancies</h3>
      <form>
        <div className="form-group cols">
                                <table id="rept">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Vanancies Available</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Position</th>
                                                        <th>Roles and Responsibilities</th>
                                                        <th>Educational Criteria</th>
                                                        <th>Experience</th>
                                                        <th>Action</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter((val) => {
                                                  if (this.state.searchVal === "")
                                                  {
                                                    return val
                                                  }
                                                  else if (val.Designation.toLowerCase().includes(this.state.searchVal.toLowerCase()))
                                                  {
                                                    console.log(val.Designation)
                                                    return val
                                                  }
                                                }).map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.Roles.map(function(role) { 
                                                                        return <option 
                                                                        key={role}
                                                                        value={role}>{role}
                                                                        </option>; })}</td>
                                                                <td>{p.EduCri.map(function(edu) { 
                                                                        return <option 
                                                                        key={edu}
                                                                        value={edu}>{edu}
                                                                        </option>; })}</td>
                                                                <td>{p.Expr.map(function(expr) { 
                                                                        return <option 
                                                                        key={expr}
                                                                        value={expr}>{expr}
                                                                        </option>; })}</td>
                                                                <td>
                                                                  <Link className="action2" to={"/apply/"+p.Designation}>Apply</Link>
                                                                </td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
        </div>
      </form>
    </div>
      <div className="col">
        
      <input  type="text"
              required
              style={{marginTop: "50px"}}
              className="form-control"
              placeholder = "Search Position ..."
              value={this.state.searchVal}
              onChange={this.onChangeSearch}
              />
      </div>
    </div>
    )
  }
}