import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class AddDesignation extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.AddDsgn = this.AddDsgn.bind(this);

    this.state = {
      _id: 1,
      Department: this.props.Department,
      Designation: '',
      users1: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Designation/')
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

      axios.get('http://localhost:5000/Department/')
        .then(response1 => {
          if (response1.data.length > 0) {
            this.setState({
              users1: response1.data.map(user1 => user1.Name)
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

  onChangeDesignation(e) {
    e.persist();
    this.setState({
      Designation: e.target.value
    })
  }

  AddDsgn(e) {
    alert('New Designation succefully enrolled with Designation ID: ' + this.state._id)
    e.preventDefault();

    const dsgn = {
      _id: this.state._id,
      Name: this.state.Designation,
      Department: this.props.Department
    }

    console.log(dsgn);

    axios.post('http://localhost:5000/Designation/add', dsgn)
      .then(res => console.log(res.data));
      window.location = '/hierarchy';
  }

  render() {
    return (
    <div>
      <form>
        <div className="form-group"> 
          <label>Department: </label><br/>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.props.Department}
              disabled = {true}/>
          {/* <select ref="userInput"
              required
              className="form-control-sm margs1"
              value={this.state.Department}
              onChange={this.onChangeDepartment}>
                <option>---Select Department---</option>
              {
                this.state.users1.map(function(user1) {
                  return <option 
                    key={user1}
                    value={user1}>{user1}
                    </option>;
                })
              }
          </select><br/> */}
          </div>
          
        <div className="form-group"> 
          <label>Designation Name: </label><br/>
          <input  type="text"
              required
              className="form-control-sm margs1"
              value={this.state.Designation}
              onChange={this.onChangeDesignation}
              />
              
          <button onClick={this.AddDsgn}
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