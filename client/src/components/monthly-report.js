import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var myCurrentDate = new Date();

export default class MonthlyReport extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      MaxMonth: myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1),
      Month: '',
      HRS: [],
      IDS: [],
      workingdays: [],
      workinghours: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HR/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            HRS: res.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeMonth(e) {
    this.setState({
      Month: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Level is successfully submitted')
    e.preventDefault();

    const monthly = new FormData()
    monthly.append('Month', this.state.Month)

    // console.log(monthly);

    axios.post('http://localhost:8000/duration_report2', monthly)
      .then(res => {
        this.setState({
          IDS: res.data.IDS,
          workingdays: res.data.workingdays,
          workinghours: res.data.workinghours,
        })
      });

      document.getElementById("monthly").style.display = "inline"
      // var msg = document.getElementById("submitduration")
      // msg.textContent="Your Level is Submitted. Click to "
      // const link = document.createElement("a");
    
      // link.setAttribute('href', `/hierarchy`);
      // link.textContent = 'Setup Hierarchy';
    
      // msg.appendChild(link);

    // window.location = '/addlevel';
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Monthly Report</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
            <div className="form-group">
                <label>Month: </label>
                <input type="month"
                    required
                    className="form-control"
                    max={this.state.MaxMonth}
                    value={this.state.Month}
                    onChange={this.onChangeMonth}
                />
            </div>
        </div>

        <div className="form-group">
          <input type="submit"
          value="Submit"
          className="btn navbar-gradient navlink-custom"
          style={{marginTop: "10px"}}
          />
        </div>
      </form>
      </div>
      <div className="col">
      </div>
      <div id="monthly" className="form-box1" style={{display: "none"}}>
        <table id="report">
          <thead>
            <tr>
              <th colSpan="15" style={{background: "#005fcc", fontSize: "15px"}}>Monthly Report</th>
            </tr>
            </thead>
            <thead>
              <tr>
                <th style={{width: 200}}>ID</th>
                <th style={{width: 200}}>Name</th>
                <th style={{width: 200}}>Department</th>
                <th style={{width: 200}}>Designation</th>
                <th style={{width: 200}}>Month</th>
                <th style={{width: 200}}>Working Days</th>
                <th style={{width: 200}}>Working Hours</th>
                <th style={{width: 200}}>Basic Salary</th>
                <th style={{width: 200}}>Medical Allownce</th>
                <th style={{width: 200}}>Rent Allownce</th>
                <th style={{width: 200}}>Miscellaneous</th>
                <th style={{width: 200}}>Total Salary</th>
              </tr>  
            </thead>
            <tbody>
                {this.state.HRS.map((hr, i) => {
                    return <tr key={i}>
                      <td>{hr._id}</td>
                      <td>{hr.Name}</td>
                      <td>{hr.Department}</td>
                      <td>{hr.Designation}</td>
                      <td>{this.state.Month}</td>
                      <td>{this.state.workingdays[i]}</td>
                      <td>{this.state.workinghours[i]}</td>
                      <td>{hr.Salary}</td>
                      <td>{hr.MedAllownce}</td>
                      <td>{hr.RentAllownce}</td>
                      <td>{hr.Miscellaneous}</td>
                      <td>{hr.TotalSalary}</td>
                    </tr>
                })}
            </tbody>
          </table>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="report"
                                filename="Monthly Report"
                                sheet="Monthly Report"
                                buttonText="Download Report" />  
                        </div>
      </div>
    </div>
    )
  }
}