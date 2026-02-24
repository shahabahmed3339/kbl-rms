import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class AssetCIAMark extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeAPID = this.onChangeAPID.bind(this);
    this.onChangeChecked = this.onChangeChecked.bind(this);
    this.onChangeConfidentiality = this.onChangeConfidentiality.bind(this);
    this.onChangeIntegrity = this.onChangeIntegrity.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);

    this.state = {
      _id: 1,
      _id1: 1,
      APID: 0,
      AsstID: null,
      AsstName: '',
      Category: '',
      SubCategory: '',
      Type: '',
      Department: '',
      Confidentiality: 0,
      Integrity: 0,
      Availability: 0,
      Mult: 0,
      Class: '',
      Class1: '',
      users2: [],
      depts: [],
      Assets: [],
      Assets1: [],
      CIAS: [],

    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/CIAMark/')
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            _id: Math.max(...response3.data.map(res => res._id)) + 1,
            CIAS: response3.data
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
      axios.get('http://localhost:5000/CIAMarkDepartment/')
        .then(response3 => {
          if (response3.data.length > 0) {
            this.setState({
              _id1: Math.max(...response3.data.map(res => res._id)) + 1
            })
          }
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

      axios.get('http://localhost:5000/CIA/')
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users2: response2.data.map(user2 => user2._id)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/AssetIssue/')
        .then(response1 => {
            this.setState({
              Assets1: response1.data
            })
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeDepartment(e){
    this.setState({
      Department: e.target.value
    })
    
  }

  onChangeAPID(e) {
    this.setState({
      APID: e.target.value,
      AsstID: null,
      AsstName: '',
      Category: '',
      SubCategory: '',
      Type: '',
    })

      axios.get('http://localhost:5000/Assets/' + e.target.value)
        .then(response1 => {
            this.setState({
              AsstID: response1.data._id,
              AsstName: response1.data.Name,
              Category: response1.data.Category,
              SubCategory: response1.data.SubCategory,
              Type: response1.data.Type
            })
        })
        .catch((error) => {
          console.log(error);
        })
  }

  onChangeChecked(e) {
    let newArray = [...this.state.Assets, e.target.value];
    if (this.state.Assets.includes(e.target.value)) {
      newArray = newArray.filter(val => val !== e.target.value);
    }
    this.setState({
      Assets: newArray,
    })
  }

  onChangeConfidentiality(e){
    this.setState({
      Confidentiality: e.target.value
    })

  }

  onChangeIntegrity(e){
    this.setState({
      Integrity: e.target.value
    })
    
  }

  onChangeAvailability(e){
    this.setState({
      Availability: e.target.value,
      Mult: this.state.Confidentiality * this.state.Integrity * e.target.value
    })
    if ((this.state.Confidentiality * this.state.Integrity * e.target.value) > 0 && (this.state.Confidentiality * this.state.Integrity * e.target.value) <= 25)
    {
      this.setState({
        Class: 'LBI'
      })
    }
    else if ((this.state.Confidentiality * this.state.Integrity * e.target.value) > 25 && (this.state.Confidentiality * this.state.Integrity * e.target.value) <= 75)
    {
      this.setState({
        Class: 'MBI'
      })
    }
    else
    {
      this.setState({
        Class: 'HBI'
      })
    }
  }

  onSubmit(e) {
    // alert('Your CIA is: ' + this.state.Mult + '\n\nYour Classification is: ' + this.state.Class)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    const ciamark = {
      _id: this.state._id,
      APID: this.state.APID,
      APType: 'Asset',
      Confidentiality: this.state.Confidentiality,
      Integrity: this.state.Integrity,
      Availability: this.state.Availability,
      Mult: this.state.Mult,
      Class: this.state.Class,
      Date: date
    }

    console.log(ciamark);

    axios.post('http://localhost:5000/CIAMark/add', ciamark)
      .then(res => console.log(res.data));

    var msg = document.getElementById("submitcia")
    msg.textContent="Your CIA is Marked. Click to "
    const link = document.createElement("a");
  
    link.setAttribute('href', `/assetciamark`);
    link.textContent = 'Mark CIA';
  
    msg.appendChild(link);
    // window.location = '/assetciamark';
  }

  onSubmit1(e) {
    // alert('Your CIA is: ' + this.state.Mult + '\n\nYour Classification is: ' + this.state.Class)
    e.preventDefault();

    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();

    var id = this.state._id-1;
    for  (var i=0; i<this.state.Assets.length; i++)
    {
      id = id+1;
      const ciamark = {
        _id: id,
        APID: this.state.Assets[i],
        APType: 'Asset',
        Confidentiality: this.state.Confidentiality,
        Integrity: this.state.Integrity,
        Availability: this.state.Availability,
        Mult: this.state.Mult,
        Class: this.state.Class,
        Date: date
      }
  
      console.log(ciamark);

      axios.post('http://localhost:5000/CIAMark/add', ciamark)
        .then(res => console.log(res.data));
    }

    var msg = document.getElementById("submitcia1")
    msg.textContent="Your CIA is Marked. Click to "
    const link = document.createElement("a");
  
    link.setAttribute('href', `/assetciamark`);
    link.textContent = 'Mark CIA';
  
    msg.appendChild(link);

    // window.location = '/assetciamark';
  }

  render() {
    return (
    // <div className="form-box1">
    <div className="form-box1">
    <UnlockAccess request={'Admin'}>

      <Tabs>
      <TabList>
        <Tab>Category Wise</Tab>
        <Tab>Department Wise</Tab>
      </TabList>

      <TabPanel>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onSubmit}>
      <div className="form-box">
        <div className="form-group"> 
          <label>Enter Asset ID: </label>
          <input type="number"
              required
              className="form-control"
              value={this.state.APID}
              onChange={this.onChangeAPID}>
          </input>
        </div>
        <div className="form-group"> 
          <label>Mark CIA: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Confidentiality}
              onChange={this.onChangeConfidentiality}>
                <option>---Confidentiality---</option>
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
          <label></label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Integrity}
              onChange={this.onChangeIntegrity}>
                <option>---Integrity---</option>
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
          <label></label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Availability}
              onChange={this.onChangeAvailability}>
                <option>---Availability---</option>
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

        
        <div className="form-group">
          <input type="submit" value="Mark CIA" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="submitcia"></div>
      </form>
      </div>

      <div className="col">
        <div className="form-group">
          <table id="rept">
            <thead>
            <tr>
              <th style={{width: 80}}>Asset ID</th>
              <th style={{width: 200}}>Asset Name</th>
              <th style={{width: 200}}>Asset Type</th>
              <th style={{width: 200}}>Asset Category</th>
              <th style={{width: 200}}>Asset Sub-Category</th>
              <th style={{width: 200}}>CIA Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style={{width: 80}}>{this.state.AsstID}</td>
              <td style={{width: 200}}>{this.state.AsstName}</td>
              <td style={{width: 200}}>{this.state.Type}</td>
              <td style={{width: 200}}>{this.state.Category}</td>
              <td style={{width: 200}}>{this.state.SubCategory}</td>
              <td style={{width: 200}}>{
                this.state.CIAS.filter(asst => asst._id === 
                  Math.max(...this.state.CIAS.filter(asst => asst.APID === this.state.AsstID && asst.APType === 'Asset').map(asst => {
                    return asst._id                    
                  }))).map(asst => {
                    return asst.Class
                })
              }</td>
            </tr>
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
      </div>
      </div>
      </TabPanel>

      <TabPanel>
      <div className="row">
      <div className="col">
      <form onSubmit={this.onSubmit1}>
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
          <label>Mark CIA: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Confidentiality}
              onChange={this.onChangeConfidentiality}>
                <option>---Confidentiality---</option>
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
          <label></label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Integrity}
              onChange={this.onChangeIntegrity}>
                <option>---Integrity---</option>
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
          <label></label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Availability}
              onChange={this.onChangeAvailability}>
                <option>---Availability---</option>
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

        
        <div className="form-group">
          <input type="submit" value="Mark CIA" className="btn navbar-gradient navlink-custom" />
        </div>
        <div className="alert" id="submitcia1"></div>
      </form>
      </div>
      
      <div className="col">
        <div className="form-group">
          <table id="rept">
            <thead>
            <tr>
              <th style={{width: 80}}>Action</th>
              <th style={{width: 200}}>Asset Category</th>
              <th style={{width: 200}}>Asset Sub-Category</th>
              <th style={{width: 200}}>Employee Name</th>
              <th style={{width: 200}}>Designation</th>
              <th style={{width: 200}}>CIA Status</th>
            </tr>
            </thead>
            <tbody>
              {this.state.Assets1.filter(asst1 => asst1.Department === this.state.Department).map((asst1, index) => {
                return <tr key={index}>
                  <td style={
                    {width: 80}}>
                  <input type="checkbox"
                  value={asst1.IssuedID.split("-")[0]}
                  onChange={this.onChangeChecked
                  }/></td>
                  <td style={{width: 200}}>{asst1.Category}</td>
                  <td style={{width: 200}}>{asst1.SubCategory}</td>
                  <td style={{width: 200}}>{asst1.IssuedTo}</td>
                  <td style={{width: 200}}>{asst1.Designation}</td>
                  <td style={{width: 200}}>{
                    this.state.CIAS.filter(asst2 => asst2._id === 
                      Math.max(...this.state.CIAS.filter(asst => asst.APID == asst1.IssuedID.split("-")[0] && asst.APType === 'Asset').map(asst => {
                        return asst._id                    
                      }))).map(asst2 => {
                        return asst2.Class
                    })
                  }</td>
                </tr>
              })}
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