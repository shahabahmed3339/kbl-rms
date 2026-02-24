import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var myCurrentDate = new Date();

export default class PayrollProcess extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeFund = this.onChangeFund.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
    this.onSavePayroll = this.onSavePayroll.bind(this);

    this.state = {
      MaxMonth: myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1),
      Month: '',
      prvFund: 0,
      EOBI: 20000,
      EOBILimit: 1,
      HRS: [],
      Deductions: [],
      IDS: [],
      workingdays: [],
      workinghours: [],
      Salary: [],
      Fund: [],
      EOBIs: [],
      Tax: [],
      Deducted: [],
      NetSalary: [],
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
      axios.get('http://localhost:5000/Deduction/')
        .then(res => {
          if (res.data.length > 0) {
            this.setState({
              Deductions: res.data
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

  onChangeFund(e) {
    this.setState({
      prvFund: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const monthly = new FormData()
    monthly.append('Month', this.state.Month)

    axios.post('http://localhost:8000/duration_report2', monthly)
      .then(res => {
        this.setState({
          IDS: res.data.IDS,
          workingdays: res.data.workingdays,
          workinghours: res.data.workinghours,
        })
      });

      var  Salary = []
      var  Fund = []
      var eobi = []
      var  Tax = []
      var  Deducted = []
      var  NetSalary = []

      this.state.HRS.map(hr => {
        var [Fund1, EOBI1, Tax1, NetSal] = this.onCalculate(hr.Salary, hr.TotalSalary, this.state.prvFund, this.state.EOBI, this.state.EOBILimit)
        
        var  deducted = 0
        this.state.Deductions.filter(deduct => deduct.Month === this.state.Month && deduct.HRID === hr._id).map(deduct => {
          deducted = deduct.Deducted
        })
        var newSal = NetSal - deducted
        
        Salary = [...Salary, hr.TotalSalary]
        Fund = [...Fund, Fund1]
        eobi = [...eobi, EOBI1]
        Tax = [...Tax, Tax1]
        Deducted = [...Deducted, deducted]
        NetSalary = [...NetSalary, newSal]
      })

      this.setState({
        Salary: Salary,
        Fund: Fund,
        EOBIs: eobi,
        Tax: Tax,
        Deducted: Deducted,
        NetSalary: NetSalary
      })

      document.getElementById("monthly").style.display = "inline"
  }

  onSavePayroll(e) {
    e.preventDefault();

    const payroll = {
      HRID: this.state.IDS,
      Salary: this.state.Salary,
      Tax: this.state.Tax,
      prvFund: this.state.Fund,
      Month: this.state.Month,
    }
    console.log(payroll)

    axios.post('http://localhost:5000/Payroll/add', payroll)
      .then(res => console.log(res.data));

      var msg = document.getElementById("save")
      msg.textContent = "Payroll Process is Saved"

  }

  onCalculate(Basic, Salary, prvFund, EOBI, EOBILimit) {
		var Slabs  = [0,600000,1200000,1800000,2500000,3500000,5000000,8000000,12000000,30000000,50000000,75000000]
		var Inc = [0,0,30000,90000,195000,370000,670000,1345000,2345000,7295000,13295000,21420000]
		var Rate = [0,5,10,15,17.5,20,22.5,25,27.5,30,32.5,35]
		var Fund1 = Basic * (prvFund/100)
		var EOBI1 = EOBI * (EOBILimit/100)
		var YearlySalary = Salary * 12
		var YearlyTax = 0
		for (var i=1; i<Slabs.length-1; i++)
    {
			if (YearlySalary > Slabs[i] && YearlySalary <= Slabs[i+1])
      {
				YearlyTax = Math.round(((YearlySalary - Slabs[i]) * Rate[i]/100) + Inc[i])
				break
      }
			else if (YearlySalary > Slabs[Slabs.length-1])
      {
				YearlyTax = Math.round(((YearlySalary - Slabs[Slabs.length-1]) * Rate[Slabs.length-1]/100) + Inc[Slabs.length-1])
      }
    }
		var Tax1 = YearlyTax / 12
		var NetSal = (Salary - Tax1) - Fund1 - EOBI1
		var YearlyNet = NetSal * 12

    return [Fund1, EOBI1, Tax1,  NetSal]
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Payroll Process</h3>
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
            <div className="form-group">
                <label>Provident Fund (%): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.prvFund}
                    onChange={this.onChangeFund}
                />
            </div>
        </div>

        <div className="form-group">
          <input type="submit"
          value="Process"
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
              <th colSpan="20" style={{background: "#005fcc", fontSize: "15px"}}>Payroll Report</th>
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
                <th style={{width: 200}}>Gross Salary</th>
                <th style={{width: 200}}>Tax</th>
                <th style={{width: 200}}>Provident Fund ({this.state.prvFund}%)</th>
                <th style={{width: 200}}>EOBI ({this.state.EOBILimit}%)</th>
                <th style={{width: 200}}>Deduction</th>
                <th style={{width: 200}}>Net Salary</th>
              </tr>  
            </thead>
            <tbody>
                {
                  this.state.HRS.map((hr, i) => {
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
                        <td>{this.state.Tax[i]}</td>
                        <td>{this.state.Fund[i]}</td>
                        <td>{this.state.EOBIs[i]}</td>
                        <td>{this.state.Deducted[i]}</td>
                        <td>{this.state.NetSalary[i]}</td>
                      </tr>
                  })
                }
            </tbody>
          </table>
                        <div>
                                <ReactHTMLTableToExcel
                                className="btn navbar-gradient navlink-custom"
                                table="report"
                                filename="Monthly Report"
                                sheet="Monthly Report"
                                buttonText="Download Report" />  
                                
                                <input type="button"
                                style={{marginLeft: "20px"}}
                                className="btn navbar-gradient navlink-custom"
                                value="Save Process"
                                onClick={this.onSavePayroll}
                                />
                                <div className="alert" id="save"></div>

                        </div>
      </div>
    </div>
    )
  }
}