import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';
import store from '../store';

export default class TechEvaluation extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      CV: '',
      Evaluator: store.getState().auth.user.name,
      Name: this.props.match.params.Name,
      Designation: '',
      Status: '',
      Feedback: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/TechEvaluation/')
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

      axios.get('http://localhost:5000/Application/')
        .then(res => {
            this.setState({
              CV: res.data.filter(app => app.Name === this.state.Name).map(cv=> cv.CV)[0],
              Designation: res.data.filter(app => app.Name === this.state.Name).map(cv=> cv.Designation)[0]
            })
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeStatus(e) {
    this.setState({
      Status: e.target.value
    })
  }

  onChangeFeedback(e) {
    this.setState({
      Feedback: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Evaluation is successfully submitted')
    e.preventDefault();

    const evaluation = {
      _id : this.state._id,
      CV : this.state.CV,
      Name : this.state.Name,
      Designation : this.state.Designation,
      Status : this.state.Status,
      Feedback : this.state.Feedback,
      Evaluator : this.state.Evaluator,
    }

    console.log(evaluation);

    axios.post('http://localhost:5000/TechEvaluation/add', evaluation)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submiteval")
      msg.textContent="Your Evaluation is Submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/technicalevaluation`);
      link.textContent = 'Submit Other Evaluation';
    
      msg.appendChild(link);

    // window.location = '/technicalevaluation';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Technical Evaluation Form</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Evaluator: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Evaluator}
              disabled = {true}/>
        </div>
        <div className="form-group"> 
          <label>Post: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Designation}
              disabled = {true}/>
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Name}
              disabled = {true}/>
        </div>
        <div className="form-group"> 
          <label>Curriculum Vitae: </label>
          <a target="_blank"
              className="form-control"
              style={{textDecoration:'none'}}
              href={this.state.CV}>{this.state.CV.split("applications/")[1]}</a>
        </div>
        <div className="form-group"> 
          <label>Status: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Status}
              onChange={this.onChangeStatus}>
                <option>---Approve/Reject---</option>
                <option>Approved</option>
                <option>Rejected</option>
          </select>
        </div>
        <div className="form-group"> 
          <label>Feedback: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Feedback}
              onChange={this.onChangeFeedback}
              />
        </div>
        </div>

        <div className="form-group">
          <input type="submit"
          value="Add Evaluation"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
        <div className="alert" id="submiteval"></div>
      </form>
      </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}