import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import axios from 'axios';
import './Custom.css';

export default class HRSchedule extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeEvalDate = this.onChangeEvalDate.bind(this);
    this.onChangeEvalTime = this.onChangeEvalTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      CV: '',
      Name: this.props.match.params.Name,
      Designation: '',
      EvalDate: '',
      EvalTime: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HRSchedule/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            EvalDate: response3.data.filter(app => app.Name === this.state.Name).map(date=> date.EvalDate)[0],
            EvalTime: response3.data.filter(app => app.Name === this.state.Name).map(date=> date.EvalTime)[0]
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

  onChangeEvalDate(e) {
    this.setState({
      EvalDate: e.target.value
    })
  }

  onChangeEvalTime(e) {
    this.setState({
      EvalTime: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Schedule is successfully submitted')
    e.preventDefault();

    const schedule = {
      _id : this.state._id,
      CV : this.state.CV,
      Name : this.state.Name,
      Designation : this.state.Designation,
      EvalDate : this.state.EvalDate,
      EvalTime : this.state.EvalTime,
      Status: 'Scheduled',
    }

    console.log(schedule);

    axios.post('http://localhost:5000/HRSchedule/add', schedule)
      .then(res => console.log(res.data));

      var msg = document.getElementById("submitschedule")
      msg.textContent="Your Schedule is Submitted. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/hrevaluation`);
      link.textContent = 'Schedule Other HR Evaluation';
    
      msg.appendChild(link);

    // window.location = '/hrevaluation';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Technical Evaluation Schedule Form</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
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
          <label>Date for Technical Evaluation: </label>
          <input  type="date"
              required
              className="form-control"
              value={this.state.EvalDate}
              onChange={this.onChangeEvalDate}
              />
        </div>
        <div className="form-group"> 
          <label>Time for Technical Evaluation: </label>
          <input  type="time"
              required
              className="form-control"
              value={this.state.EvalTime}
              onChange={this.onChangeEvalTime}
              />
        </div>
        </div>

        <div className="form-group">
          <input type="submit"
          value="Add Schedule"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
        <div className="alert" id="submitschedule"></div>
      </form>
    </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}