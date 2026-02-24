import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import CameraFeed from './Camera/CameraFeed';

export default class UpdateHR extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeLineManager = this.onChangeLineManager.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeMedAllownce = this.onChangeMedAllownce.bind(this);
    this.onChangeRentAllownce = this.onChangeRentAllownce.bind(this);
    this.onChangeMiscellaneous = this.onChangeMiscellaneous.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      hrData: [],
      HRID: 0,
      Name: '',
      Designation: '',
      Requisition: '',
      Department: '',
      LineManager: 'Founder',
      Level: '',
      Salary: 0,
      MedAllownce: 0,
      RentAllownce: 0,
      Miscellaneous: 0,
      TotalSalary: 0,
      Depts: [],
      Desigs: [],
      HRS: [],
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

      axios.get('http://localhost:5000/Department/')
        .then(res => {
          if (res.data.length > 0) {
            this.setState({
              Depts: res.data
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://localhost:5000/Designation/')
          .then(res => {
            if (res.data.length > 0) {
              this.setState({
                Desigs: res.data
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })

  }

  onChangeID(e) {
    this.state.HRS.filter(hr => hr._id == e.target.value).map(hr => {
      this.setState({
        hrData: hr,
        HRID: e.target.value,
        Name: hr.Name,
        Department: hr.Department,
        Designation: hr.Designation,
        Level: hr.Level,
        LineManager: hr.LineManager,
        Salary: hr.Salary,
        MedAllownce: hr.MedAllownce,
        RentAllownce: hr.RentAllownce,
        Miscellaneous: hr.Miscellaneous,
        TotalSalary: hr.TotalSalary,
      })
    })
  }

  onChangeDepartment(e) {
    e.persist();
    this.setState({
      Department: e.target.value
    })
  }

  onChangeDesignation(e) {
    e.persist();
    this.setState({
      Designation: e.target.value
    })

    axios.get('http://localhost:5000/Hierarchy/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            Level: res.data.filter(lvl => lvl.Designation === e.target.value).map(lvl => lvl.Level)[0]
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeLineManager(e) {
    this.setState({
      LineManager: e.target.value
    })
  }

  onChangeSalary(e) {
    this.setState({
      Salary: Number(e.target.value),
      TotalSalary: this.state.TotalSalary + Number(e.target.value) - this.state.Salary
    })
  }

  onChangeMedAllownce(e) {
    this.setState({
      MedAllownce: Number(e.target.value),
      TotalSalary: this.state.TotalSalary + Number(e.target.value) - this.state.MedAllownce
    })
  }

  onChangeRentAllownce(e) {
    this.setState({
      RentAllownce: Number(e.target.value),
      TotalSalary: this.state.TotalSalary + Number(e.target.value) - this.state.RentAllownce
    })
  }

  onChangeMiscellaneous(e) {
    this.setState({
      Miscellaneous: Number(e.target.value),
      TotalSalary: this.state.TotalSalary + Number(e.target.value) - this.state.Miscellaneous
    })
  }

  onSubmit(e) {
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();
    
    const hr = {
    Requisition: this.state.hrData.Requisition,
    Name: this.state.hrData.Name,
    Department: this.state.Department,
    Designation: this.state.Designation,
    Level: this.state.Level,
    LineManager: this.state.LineManager,
    Image: this.state.hrData.Image,
    CNIC: this.state.hrData.CNIC,
    Salary: this.state.Salary,
    MedAllownce: this.state.MedAllownce,
    RentAllownce: this.state.RentAllownce,
    Miscellaneous: this.state.Miscellaneous,
    TotalSalary: this.state.TotalSalary,
    Date: date,
    Status: this.state.hrData.Status,
  }

    console.log(hr);

    axios.post('http://localhost:5000/HR/update/' + this.state.HRID, hr)
      .then(res => console.log(res.data));

      // alert('New HR succefully enrolled with HR ID: ' + this.state._id)
      e.preventDefault();

      var msg = document.getElementById("update")
      msg.textContent="HR is Updated. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/updatehr`);
      link.textContent = 'Refresh Page';
    
      msg.appendChild(link);
      // window.location = '/enrollhr';
    
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>HR Update Form</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>ID: </label>
          <select ref="userInput"
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
          <label>Name: </label>
          <input type="text"
              required
              className="form-control"
              defaultValue={this.state.Name}
              disabled = {true}
          />
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
                  this.state.Depts.map(dept => {
                    return <option key={dept.Name}>{dept.Name}</option>
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
                  this.state.Desigs.filter(dsgn => dsgn.Department == this.state.Department).map(dsgn => {
                    return <option key={dsgn.Name}>{dsgn.Name}</option>
                  })
                }
          </select>
        </div>
        <div className="form-group"> 
          <label>Level: </label>
          <input  type="text"
              required
              className="form-control"
              defaultValue={this.state.Level}
              disabled = {true}/>
        </div>
        <div className="form-group">
          <label>Line Manager: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.LineManager}
              onChange={this.onChangeLineManager}>
              <option>---Select Line Manager---</option>
              {
                this.state.HRS.filter(lvl => lvl.Level===this.state.Level-1 && lvl.Department===this.state.Department).map(function(user2) {
                  return <option 
                    key={user2.Name}
                    value={user2.Name}>{user2.Name}
                    </option>;
                })
              }
          </select>
        </div>
        <br/>
        <h6>Salary Package (Rs.)</h6>
        <div className="form-group"> 
          <label>Basic Salary: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.Salary}
              onChange={this.onChangeSalary}
          />
        </div>
        <div className="form-group"> 
          <label>Medical Allownce: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.MedAllownce}
              onChange={this.onChangeMedAllownce}
          />
        </div>
        <div className="form-group"> 
          <label>House Rent Allownce: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.RentAllownce}
              onChange={this.onChangeRentAllownce}
          />
        </div>
        <div className="form-group"> 
          <label>Miscellaneous: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.Miscellaneous}
              onChange={this.onChangeMiscellaneous}
          />
        </div>
        <div className="form-group"> 
          <label>Total Salary: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.TotalSalary}
              disabled = {true}
          />
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update HR" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="update"></div>
      </form>
    </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}