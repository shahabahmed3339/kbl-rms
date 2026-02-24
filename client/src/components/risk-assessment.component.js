import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from 'react-router-dom';

export default class RiskAssessment extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeChoice = this.onChangeChoice.bind(this);
    this.onChangeAPID = this.onChangeAPID.bind(this);
    this.onChangeRisk = this.onChangeRisk.bind(this);
    this.onChangeRisk_Details = this.onChangeRisk_Details.bind(this);
    this.onChangeVulnrblt = this.onChangeVulnrblt.bind(this);
    this.onChangeVulnrblt_Details = this.onChangeVulnrblt_Details.bind(this);
    this.onChangeProbab = this.onChangeProbab.bind(this);
    this.onChangeExposr = this.onChangeExposr.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeQuarter = this.onChangeQuarter.bind(this);
    this.onAddRisk = this.onAddRisk.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Department: '',
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
      Year: 0,
      Quarter: '',
      Asst_CIAs: [],
      Asst_CIA: [],
      users2: [],
      users3: [],
      users4: [],
      users6: [],
      Assets: [],
      depts: [],
      risks: [],
      Asst_Risk: [],
      RMPs: [],
      Quarters:[],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskAssessment/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            risks: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/AssetIssue/')
        .then(response1 => {
            this.setState({
              Assets: response1.data
            })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/Department/')
        .then(response2 => {
          if (response2.data.length > 0) {
            this.setState({
              depts: response2.data
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/CIAMark/')
          .then(response1 => {
              this.setState({
                Asst_CIAs: response1.data
              })
          })
          .catch((error) => {
            console.log(error);
          })

  }

  onChangeAPID(e) {
    e.persist();
    this.setState({
      APID: e.target.value,
      Class: this.state.Asst_CIA.filter(asst => asst.APID == e.target.value).map(asst => asst.Class)
    })

    axios.get('http://localhost:5000/RiskManagementProgram/')
      .then(response1 => {
          var Data = response1.data.filter(rmp => rmp._id ===
            Math.max(...response1.data.map(function(rmp1) {
              return rmp1._id
            })
            )).map(rmp => rmp)[0]
        var Start = Data.StartYear
        var End = Data.EndYear
        var Years = []
        for (var i=Start; i<=End; i++)
        {
          Years.push(i)
        }
          this.setState({
            RMPs: Years
          })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/Quarters/')
        .then(response1 => {
            this.setState({
              Quarters: response1.data
            })
        })
        .catch((error) => {
          console.log(error);
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

              // axios.get('http://localhost:5000/CIAMark/')
              //   .then(response7 => {
              //       this.setState({
              //         Class: response7.data.filter(cias => cias.APID == e.target.value && cias.APType === this.state.Choice).map(user7 => user7.Class)
              //       })
              //   })
              //   .catch((error) => {
              //     console.log(error);
              //   })
  }

  onChangeDepartment(e){
    this.setState({
      Department: e.target.value,
      Choice: "Asset"
    })
    this.get_Asst_CIA("Asset")
    
  }

  get_Asst_CIA(Choice){
    this.setState({
      Asst_CIA: 
        this.state.Asst_CIAs.filter(asst => asst._id ===
          Math.max(...this.state.Asst_CIAs.filter(asst1 => asst1.APID === asst.APID && asst1.APType === Choice).map(function(asst1) {
            return asst1._id
          })
          )).map(asst => asst)})
  }

  onChangeChoice(e){
    e.persist();
    this.setState({
      Choice: e.target.value,
      Asst_Risk: 
        this.state.risks.filter(risk => risk._id ===
          Math.max(...this.state.risks.filter(risk1 => risk1.APID === risk.APID && risk1.APType === e.target.value).map(function(risk1) {
            return risk1._id
          })
          )).map(risk => risk)
    })
    this.get_Asst_CIA(e.target.value)

  }

  onChangeYear(e){
    this.setState({
      Year: e.target.value
    })

  }

  onChangeQuarter(e){
    this.setState({
      Quarter: e.target.value
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

  onAddRisk(e) {
    alert('Classification: ' + this.state.Class + '\n\nImpact Rating: ' + this.state.Impact + '\n\nSummary Rating: ' + this.state.Summary)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

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
      Year: this.state.Year,
      Quarter: this.state.Quarter,
      Date: date,
    }

    console.log(riskassmnt);

    axios.post('http://localhost:5000/RiskAssessment/add', riskassmnt)
      .then(res => console.log(res.data));

      this.setState({
        Risk_Name: '',
        Risk_Details: '',
        Vulnrblt: '',
        Vulnrblt_Details: '',
        Probab: 0,
        Exposr: 0,
        Impact: 0,
        Summary: 0,
        Year: 0,
        Quarter: '',
      })
      this.componentDidMount()

      // var msg = document.getElementById("submitcia")
      // msg.textContent="Risk Assessment Done. Click to "
      // const link = document.createElement("a");
    
      // link.setAttribute('href', `/riskassessment`);
      // link.textContent = 'Risk Assessment';
    
      // msg.appendChild(link);

    // window.location = '/riskassessment';
  }

onSubmit(e){
  window.location = '/riskassessment';
}

  render() {
    return (
      <div className="form-box1">
    <UnlockAccess request={'Admin'}>
      <h3>Risk Assessment Form</h3>

      <Tabs>
      <TabList>
        <Tab>Asset Wise</Tab>
        <Tab>Department Wise</Tab>
      </TabList>

      <TabPanel>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onAddRisk}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Select: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Choice}
              onChange={this.onChangeChoice}>
                <option>---Asset/Process---</option>
                <option>Asset</option>
                <option>Process</option>
          </select>
          </div>
        <div className="form-group"> 
          <label>Asset (CIA Marked): </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.APID}
              onChange={this.onChangeAPID}>
                <option>---Select Asset/Process ID---</option>
              {
                this.state.Asst_CIA.map(function(asst) {
                    return <option 
                      key={asst.APID}
                      value={asst.APID}>{asst.APID}
                      </option>;
                })
              }
          </select>
        </div>
        </div>
        <div className="form-box">
        <div className="form-group"> 
          <label>Select Year: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Year}
              onChange={this.onChangeYear}>
                <option>---Year---</option>
              {
                this.state.RMPs.map(function(year) {
                  return <option 
                    key={year}
                    value={year}>{year}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Select Quarter: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Quarter}
              onChange={this.onChangeQuarter}>
                <option>---Quarter---</option>
              {
                this.state.Quarters.map(function(quart) {
                  return <option 
                    key={quart.Quarter}
                    value={quart.Quarter}>{quart.Quarter}
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
          <label>Vuln. Details: </label>
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
        </div>
        
        <div className="form-group">
          <input type="submit" value="Add New Risk" className="btn navbar-gradient navlink-custom"/>
          <button className="btn navbar-gradient navlink-custom" onClick={this.onSubmit}>Submit</button>
        </div>
        {/* <div className="alert" id="submitcia"></div> */}
      </form>
      </div>

      
      <div className="col">
        <div className="form-group">
          <table id="rept">
            <thead>
            <tr>
              <th style={{width: 200}}>Asset Category</th>
              <th style={{width: 200}}>Asset Sub-Category</th>
              <th style={{width: 200}}>Employee Name</th>
              <th style={{width: 200}}>Designation</th>
              <th style={{width: 200}}>CIA Status</th>
            </tr>
            </thead>
            <tbody>
              {
                this.state.Assets.filter(asst => asst._id === 
                  Math.max(...this.state.Assets.filter(asst => asst.IssuedID.split("-")[0] === this.state.APID).map(asst => {
                    return asst._id                    
                  }))).map((asst, index) => {
                    return <tr key={index}>
                      <td style={{width: 200}}>{asst.Category}</td>
                      <td style={{width: 200}}>{asst.SubCategory}</td>
                      <td style={{width: 200}}>{asst.IssuedTo}</td>
                      <td style={{width: 200}}>{asst.Designation}</td>
                      <td style={{width: 200}}>{
                        this.state.Asst_CIA.filter(asst => asst.APID == this.state.APID).map(asst => {
                          return asst.Class
                        })[0]
                      }</td>
                    </tr>
                })
              }
            </tbody>
          </table>
        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept"
                                filename="Asset Result"
                                sheet="Asset Result"
                                buttonText="Download Results" />  
                        </div>
                        <div className="form-group">
                                <table id="rept1">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Risk Assessment Report</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th style={{width: 200}}>Risk</th>
                                                        <th style={{width: 200}}>Vulnerability</th>
                                                        <th style={{width: 200}}>Exposure</th>
                                                        <th style={{width: 200}}>Impact</th>
                                                        <th style={{width: 200}}>Probability</th>
                                                        <th style={{width: 200}}>Summary</th>
                                                        <th style={{width: 200}}>Risk Owner</th>
                                                        <th style={{width: 200}}>Mitigation</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                  this.state.risks.filter(risk => risk.APID == this.state.APID).map((risk, index) => {
                                                    return <tr key={index}>
                                                    <td style={{width: 200}}>{risk.Risk_Name}</td>
                                                    <td style={{width: 200}}>{risk.Vulnrblt}</td>
                                                    <td style={{width: 200}}>{risk.Exposr}</td>
                                                    <td style={{width: 200}}>{risk.Impact}</td>
                                                    <td style={{width: 200}}>{risk.Probab}</td>
                                                    <td style={{width: 200}}>{risk.Summary}</td>
                                                    <td style={{width: 200}}>{
                                                      this.state.Assets.filter(asst => asst._id === 
                                                        Math.max(...this.state.Assets.filter(asst => asst.IssuedID.split("-")[0] === this.state.APID).map(asst => {
                                                          return asst._id                    
                                                        }))).map(asst => {
                                                          return asst.IssuedTo
                                                        })}</td>
                                                        <td>
                                                          <Link className="action2" to="/reportdownload">View Details</Link>
                                                        </td>
                                                    </tr>
                                                  })
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept1"
                                filename="Asset Report"
                                sheet="Asset Report"
                                buttonText="Download Report" />  
                        </div>
      </div>
      </div>
      </TabPanel>

      <TabPanel>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onAddRisk}>
        <div className="form-box">
          <div className="form-group"> 
            <label>Select Department: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.Department}
                onChange={this.onChangeDepartment}>
                  <option>---Select Department---</option>
                {
                  this.state.depts.map(function(dept) {
                    return <option 
                      key={dept.Name}
                      value={dept.Name}>{dept.Name}
                      </option>;
                  })
                }
            </select>
          </div>
        <div className="form-group"> 
          <label>Asset (CIA Marked): </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.APID}
              onChange={this.onChangeAPID}>
                <option>---Select Asset/Process ID---</option>
              {this.state.Assets.filter(asst1 => asst1.Department === this.state.Department).map((asst1, index) => {
                return <>
                  {
                    this.state.Asst_CIAs.filter(asst => asst._id ===
                      Math.max(...this.state.Asst_CIAs.filter(asst2 => asst2.APID == asst1.IssuedID.split("-")[0] && asst2.APType === 'Asset').map(function(asst1) {
                        return asst1._id
                      })
                      )).map(asst => {
                      return <option 
                      key={asst.APID}
                      value={asst.APID}>{asst.APID}
                      </option>;
                      })
                  }
                </>
              })}
          </select>
        </div>
        </div>
        <div className="form-box">
        <div className="form-group"> 
          <label>Select Year: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Year}
              onChange={this.onChangeYear}>
                <option>---Year---</option>
              {
                this.state.RMPs.map(function(year) {
                  return <option 
                    key={year}
                    value={year}>{year}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Select Quarter: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Quarter}
              onChange={this.onChangeQuarter}>
                <option>---Quarter---</option>
              {
                this.state.Quarters.map(function(quart) {
                  return <option 
                    key={quart.Quarter}
                    value={quart.Quarter}>{quart.Quarter}
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
          <label>Vuln. Details: </label>
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
        </div>
        
        <div className="form-group">
          <input type="submit" value="Add New Risk" className="btn navbar-gradient navlink-custom"/>
          <button className="btn navbar-gradient navlink-custom" onClick={this.onSubmit}>Submit</button>
        </div>
      </form>
      </div>
      
      <div className="col">
        <div className="form-group">
          <table id="rept2">
            <thead>
            <tr>
              <th style={{width: 200}}>Asset ID</th>
              <th style={{width: 200}}>Asset Category</th>
              <th style={{width: 200}}>Asset Sub-Category</th>
              <th style={{width: 200}}>Employee Name</th>
              <th style={{width: 200}}>Designation</th>
              <th style={{width: 200}}>CIA Status</th>
              {/* <th style={{width: 200}}>Action</th> */}
            </tr>
            </thead>
            <tbody>
              {this.state.Assets.filter(asst1 => asst1.Department === this.state.Department).map((asst1, index) => {
                return <tr key={index}>
                  <td style={{width: 200}}>{asst1.IssuedID.split("-")[0]}</td>
                  <td style={{width: 200}}>{asst1.Category}</td>
                  <td style={{width: 200}}>{asst1.SubCategory}</td>
                  <td style={{width: 200}}>{asst1.IssuedTo}</td>
                  <td style={{width: 200}}>{asst1.Designation}</td>
                  {
                    this.state.Asst_CIAs.filter(asst => asst._id ===
                      Math.max(...this.state.Asst_CIAs.filter(asst2 => asst2.APID == asst1.IssuedID.split("-")[0] && asst2.APType === 'Asset').map(function(asst1) {
                        return asst1._id
                      })
                      )).map(asst => {
                      return <>
                        <td style={{width: 200}}>{asst.Class}</td>
                        {/* <td><Link className="action2" to={"/setrisklevel/"+asst.APID}>Set Risk Level</Link></td> */}
                      </>
                      })
                  }
                </tr>
              })}
            </tbody>
          </table>
        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept2"
                                filename="Asset Result"
                                sheet="Asset Result"
                                buttonText="Download Results" />  
                        </div>
                        <div className="form-group">
                                <table id="rept3">
                                        <thead>
                                                <tr>
                                                        <th colSpan="15" style={{background: "#005fcc", fontSize:'15px'}}>Risk Assessment Report</th>
                                                </tr>
                                        </thead>
                                        <thead>
                                                <tr>
                                                        <th style={{width: 200}}>Risk</th>
                                                        <th style={{width: 200}}>Vulnerability</th>
                                                        <th style={{width: 200}}>Exposure</th>
                                                        <th style={{width: 200}}>Impact</th>
                                                        <th style={{width: 200}}>Probability</th>
                                                        <th style={{width: 200}}>Summary</th>
                                                        <th style={{width: 200}}>Risk Owner</th>
                                                        <th style={{width: 200}}>Mitigation</th>
                                                </tr>  
                                        </thead>
                                        <tbody>
                                                {
                                                  this.state.risks.filter(risk => risk.APID == this.state.APID).map((risk, index) => {
                                                    return <tr key={index}>
                                                    <td style={{width: 200}}>{risk.Risk_Name}</td>
                                                    <td style={{width: 200}}>{risk.Vulnrblt}</td>
                                                    <td style={{width: 200}}>{risk.Exposr}</td>
                                                    <td style={{width: 200}}>{risk.Impact}</td>
                                                    <td style={{width: 200}}>{risk.Probab}</td>
                                                    <td style={{width: 200}}>{risk.Summary}</td>
                                                    <td style={{width: 200}}>{
                                                      this.state.Assets.filter(asst => asst._id === 
                                                        Math.max(...this.state.Assets.filter(asst => asst.IssuedID.split("-")[0] === this.state.APID).map(asst => {
                                                          return asst._id                    
                                                        }))).map(asst => {
                                                          return asst.IssuedTo
                                                        })}</td>
                                                        <td>
                                                          <Link className="action2" to="/reportdownload">View Details</Link>
                                                        </td>
                                                    </tr>
                                                  })
                                                }
                                        </tbody>
                                </table>
                        </div>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="rept3"
                                filename="Asset Report"
                                sheet="Asset Report"
                                buttonText="Download Report" />  
                        </div>
      </div>
      </div>
      </TabPanel>
        </Tabs>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}