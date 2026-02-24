import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class PayrollCalculator extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeSalary = this.onChangeSalary.bind(this);
    // this.onChangeFund = this.onChangeFund.bind(this);
    this.onChangeOldSalary = this.onChangeOldSalary.bind(this);
    this.onChangeNewSalary = this.onChangeNewSalary.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
    this.onCalculateRevised = this.onCalculateRevised.bind(this);

    this.state = {
      Salary: 0,
      prvFund: 0,
      Fund: 0,
      Tax: 0,
      NetSalary: 0,
      YearlySalary: 0,
      YearlyTax: 0,
      YearlyNet: 0,
      OldSalary: 0,
      NewSalary: 0,
      Month: '',
      Tax1: 0,
      oldTax: 0,
      oldNetSal: 0,
      Tax2: 0,
      newTax: 0,
      newNetSal: 0,
    }
  }

  onChangeSalary(e) {
    var [Salary, Fund, Tax, NetSalary, YearlySalary, YearlyTax, YearlyNet] = this.onCalculate(e.target.value, this.state.prvFund)

    this.setState({
      Salary: Salary,
      Fund: Fund,
      Tax: Tax,
      NetSalary: NetSalary,
      YearlySalary: YearlySalary,
      YearlyTax: YearlyTax,
      YearlyNet: YearlyNet,
    })
  }

  // onChangeFund(e) {
  //   this.setState({
  //     prvFund: e.target.value
  //   })
  //   this.onCalculate(this.state.Salary, e.target.value)
  // }

  onCalculate(Salary, prvFund) {
		var Slabs  = [0,600000,1200000,1800000,2500000,3500000,5000000,8000000,12000000,30000000,50000000,75000000]
		var Inc = [0,0,30000,90000,195000,370000,670000,1345000,2345000,7295000,13295000,21420000]
		var Rate = [0,5,10,15,17.5,20,22.5,25,27.5,30,32.5,35]
		var Fund = Salary * (prvFund/100)
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
		var Tax = YearlyTax / 12
		var NetSalary = (Salary - Tax) - Fund
		var YearlyNet = NetSalary * 12

    return [Salary, Fund, Tax, NetSalary, YearlySalary, YearlyTax, YearlyNet]
    // this.setState({
    //   Salary: Salary,
    //   Fund: Fund,
    //   Tax: Tax,
    //   NetSalary: NetSalary,
    //   YearlySalary: YearlySalary,
    //   YearlyTax: YearlyTax,
    //   YearlyNet: YearlyNet,
    // })
  }

  onChangeOldSalary(e) {
    var [Tax1, oldTax, oldNetSal, Tax2, newTax, newNetSal] = this.onCalculateRevised(e.target.value, this.state.NewSalary, this.state.Month)
    this.setState({
      OldSalary: e.target.value,
      Tax1: Tax1,
      oldTax: oldTax,
      oldNetSal: oldNetSal,
      Tax2: Tax2,
      newTax: newTax,
      newNetSal: newNetSal,
    })
  }

  onChangeNewSalary(e) {
    var [Tax1, oldTax, oldNetSal, Tax2, newTax, newNetSal] = this.onCalculateRevised(this.state.OldSalary, e.target.value, this.state.Month)
    this.setState({
      NewSalary: e.target.value,
      Tax1: Tax1,
      oldTax: oldTax,
      oldNetSal: oldNetSal,
      Tax2: Tax2,
      newTax: newTax,
      newNetSal: newNetSal,
    })
  }

  onChangeMonth(e) {
    var [Tax1, oldTax, oldNetSal, Tax2, newTax, newNetSal] = this.onCalculateRevised(this.state.OldSalary, this.state.NewSalary, e.target.value)
    this.setState({
      Month: e.target.value,
      Tax1: Tax1,
      oldTax: oldTax,
      oldNetSal: oldNetSal,
      Tax2: Tax2,
      newTax: newTax,
      newNetSal: newNetSal,
    })
  }

  onCalculateRevised(OldSalary, NewSalary, Month) {
    var [Salary1, Fund1, Tax1, NetSalary1, YearlySalary1, YearlyTax1, YearlyNet1] = this.onCalculate(OldSalary, this.state.prvFund)
    var [Salary2, Fund2, Tax2, NetSalary2, YearlySalary2, YearlyTax2, YearlyNet2] = this.onCalculate(NewSalary, this.state.prvFund)
    var month = parseInt(Month.split("-")[1])
    var mon1 = 0

    if (month > 6)
      mon1 = 6 - (12 - month) - 1
    else
      mon1 = 6 + month - 1

    var mon2 = 12 - mon1
    var sal1 = Salary1 * mon1
    var sal2 = Salary2 * mon2
    var newSal = (sal1 + sal2) / 12

    var [newSal1, newFund, newTax, newNetSal, newYearSal, newYearTax, newYearNet] = this.onCalculate(newSal, this.state.prvFund)
    
    var oldTax = Tax1 * mon1

    newTax = newYearTax - oldTax
    Tax2 = newTax / mon2
    newNetSal = NewSalary - Tax2

    return [Tax1, oldTax, NetSalary1, Tax2, newTax, newNetSal]
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Payroll Calculator</h3>
      <form>
      <div className="form-box">
            <div className="form-group">
                <label>Salary (Rs.): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Salary}
                    onChange={this.onChangeSalary}
                />
            </div>
            {/* <div className="form-group">
                <label>Provident Fund (%): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.prvFund}
                    onChange={this.onChangeFund}
                />
            </div> */}
        </div>
        <br/>
        <h6>Tax Calculator:</h6>
      <div className="form-box">
            <div className="form-group">
                <label>Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Salary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Tax: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Tax}
                    disabled={true}
                />
            </div>
            {/* <div className="form-group">
                <label>Provident Fund: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Fund}
                    disabled={true}
                />
            </div> */}
            <div className="form-group">
                <label>Net Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.NetSalary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Yearly Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.YearlySalary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Yearly Tax: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.YearlyTax}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Yearly Net Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.YearlyNet}
                    disabled={true}
                />
            </div>
        </div>
      </form>
      </div>
      <div className="col form-box1">
      <h3>Revised Payroll Calculator</h3>
      <form>
      <div className="form-box">
            <div className="form-group">
                <label>Old Salary (Rs.): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.OldSalary}
                    onChange={this.onChangeOldSalary}
                />
            </div>
            <div className="form-group">
                <label>New Salary (Rs.): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.NewSalary}
                    onChange={this.onChangeNewSalary}
                />
            </div>
            <div className="form-group">
                <label>Revised Month: </label>
                <input type="month"
                    required
                    className="form-control"
                    value={this.state.Month}
                    onChange={this.onChangeMonth}
                />
            </div>
        </div>
        <br/>
        <h6>Tax Calculator:</h6>
      <div className="form-box">
            <div className="form-group">
                <label>Old Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.OldSalary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Old Tax Paid: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.oldTax}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Old Tax (Monthly): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Tax1}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Old Net Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.oldNetSal}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>New Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.NewSalary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>New Tax to be Paid: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.newTax}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>New Tax (Monthly): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Tax2}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>New Net Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.newNetSal}
                    disabled={true}
                />
            </div>
        </div>
      </form>
      </div>
    </div>
    )
  }
}