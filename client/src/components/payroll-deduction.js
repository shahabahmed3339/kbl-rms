import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';

export default class PayrollDeduction extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeDamage = this.onChangeDamage.bind(this);
    this.onChangeOther = this.onChangeOther.bind(this);
    this.onChangeMisc = this.onChangeMisc.bind(this);
    this.onChangeAriel = this.onChangeAriel.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      HRS: [],
      HRID: 0,
      Salary: 0,
      Mobile: 0,
      Damage: 0,
      Other: 0,
      Miscellaneous: 0,
      Ariel: 0,
      Deducted: 0,
      Remaining: 0,
      Remarks: '',
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

  onChangeID(e) {
    this.state.HRS.filter(hr => hr._id == e.target.value).map(hr => 
      this.setState({
        HRID: e.target.value,
        Salary: hr.TotalSalary,
        Remaining: hr.TotalSalary,
      })
      )
  }

  onChangeMobile(e) {
    var Deduct = this.state.Deducted + Number(e.target.value) - this.state.Mobile
    this.setState({
      Mobile: e.target.value,
      Deducted: Deduct,
      Remaining: this.state.Salary - Deduct
    })
  }

  onChangeDamage(e) {
    var Deduct = this.state.Deducted + Number(e.target.value) - this.state.Damage
    this.setState({
      Damage: e.target.value,
      Deducted: Deduct,
      Remaining: this.state.Salary - Deduct
    })
  }

  onChangeOther(e) {
    var Deduct = this.state.Deducted + Number(e.target.value) - this.state.Other
    this.setState({
      Other: e.target.value,
      Deducted: Deduct,
      Remaining: this.state.Salary - Deduct
    })
  }

  onChangeMisc(e) {
    var Deduct = this.state.Deducted + Number(e.target.value) - this.state.Miscellaneous
    this.setState({
      Miscellaneous: e.target.value,
      Deducted: Deduct,
      Remaining: this.state.Salary - Deduct
    })
  }
  
  onChangeAriel(e) {
    var Deduct = this.state.Deducted + Number(e.target.value) - this.state.Ariel
    this.setState({
      Ariel: e.target.value,
      Deducted: Deduct,
      Remaining: this.state.Salary - Deduct
    })
  }
  
  onChangeRemarks(e) {
    this.setState({
      Remarks: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    var myCurrentDate = new Date();
    var month = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1)

    const deduct = {
      HRID: this.state.HRID,
      Mobile: this.state.Mobile,
      Damage: this.state.Damage,
      Other: this.state.Other,
      Miscellaneous: this.state.Miscellaneous,
      Ariel: this.state.Ariel,
      Deducted: this.state.Deducted,
      Month: month
    }

    console.log(deduct);

    axios.post('http://localhost:5000/Deduction/add', deduct)
      .then(res => console.log(res.data));
  
        var msg = document.getElementById("deduct")
        msg.textContent = "Deduction has been saved"
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>Payroll Deduction</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
            <div className="form-group">
                <label>HR ID: </label>
                <select type="number"
                    required
                    className="form-control"
                    value={this.state.HRID}
                    onChange={this.onChangeID}>
                      <option>---Select ID---</option>
                      {
                        this.state.HRS.map(hr => {
                          return <option key={hr._id}>{hr._id}</option>
                        })
                      }
                </select>
            </div>
            <div className="form-group">
                <label>Mobile: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Mobile}
                    onChange={this.onChangeMobile}
                />
            </div>
            <div className="form-group">
                <label>Damage: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Damage}
                    onChange={this.onChangeDamage}
                />
            </div>
            <div className="form-group">
                <label>Other: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Other}
                    onChange={this.onChangeOther}
                />
            </div>
            <div className="form-group">
                <label>Miscellaneous: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Miscellaneous}
                    onChange={this.onChangeMisc}
                />
            </div>
            <div className="form-group">
                <label>Ariel: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Ariel}
                    onChange={this.onChangeAriel}
                />
            </div>
            <div className="form-group">
                <label>Remarks: </label>
                <textarea
                    required
                    className="form-control"
                    value={this.state.Remarks}
                    onChange={this.onChangeRemarks}
                />
            </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Save Deduction" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="deduct"></div>
      </form>
      </div>
      <div className="col form-box1">
        <h6>Deduction Calculator:</h6>
      <div className="form-box">
            <div className="form-group">
                <label>Gross Salary: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Salary}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>Deducted Amount: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Deducted}
                    disabled={true}
                />
            </div>
            <div className="form-group">
                <label>After Deduction: </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.Remaining}
                    disabled={true}
                />
            </div>
        </div>
      </div>
    </div>
    )
  }
}