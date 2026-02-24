import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';

export default class RiskAssessment extends Component {
  constructor(props) {
    super(props);

    this.onChangeChoice = this.onChangeChoice.bind(this);
    this.onChangeAPID = this.onChangeAPID.bind(this);
    this.onChangeRisk = this.onChangeRisk.bind(this);
    this.onChangeRisk_Details = this.onChangeRisk_Details.bind(this);
    this.onChangeVulnrblt = this.onChangeVulnrblt.bind(this);
    this.onChangeVulnrblt_Details = this.onChangeVulnrblt_Details.bind(this);
    this.onChangeProbab = this.onChangeProbab.bind(this);
    this.onChangeExposr = this.onChangeExposr.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Choice: '',
      APID: 0,
      Risk_Name: '',
      Risk_Details: '',
      Vulnrblt: '',
      Vulnrblt_Details: '',
      Probab: 0,
      Exposr: 0,
      Class: '',
      Impact: 0,
      Summary: 0,
      users1: [],
      users2: [],
      users3: [],
      users4: [],
      users6: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskAssessment/')
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

  onChangeAPID(e) {
    e.persist();
    this.setState({
      APID: e.target.value,
    })

    axios.get('http://localhost:5000/Risk/')
      .then(response2 => {
          this.setState({
            users2: response2.data.map(user2 => user2.Risk_Name)
          })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Vulnerability/')
        .then(response3 => {
            this.setState({
              users3: response3.data.map(user3 => user3.Vulnrblt)
            })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/Probability/')
          .then(response4 => {
              this.setState({
                users4: response4.data.map(user4 => user4._id)
              })
          })
          .catch((error) => {
            console.log(error);
          })

            axios.get('http://localhost:5000/Exposure/')
              .then(response6 => {
                  this.setState({
                    users6: response6.data.map(user6 => user6._id)
                  })
              })
              .catch((error) => {
                console.log(error);
              })

              axios.get('http://localhost:5000/CIAMark/')
                .then(response7 => {
                    this.setState({
                      Class: response7.data.filter(cias => cias.APID == e.target.value && cias.APType === this.state.Choice).map(user7 => user7.Class)
                    })
                })
                .catch((error) => {
                  console.log(error);
                })
  }

  onChangeChoice(e){
    e.persist();
    this.setState({
      Choice: e.target.value
    })

      axios.get('http://localhost:5000/CIAMark/')
        .then(response1 => {
            this.setState({
              users1: response1.data.filter(aptp => aptp.APType === e.target.value).map(user1 => user1.APID)
            })
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeRisk(e){
    this.setState({
      Risk_Name: e.target.value
    })

  }

  onChangeRisk_Details(e){
    this.setState({
      Risk_Details: e.target.value
    })
    
  }

  onChangeVulnrblt(e){
    this.setState({
      Vulnrblt: e.target.value
    })
    
  }

  onChangeVulnrblt_Details(e){
    this.setState({
      Vulnrblt_Details: e.target.value
    })
    
  }

  onChangeExposr(e){
    this.setState({
      Exposr: e.target.value
    })

    if (this.state.Class == 'LBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 1 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 2 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 3 })
      }
    }
    else if (this.state.Class == 'MBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 2 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 3 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 4 })
      }
    }
    else if (this.state.Class == 'HBI')
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Impact: 3 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Impact: 4 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Impact: 5 })
      }
    }
    
  }

  onChangeProbab(e){
    this.setState({
      Probab: e.target.value
    })

    if (this.state.Impact == 1)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 1 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 3 })
      }
    }
    else if (this.state.Impact == 2)
    {
      if (e.target.value == 1)
      {
        this.setState({ Summary: 1 })
      }
      else if (e.target.value == 2 || e.target.value == 3)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 4)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 5)
      {
        this.setState({ Summary: 4 })
      }
    }
    else if (this.state.Impact == 3)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 4 })
      }
    }
    else if (this.state.Impact == 4)
    {
      if (e.target.value == 1)
      {
        this.setState({ Summary: 2 })
      }
      else if (e.target.value == 2)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 3 || e.target.value == 4)
      {
        this.setState({ Summary: 4 })
      }
      else if (e.target.value == 5)
      {
        this.setState({ Summary: 5 })
      }
    }
    else if (this.state.Impact == 5)
    {
      if (e.target.value == 1 || e.target.value == 2)
      {
        this.setState({ Summary: 3 })
      }
      else if (e.target.value == 3)
      {
        this.setState({ Summary: 4 })
      }
      else if (e.target.value == 4 || e.target.value == 5)
      {
        this.setState({ Summary: 5 })
      }
    }
    
  }

  onSubmit(e) {
    alert('Classification: ' + this.state.Class + '\n\nImpact Rating: ' + this.state.Impact + '\n\nSummary Rating: ' + this.state.Summary)
    e.preventDefault();

    const riskassmnt = {
      _id: this.state._id,
      APType: this.state.Choice,
      APID: this.state.APID,
      Risk_Name: this.state.Risk_Name,
      Risk_Details: this.state.Risk_Details,
      Vulnrblt: this.state.Vulnrblt,
      Vulnrblt_Details: this.state.Vulnrblt_Details,
      Exposr: this.state.Exposr,
      Impact: this.state.Impact,
      Probab: this.state.Probab,
      Summary: this.state.Summary,
    }

    console.log(riskassmnt);

    axios.post('http://localhost:5000/RiskAssessment/add', riskassmnt)
      .then(res => console.log(res.data));

    window.location = '/riskassessment';
  }

  render() {
    return (
    <div>
    <UnlockAccess request={'Admin'}>
      <h3>Risk Assessment Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Select for Risk Assessment (Asset/Process): </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Choice}
              onChange={this.onChangeChoice}>
                <option>---Select Option---</option>
                <option>Asset</option>
                <option>Process</option>
          </select>
          </div>
        <div className="form-group"> 
          <label>Select CIA Marked Asset/Process ID: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.APID}
              onChange={this.onChangeAPID}>
                <option>---Select Asset/Process ID---</option>
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
          <label>Select Risk: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Risk_Name}
              onChange={this.onChangeRisk}>
                <option>---Risk---</option>
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
          <label>Enter Risk Details: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Risk_Details}
              onChange={this.onChangeRisk_Details}
              />
        </div>
        <div className="form-group"> 
          <label>Select Vulnerability: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Vulnrblt}
              onChange={this.onChangeVulnrblt}>
                <option>---Vulnerability---</option>
              {
                this.state.users3.map(function(user3) {
                  return <option 
                    key={user3}
                    value={user3}>{user3}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Enter Vulnerability Details: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Vulnrblt_Details}
              onChange={this.onChangeVulnrblt_Details}
              />
        </div>
        <div className="form-group"> 
          <label>Select Exposure: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Exposr}
              onChange={this.onChangeExposr}>
                <option>---Exposure---</option>
              {
                this.state.users6.map(function(user6) {
                  return <option 
                    key={user6}
                    value={user6}>{user6}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Select Probability: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Probab}
              onChange={this.onChangeProbab}>
                <option>---Probability---</option>
              {
                this.state.users4.map(function(user4) {
                  return <option 
                    key={user4}
                    value={user4}>{user4}
                    </option>;
                })
              }
          </select>
        </div>
        

        
        <div className="form-group">
          <input type="submit" value="Calculate Risk Level" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}