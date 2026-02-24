import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import {Bar, Pie, Line} from 'react-chartjs-2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var myCurrentDate = new Date();

export default class DurationReport extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      MaxDate: myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate(),
      StartDate: '',
      EndDate: '',
      IDS: [],
      reportdata: [],
      workingdays: [],
      workinghours: [],
    }
  }

  onChangeStartDate(e) {
    this.setState({
      StartDate: e.target.value
    })
  }

  onChangeEndDate(e) {
    this.setState({
      EndDate: e.target.value
    })
  }

  onSubmit(e) {
    // alert('Your Level is successfully submitted')
    e.preventDefault();

    const payroll = new FormData()
    payroll.append('StartDate', this.state.StartDate)
    payroll.append('EndDate', this.state.EndDate)
    const duration = {
      StartDate : this.state.StartDate,
      EndDate : this.state.EndDate
    }

    // console.log(payroll);

    axios.post('http://localhost:8000/duration_report1', payroll)
      .then(res => {
        this.setState({
          IDS: res.data.IDS,
          reportdata: res.data.reportdata,
          workingdays: res.data.workingdays,
          workinghours: res.data.workinghours,
        })
      });

      // var msg = document.getElementById("submitduration")
      // msg.textContent="Your Level is Submitted. Click to "
      // const link = document.createElement("a");
    
      // link.setAttribute('href', `/hierarchy`);
      // link.textContent = 'Setup Hierarchy';
    
      // msg.appendChild(link);

    // window.location = '/addlevel';
  }

  render() {

    var data = {
        labels: this.state.IDS,
        datasets: [
          {
            label: "Employee's Working Days",
            data: this.state.workingdays,
            backgroundColor: "black",
            borderColor: "rgb(223, 31, 31)",
            borderWidth: 1,
          },
        ],
      };

      var data1 = {
          labels: this.state.IDS,
          datasets: [
            {
              label: "Employee's Working Hours",
              data: this.state.workinghours,
              backgroundColor: "black",
              borderColor: "rgb(223, 31, 31)",
              borderWidth: 1,
            },
          ],
        };
      
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Duration Report</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
            <div className="form-group">
                <label>Start Date: </label>
                <input type="date"
                    required
                    className="form-control"
                    max={this.state.MaxDate}
                    value={this.state.StartDate}
                    onChange={this.onChangeStartDate}
                />
            </div>
            <div className="form-group">
                <label>End Date: </label>
                <input type="date"
                    required
                    className="form-control"
                    min={this.state.StartDate}
                    max={this.state.MaxDate}
                    value={this.state.EndDate}
                    onChange={this.onChangeEndDate}
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
        <div className="alert" id="submitduration"></div>
      </form>
        <table id="report">
          <thead>
            <tr>
              <th colSpan="15" style={{background: "#005fcc", fontSize: "15px"}}>Attendance Report</th>
            </tr>
            </thead>
            <thead>
              <tr>
                <th style={{width: 200}}>ID</th>
                <th style={{width: 200}}>Name</th>
                <th style={{width: 200}}>Department</th>
                <th style={{width: 200}}>Designation</th>
                <th style={{width: 200}}>Date</th>
                <th style={{width: 200}}>IN Time</th>
                <th style={{width: 200}}>OUT Time</th>
                <th style={{width: 200}}>Total Time</th>
                <th style={{width: 200}}>Work Time</th>
              </tr>  
            </thead>
            <tbody>
                {this.state.reportdata.map(report => {
                  return <>
                  {report.duration_data.map((duration, i) => {
                    return <tr key={i}>
                      <td>{duration.ID}</td>
                      <td>{duration.Name}</td>
                      <td>{duration.Department}</td>
                      <td>{duration.Designation}</td>
                      <td>{duration.Date}</td>
                      <td>{duration.IN}</td>
                      <td>{duration.OUT}</td>
                      <td>{duration.TotalTime}</td>
                      <td>{duration.WorkTime}</td>
                    </tr>
                  })}
                  </>
                })}
            </tbody>
          </table>
                        <div className="form-group">
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="report"
                                filename="Duration Report"
                                sheet="Duration Report"
                                buttonText="Download Report" />  
                        </div>
      </div>
      <div className="col">
          <h5>Total Working Days Graph</h5>
          <Line data = {data} />
          {/* <canvas id="DaysChart" style={{width:"100%", maxWidth: "600px"}}></canvas> */}
          <br/>
          <h5>Total Working Hours Graph</h5>
          <Line data = {data1} />
          {/* <canvas id="HoursChart" style={{width:"100%", maxWidth: "600px"}}></canvas> */}
      </div>
    </div>
    )
  }
}