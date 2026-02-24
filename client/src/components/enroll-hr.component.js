import React, { Component } from 'react';
import axios from 'axios';
import './Custom.css';
import UnlockAccess from './roles/UnlockAccess';
import CameraFeed from './Camera/CameraFeed';

export default class EnrollHR extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRequisition = this.onChangeRequisition.bind(this);
    // this.onChangeDepartment = this.onChangeDepartment.bind(this);
    // this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeLineManager = this.onChangeLineManager.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeMedAllownce = this.onChangeMedAllownce.bind(this);
    this.onChangeRentAllownce = this.onChangeRentAllownce.bind(this);
    this.onChangeMiscellaneous = this.onChangeMiscellaneous.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      Name: '',
      Designation: '',
      Requisition: '',
      Department: '',
      LineManager: 'Founder',
      Level: '',
      Image: '',
      Image1: '',
      CNIC: '',
      Salary: 0,
      MedAllownce: 0,
      RentAllownce: 0,
      Miscellaneous: 0,
      TotalSalary: 0,
      users1: [],
      users2: [],
      users3: [],
      reqs: [],
      Applicants: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HR/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            users3: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/Designation/')
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

      axios.get('http://localhost:5000/Requisition/')
        .then(response1 => {
          if (response1.data.length > 0) {
            this.setState({
              reqs: response1.data
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value
    })
  }

  onChangeRequisition(e) {
    e.persist();
    this.setState({
      Requisition: e.target.value,
      Designation: e.target.value,
      Department: this.state.users1.filter(dsgn => dsgn.Name == e.target.value).map(dept => dept.Department)
    })

    axios.get('http://localhost:5000/Application/')
      .then(response1 => {
        if (response1.data.length > 0) {
          this.setState({
            Applicants: response1.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/Hierarchy/')
      .then(response0 => {
        if (response0.data.length > 0) {
          this.setState({
            Level: response0.data.filter(lvl => lvl.Designation === e.target.value).map(user0 => user0.Level)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // onChangeDepartment(e) {
  //   e.persist();
  //   this.setState({
  //     Department: e.target.value
  //   })

  //   axios.get('http://localhost:5000/Designation/')
  //   .then(response2 => {
  //     if (response2.data.length > 0) {
  //       this.setState({
  //         users2: response2.data.filter(dsgn => dsgn.Department === e.target.value).map(user2 => user2.Name)
  //       })
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  // onChangeDesignation(e) {
  //   e.persist();
  //   this.setState({
  //     Designation: e.target.value
  //   })

  //   axios.get('http://localhost:5000/Hierarchy/')
  //     .then(response0 => {
  //       if (response0.data.length > 0) {
  //         this.setState({
  //           Level: response0.data.filter(lvl => lvl.Designation === e.target.value).map(user0 => user0.Level)
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  onChangeLineManager(e) {
    this.setState({
      LineManager: e.target.value
    })
  }

  onChangeImage(e) {
    this.setState({
      CNIC: e.target.files[0],
      Image1: URL.createObjectURL(e.target.files[0])
    })
  }

  uploadImage(img) {
    this.setState({
      Image: img
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

    // const hr = {
    //   _id: this.state._id,
    //   Name: this.state.Name,
    //   Department: this.state.Department,
    //   Designation: this.state.Designation,
    //   Level: this.state.Level[0],
    //   Image: this.state.Image,
    // }
    
    const hr = new FormData()
    hr.append('_id', this.state._id)
    hr.append('Requisition', this.state.Requisition)
    hr.append('Name', this.state.Name)
    hr.append('Department', this.state.Department)
    hr.append('Designation', this.state.Designation)
    hr.append('Level', this.state.Level)
    hr.append('LineManager', this.state.LineManager)
    hr.append('Image', this.state.Image)
    hr.append('CNIC', this.state.CNIC)
    hr.append('Salary', this.state.Salary)
    hr.append('MedAllownce', this.state.MedAllownce)
    hr.append('RentAllownce', this.state.RentAllownce)
    hr.append('Miscellaneous', this.state.Miscellaneous)
    hr.append('TotalSalary', this.state.TotalSalary)

    console.log(hr);

    axios.post('http://localhost:5000/HR/add', hr)
      .then(res => console.log(res.data));

      // alert('New HR succefully enrolled with HR ID: ' + this.state._id)
      e.preventDefault();

      var msg = document.getElementById("enroll")
      msg.textContent="HR is enrolled. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `http://localhost:8000/enroll`);
      link.textContent = 'Enroll for Attendance';
    
      msg.appendChild(link);
      // window.location = '/enrollhr';
    
  }

  render() {
    return (
      <div className="row">
      <div className="col form-box1">
      <h3>HR Enrollment Form</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Requisition: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Requisition}
              onChange={this.onChangeRequisition}>
                <option>---Select Requisition---</option>
              {
                this.state.reqs.map(function(req, i) {
                  return <option 
                    key={i}
                    value={req.Designation}>{req.Designation}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}>
                <option>---Select Name---</option>
              {
                this.state.Applicants.filter(appl => appl.Designation === this.state.Requisition && appl.Status === 'Approved').map(function(appl) {
                  return <option 
                    key={appl.Name}
                    value={appl.Name}>{appl.Name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Department: </label>
          <input type="text"
              required
              className="form-control"
              defaultValue={this.state.Department}
              disabled = {true}
          />
        </div>
        <div className="form-group">
          <label>Designation: </label>
          <input type="text"
              required
              className="form-control"
              defaultValue={this.state.Designation}
              disabled = {true}
          />
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
                this.state.users3.filter(lvl => lvl.Level===this.state.Level-1 && lvl.Department===this.state.Department).map(function(user2) {
                  return <option 
                    key={user2.Name}
                    value={user2.Name}>{user2.Name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Capture Image: </label>
            <CameraFeed sendFile={this.uploadImage} />
        </div>
        <div className="form-group"> 
          <label>Insert CNIC: </label>
          <input type="file"
              required
              className="form-control"
              onChange={this.onChangeImage} />
        </div>
        <div className="form-group"> 
          <label></label>
              <img src={this.state.Image1} style={{width: '200px', margin: '10px 50px 0 0'}}/>
        </div>
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
          <input type="submit" value="Enroll HR" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="enroll"></div>
      </form>
    </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}