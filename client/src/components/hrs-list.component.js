import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HR = props => (
  <tr>
    <td>{props.hr._id}</td>
    <td>{props.hr.Name}</td>
    <td>{props.hr.Department}</td>
    <td>{props.hr.Designation}</td>
    <td>
      <Link to={"/edit/"+props.hr._id}>edit</Link> | <a href="#" onClick={() => { props.deleteHR(props.hr._id) }}>delete</a>
    </td>
  </tr>
)

export default class HRList extends Component {
  constructor(props) {
    super(props);

    this.deleteHR = this.deleteHR.bind(this)

    this.state = {HR: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HR/')
      .then(response => {
        this.setState({ HR: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteHR(id) {
    axios.delete('http://localhost:5000/HR/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      HR: this.state.HR.filter(el => el._id !== id)
    })
  }

  hrList() {
    return this.state.HR.map(currenthr => {
      return <HR hr={currenthr} deleteHR={this.deleteHR} key={currenthr._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Enrolled HR</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.hrList() }
          </tbody>
        </table>
      </div>
    )
  }
}