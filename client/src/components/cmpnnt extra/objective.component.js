import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";

export default class SetObjective extends Component {
  constructor(props) {
    super(props);

    this.onChangeObjective = this.onChangeObjective.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeAssignedTo = this.onChangeAssignedTo.bind(this);
    this.onChangeResource = this.onChangeResource.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeResult = this.onChangeResult.bind(this);
    this.onChangeEvalFreq = this.onChangeEvalFreq.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeOutcome = this.onChangeOutcome.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Objective: '',
      Description: '',
      Goal: '',
      AssignedTo: '',
      Resource: '',
      Action: '',
      Deadline: '',
      ResultInEvidence: '',
      EvalFreq: '',
      TotalScore: '',
      Priority: '',
      Outcome: '',
      Goal_Out: '',
      users1: [],
      users2: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Objective/')
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

      axios.get('http://localhost:5000/HR/')
      .then(response1 => {
        if (response1.data.length > 0) {
          this.setState({
            users1: response1.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
      axios.get('http://localhost:5000/Goal/')
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users2: response2.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeObjective(e) {
    this.setState({
      Objective: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      Description: e.target.value
    })
  }

  onChangeGoal(e) {
    this.setState({
      Goal: e.target.value,
      Goal_Out: this.state.users2.filter(goal => goal.Goal == e.target.value).map(goal => goal.Outcome)
    })
  }

  onChangeAssignedTo(e) {
    this.setState({
      AssignedTo: e.target.value
    })
  }

  onChangeResource(e) {
    this.setState({
      Resource: e.target.value
    })
  }

  onChangeAction(e) {
    this.setState({
      Action: e.target.value
    })
  }

  onChangeDeadline(e) {
    this.setState({
      Deadline: e.target.value
    })
  }

  onChangeResult(e) {
    this.setState({
      ResultInEvidence: e.target.value
    })
  }

  onChangeEvalFreq(e) {
    this.setState({
      EvalFreq: e.target.value
    })
  }

  onChangeScore(e) {
    this.setState({
      TotalScore: e.target.value
    })
  }

  onChangePriority(e) {
    this.setState({
      Priority: e.target.value
    })
  }

  onChangeOutcome(e) {
    this.setState({
      Outcome: e.target.value
    })
  }

  onSubmit(e) {
    alert('Your objective is successfully submitted')
    e.preventDefault();

    const objective = {
      _id : this.state._id,
      Objective : this.state.Objective,
      Description : this.state.Description,
      Goal : this.state.Goal,
      AssignedTo : this.state.AssignedTo,
      Resource : this.state.Resource,
      Action : this.state.Action,
      Deadline : this.state.Deadline,
      ResultInEvidence : this.state.ResultInEvidence,
      EvalFreq : this.state.EvalFreq,
      TotalScore : this.state.TotalScore,
      Priority : this.state.Priority,
      Outcome : this.state.Outcome
    }

    console.log(objective);

    axios.post('http://localhost:5000/Objective/add', objective)
      .then(res => console.log(res.data));

    window.location = '/setobjective';
  }

  render() {
    return (
    <div className="row">
      <div className="col">
    <UnlockAccess request={'Admin'}>
      <h3>Set Objective</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Objective}
              onChange={this.onChangeObjective}
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
        <div className="form-group">
          <label>Goal: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Goal}
              onChange={this.onChangeGoal}>
              <option>---Select Goal---</option>
              {
                this.state.users2.map(function(user2) {
                  return <option 
                    key={user2.Goal}
                    value={user2.Goal}>{user2.Goal}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.AssignedTo}
              onChange={this.onChangeAssignedTo}>
              <option>---Select HR---</option>
              {
                this.state.users1.filter(hr => hr.Designation == this.state.users2.filter(vis => vis.Goal == this.state.Goal).map((dsgn) => {return dsgn.Designation})).map(function(user1) {
                  return <option 
                    key={user1.Name}
                    value={user1.Name}>{user1.Name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Resource: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Resource}
              onChange={this.onChangeResource}
              />
        </div>
        <div className="form-group"> 
          <label>Action: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Action}
              onChange={this.onChangeAction}
              />
        </div>
        <div className="form-group"> 
          <label>Deadline: </label>
          <input  type="date"
              required
              className="form-control"
              value={this.state.Deadline}
              onChange={this.onChangeDeadline}
              />
        </div>
        <div className="form-group"> 
          <label>Result In Evidence: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.ResultInEvidence}
              onChange={this.onChangeResult}
              />
        </div>
        <div className="form-group"> 
          <label>Evaluation Frequency: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.EvalFreq}
              onChange={this.onChangeEvalFreq}
              />
        </div>
        <div className="form-group"> 
          <label>Total Score: </label>
          <input  type="number"
              required
              className="form-control"
              value={this.state.TotalScore}
              onChange={this.onChangeScore}
              />
        </div>
        <div className="form-group"> 
          <label>Priority: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Priority}
              onChange={this.onChangePriority}
              />
        </div>
        <div className="form-group"> 
          <label>Expected Outcome: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Outcome}
              onChange={this.onChangeOutcome}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Set Objective" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
      </UnlockAccess>
      <UnlockAccess request={'User'}>
        Page Not Available...
      </UnlockAccess>
      </div>
      <div className="col">
        <h6>Goal Outcome:</h6>
        {this.state.Goal_Out}
      </div>
    </div>
    )
  }
}