import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";

export default class SetGoal extends Component {
  constructor(props) {
    super(props);

    this.onChangeGoal = this.onChangeGoal.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVision = this.onChangeVision.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeStrgcCont = this.onChangeStrgcCont.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeOutcome = this.onChangeOutcome.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Goal: '',
      Description: '',
      Vision: '',
      Department: '',
      Designation: '',
      StrgcCont: 0,
      Deadline: '',
      Outcome: '',
      Vis_Out: '',
      users1: [],
      users2: [],
      users4: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Goal/')
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

      axios.get('http://localhost:5000/Vision/')
        .then(response1 => {
          if (response1.data.length > 0) {
            this.setState({
              users4: response1.data
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

  onChangeGoal(e) {
    this.setState({
      Goal: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      Description: e.target.value
    })
  }

  onChangeVision(e) {
    this.setState({
      Vision: e.target.value,
      Vis_Out: this.state.users4.filter(vis => vis.Vision == e.target.value).map(vis => vis.Outcome)
    })
  }

  onChangeDepartment(e) {
    e.persist();
    this.setState({
      Department: e.target.value
    })

    axios.get('http://localhost:5000/Designation/')
    .then(response2 => {
      if (response2.data.length > 0) {
        this.setState({
          users2: response2.data.filter(dsgn => dsgn.Department === e.target.value).map(user2 => user2.Name)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeDesignation(e) {
    this.setState({
      Designation: e.target.value
    })
  }

  onChangeStrgcCont(e) {
    this.setState({
      StrgcCont: e.target.value
    })
  }

  onChangeDeadline(e) {
    this.setState({
      Deadline: e.target.value
    })
  }

  onChangeOutcome(e) {
    this.setState({
      Outcome: e.target.value
    })
  }

  onSubmit(e) {
    alert('Your goal is successfully submitted')
    e.preventDefault();

    const goal = {
      _id: this.state._id,
      Goal: this.state.Goal,
      Description: this.state.Description,
      Vision: this.state.Vision,
      Department: this.state.Department,
      Designation: this.state.Designation,
      StrgcCont: this.state.StrgcCont,
      Deadline: this.state.Deadline,
      Outcome: this.state.Outcome
    }

    console.log(goal);

    axios.post('http://localhost:5000/Goal/add', goal)
      .then(res => console.log(res.data));

      window.location = '/setgoal';
  }

  render() {
    return (
    <div className="row">
      <div className="col">
        <UnlockAccess request={'Admin'}>
            <h3>Set Goal</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Goal}
                    onChange={this.onChangeGoal}
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
                <label>Vision: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.Vision}
                    onChange={this.onChangeVision}>
                      <option>---Select Vision---</option>
                    {
                      this.state.users4.map(function(user4) {
                        return <option 
                          key={user4.Vision}
                          value={user4.Vision}>{user4.Vision}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Department: </label>
                <select ref="userInput"
                    required
                    className="form-control"
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
                </select>
              </div>
              <div className="form-group">
                <label>Designation: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.Designation}
                    onChange={this.onChangeDesignation}>
                    <option>---Select Designation---</option>
                    {
                      this.state.users2.map(function(user2) {
                        return <option 
                          key={user2}
                          value={user2}>{user2}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group">
                <label>Strategic Contribution (%): </label>
                  <input type="number"
                    required
                    className="form-control"
                    value={this.state.StrgcCont}
                    onChange={this.onChangeStrgcCont}
                  />
              </div>
              <div className="form-group">
                <label>Deadline: </label>
                  <input type="date"
                    required
                    className="form-control"
                    value={this.state.Deadline}
                    onChange={this.onChangeDeadline}
                  />
              </div>
              <div className="form-group">
                <label>Expected Outcome: </label>
                  <input type="text"
                    required
                    className="form-control"
                    value={this.state.Outcome}
                    onChange={this.onChangeOutcome}
                  />
              </div>

              <div className="form-group">
                <input type="submit" value="Set Goal" className="btn navbar-gradient navlink-custom" />
              </div>
            </form>
          </UnlockAccess>
          <UnlockAccess request={'User'}>
            Page Not Available...
          </UnlockAccess>
      </div>
      <div className="col">
        <h6>Vision Outcome: </h6>
        {this.state.Vis_Out}
      </div>
    </div>
    )
  }
}