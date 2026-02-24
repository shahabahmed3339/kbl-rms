import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class AddDepartment extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.AddDept = this.AddDept.bind(this);

    this.state = {
      _id: 0,
      Department: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Department/')
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

  onChangeDepartment(e) {
    e.persist();
    this.setState({
      Department: e.target.value
    })
  }
  AddDept(e) {
    alert('New Department succefully enrolled with Department ID: ' + this.state._id)
    e.preventDefault();

    const dept = {
      _id: this.state._id,
      Name: this.state.Department
    }

    console.log(dept);

    axios.post('http://localhost:5000/Department/add', dept)
      .then(res => console.log(res.data));

      this.setState({
        Department: ''
      })
  }

  render() {
    return (
    <div>
      <form>
        <div className="form-group "> 
          <label>Department Name: </label><br/>
          <input  type="text"
              required
              className="form-control-sm margs1"
              value={this.state.Department}
              onChange={this.onChangeDepartment}
              />
              <button onClick={this.AddDept}
              className="btn navbar-gradient navlink-custom"
              style={{marginTop:'0'}}>
                Add
                </button>
        </div>
      </form>
    </div>
    )
  }
}