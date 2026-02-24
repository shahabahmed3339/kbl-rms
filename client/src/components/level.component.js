import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class AddLevel extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Level: 0,
      Description: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Levels/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeLevel(e) {
    this.setState({
      Level: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      Description: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Level is successfully submitted')
    e.preventDefault();

    const level = {
      _id : this.state._id,
      Level : this.state.Level,
      Description : this.state.Description
    }

    console.log(level);

    axios.post('http://localhost:5000/Levels/add', level)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submitlevel")
      msg.textContent="Your Level is Submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/hierarchy`);
      link.textContent = 'Setup Hierarchy';
    
      msg.appendChild(link);

    // window.location = '/addlevel';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Add Level</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Level Number: </label>
          <input  type="Number"
              required
              className="form-control"
              value={this.state.Level}
              onChange={this.onChangeLevel}
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
        </div>

        <div className="form-group">
          <input type="submit"
          value="Add Level"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
        <div className="alert" id="submitlevel"></div>
      </form>
      </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}