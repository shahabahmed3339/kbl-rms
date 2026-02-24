import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';

export default class Requested extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: 0,
      RequestedBy: '',
      Department: '',
      Designation: '',
      Level: '',
      Title: '',
      Purpose: '',
      Type: '',
      RequDate: '',
      Facilities: [],
      Roles: [],
      AsgndPrcss: [],
      users1: [],
      users2: [],
      users3: [],
      users4: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Approval/')
      .then(response1 => {
          this.setState({
            users1: response1.data
          })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  render() {
    return (
    <div>
    <UnlockAccess request={'Admin'}>
      <h3>Requisitions Requested</h3>

        <div className="form-group cols">
                                <table>
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Approved Requisitions</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Requested By</th>
                                                        <th colSpan="2">Request For<br/>Department/Designation</th>
                                                        <th>Level</th>
                                                        <th>Title</th>
                                                        <th>Purpose</th>
                                                        <th>Type</th>
                                                        <th>Requisition Date</th>
                                                        <th>Facilities Required</th>
                                                        <th>Roles and Responsibilities</th>
                                                        <th>To Be Assigned Processes</th>
                                                        <th>Status</th>
                                                        <th>Comments</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter(sts => sts.Status == "Approved").map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.RequestedBy}</td>
                                                                <td>{p.Department}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.Level}</td>
                                                                <td>{p.Title}</td>
                                                                <td>{p.Purpose}</td>
                                                                <td>{p.Type}</td>
                                                                <td>{p.RequDate}</td>
                                                                <td>{p.Facilities}</td>
                                                                <td>{p.Roles}</td>
                                                                <td>{p.AsgndPrcss}</td>
                                                                <td>{p.Status}</td>
                                                                <td>{p.Comments}</td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
        </div>
        
        <div className="form-group cols">
                                <table>
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>Rejected Requisitions</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Requested By</th>
                                                        <th colSpan="2">Request For<br/>Department/Designation</th>
                                                        <th>Level</th>
                                                        <th>Title</th>
                                                        <th>Purpose</th>
                                                        <th>Type</th>
                                                        <th>Requisition Date</th>
                                                        <th>Facilities Required</th>
                                                        <th>Roles and Responsibilities</th>
                                                        <th>To Be Assigned Processes</th>
                                                        <th>Status</th>
                                                        <th>Comments</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter(sts => sts.Status == "Rejected").map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.RequestedBy}</td>
                                                                <td>{p.Department}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.Level}</td>
                                                                <td>{p.Title}</td>
                                                                <td>{p.Purpose}</td>
                                                                <td>{p.Type}</td>
                                                                <td>{p.RequDate}</td>
                                                                <td>{p.Facilities}</td>
                                                                <td>{p.Roles}</td>
                                                                <td>{p.AsgndPrcss}</td>
                                                                <td>{p.Status}</td>
                                                                <td>{p.Comments}</td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
        </div>
      
        <div className="form-group cols">
                                <table>
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc"}}>To Be Modified Requisitions</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th>ID</th>
                                                        <th>Requested By</th>
                                                        <th colSpan="2">Request For<br/>Department/Designation</th>
                                                        <th>Level</th>
                                                        <th>Title</th>
                                                        <th>Purpose</th>
                                                        <th>Type</th>
                                                        <th>Requisition Date</th>
                                                        <th>Facilities Required</th>
                                                        <th>Roles and Responsibilities</th>
                                                        <th>To Be Assigned Processes</th>
                                                        <th>Status</th>
                                                        <th>Comments</th>
                                                        <th>Action</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                this.state.users1.filter(sts => sts.Status == "Need Modification").map((p, index) => {
                                                        return  <tr key={index}>
                                                                <td>{p._id}</td>
                                                                <td>{p.RequestedBy}</td>
                                                                <td>{p.Department}</td>
                                                                <td>{p.Designation}</td>
                                                                <td>{p.Level}</td>
                                                                <td>{p.Title}</td>
                                                                <td>{p.Purpose}</td>
                                                                <td>{p.Type}</td>
                                                                <td>{p.RequDate}</td>
                                                                <td>{p.Facilities}</td>
                                                                <td>{p.Roles}</td>
                                                                <td>{p.AsgndPrcss}</td>
                                                                <td>{p.Status}</td>
                                                                <td>{p.Comments}</td>
                                                                <td>
                                                                  <Link className="action2" to={"/editrequisition/"+p._id}>Open</Link>
                                                                </td>
                                                                </tr>
                                                                })
                                                }
                                        </tbody>
                                </table>
        </div>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>

    </div>
    )
  }
}