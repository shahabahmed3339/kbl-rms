import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';

export default class AssetIssue extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeDesignation = this.onChangeDesignation.bind(this);
    this.onChangeIssuedTo = this.onChangeIssuedTo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 1,
      IssuedID: '',
      Name: '',
      Category: '',
      SubCategory: '',
      Type: '',
      Department: '',
      Designation: '',
      IssuedTo: '',
      users1: [],
      users2: [],
      users3: [],
      users4: [],
      users5: [],
      users6: [],
      users7: [],
      users8: [],
      users9: [],
      users10: [],
      users11: [],
      users12: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/AssetIssue/')
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

        axios.get('http://localhost:5000/AssetType/')
          .then(response3 => {
            if (response3.data.length > 0) {
              this.setState({
                users4: response3.data.map(user4 => user4.Name)
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })

      axios.get('http://localhost:5000/Department/')
      .then(response5 => {
        if (response5.data.length > 0) {
          this.setState({
            users7: response5.data.map(user7 => user7.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    e.persist();
    this.setState({
      Name: e.target.value
    })

    axios.get('http://localhost:5000/Assets/')
      .then(response11 => {
        if (response11.data.length > 0) {
          this.setState({
            users11: response11.data.filter(asst => asst.Name === e.target.value).map(user11 => user11._id)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeType(e) {
    e.persist();
    this.setState({
      Type: e.target.value
    })

    axios.get('http://localhost:5000/AssetCategory/')
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users3: response2.data.filter(catg => catg.Type === e.target.value).map(user3 => user3.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeCategory(e) {
    e.persist();
    this.setState({
      Category: e.target.value
    })

    axios.get('http://localhost:5000/AssetSubCategory/')
      .then(response10 => {
        if (response10.data.length > 0) {
          this.setState({
            users10: response10.data.filter(subct => subct.Category === e.target.value).map(user10 => user10.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeSubCategory(e) {
    e.persist();
    this.setState({
      SubCategory: e.target.value
    })

    axios.get('http://localhost:5000/Assets/')
      .then(response1 => {
        if (response1.data.length > 0) {
          this.setState({
            users2: response1.data.filter(asst => asst.SubCategory === e.target.value).map(user2 => user2.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeDepartment(e) {
    e.persist();
    this.setState({
      Department: e.target.value
    })

    axios.get('http://localhost:5000/Designation/')
    .then(response6 => {
      if (response6.data.length > 0) {
        this.setState({
          users8: response6.data.filter(dsgn => dsgn.Department === e.target.value).map(user8 => user8.Name)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeDesignation(e) {
    e.persist();
    this.setState({
      Designation: e.target.value
    })

    axios.get('http://localhost:5000/HR/')
    .then(response4 => {
      if (response4.data.length > 0) {
        this.setState({
          users6: response4.data.filter(hrs => hrs.Designation === e.target.value).map(user6 => user6.Name)
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeIssuedTo(e) {
    e.persist()
    this.setState({
      IssuedTo: e.target.value
    })

      axios.get('http://localhost:5000/HR/')
      .then(response12 => {
        if (response12.data.length > 0) {
          this.setState({
            users12: response12.data.filter(hrss => hrss.Name === e.target.value).map(user12 => user12._id)
          })
        }
        console.log(response12.data.filter(hrss => hrss.Name === e.target.value).map(user12 => user12._id))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSubmit(e) {
    
    // alert('Transaction ID : ' + this.state._id + '\nIssuance process is being with held between ID\'s (AST-HR): '+ this.state.users11.map(function(user11) { return user11; }) + "-" + this.state.users12.map(function(user12) { return user12; }))
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const asset = {
      _id: this.state._id,
      IssuedID: this.state.users11.map(function(user11) { return user11; }) + "-" + this.state.users12.map(function(user12) { return user12; }),
      Name: this.state.Name,
      Category: this.state.Category,
      SubCategory: this.state.SubCategory,
      Type: this.state.Type,
      Department: this.state.Department,
      Designation: this.state.Designation,
      IssuedTo: this.state.IssuedTo,
      Date: date
    }

    console.log(asset);

    axios.post('http://localhost:5000/AssetIssue/add', asset)
      .then(res => console.log(res.data));

      var msg = document.getElementById("asset")
      msg.textContent="Your Asset is Issued. Click to "
      const link = document.createElement("a");
    
      link.setAttribute('href', `/assetciamark`);
      link.textContent = 'Mark CIA';
    
      msg.appendChild(link);

    // window.location = '/assetissue';
  }

  render() {
    return (
    // <div className="form-box1">
    <div className="row">
    <div className="col form-box1">
    <UnlockAccess request={'Admin'}>
      <h2>Asset Issuance Form</h2>
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <h5 style={{color: 'green'}}><u>Asset Info</u></h5>
        <div className="form-group">
          <label>Asset Type: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Type}
              onChange={this.onChangeType}>
              <option>---Select Asset Type---</option>
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
          <label>Asset Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Category}
              onChange={this.onChangeCategory}>
              <option>---Select Asset Category---</option>
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
          <label>Asset Sub-Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.SubCategory}
              onChange={this.onChangeSubCategory}>
              <option>---Select Asset Sub-Category---</option>
              {
                this.state.users10.map(function(user10) {
                  return <option 
                    key={user10}
                    value={user10}>{user10}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Asset Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}>
              <option>---Select Asset Name---</option>
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
        </div>
        <div className="form-box">
        <h5 style={{color: 'green'}}><u>Issued To</u></h5>
        <div className="form-group">
          <label>Department: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Department}
              onChange={this.onChangeDepartment}>
              <option>---Select Department---</option>
              {
                this.state.users7.map(function(user7) {
                  return <option 
                    key={user7}
                    value={user7}>{user7}
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
                this.state.users8.map(function(user8) {
                  return <option 
                    key={user8}
                    value={user8}>{user8}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Issued To: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.IssuedTo}
              onChange={this.onChangeIssuedTo}>
              <option>---Select HR Name---</option>
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
        </div>

        <div className="form-group">
          <input type="submit" value="Issue Asset" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="asset"></div>
      </form>
    </UnlockAccess>

    <UnlockAccess request={'User'}>
      Page Not Available...
    </UnlockAccess>
      </div>
      <div className="col">
        Chart Area
      </div>
    </div>
    )
  }
}