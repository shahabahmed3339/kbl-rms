import React, { Component } from 'react';
import axios from 'axios';
import UnlockAccess from './roles/UnlockAccess';

export default class EnrollAsset extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      _id: 0,
      Name: '',
      Category: '',
      SubCategory: '',
      Type: '',
      users1: [],
      users2: [],
      users3: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Assets/')
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
      .then(response2 => {
        if (response2.data.length > 0) {
          this.setState({
            users2: response2.data.map(user2 => user2.Name)
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

  onChangeType(e) {
    e.persist();
    this.setState({
      Type: e.target.value
    })

    axios.get('http://localhost:5000/AssetCategory/')
      .then(response1 => {
        if (response1.data.length > 0) {
          this.setState({
            users1: response1.data.filter(catg => catg.Type === e.target.value).map(user1 => user1.Name)
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
      .then(response3 => {
        if (response3.data.length > 0) {
          this.setState({
            users3: response3.data.filter(subct => subct.Category === e.target.value).map(user3 => user3.Name)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeSubCategory(e) {
    this.setState({
      SubCategory: e.target.value
    })
  }

  onSubmit(e) {
    alert('New asset is enrolled successfully with asset ID : ' + this.state._id)
    e.preventDefault();

    const asset = {
      _id: this.state._id,
      Name: this.state.Name,
      Category: this.state.Category,
      SubCategory: this.state.SubCategory,
      Type: this.state.Type
    }

    console.log(asset);

    axios.post('http://localhost:5000/Assets/add', asset)
      .then(res => console.log(res.data));

    window.location = '/enrollasset';
  }

  render() {
    return (
    <div>
    <UnlockAccess request={'User'}>
      <h3>Asset Enrollment Form</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Type: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Type}
              onChange={this.onChangeType}>
              <option>---Select Type---</option>
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
          <label>Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.Category}
              onChange={this.onChangeCategory}>
              <option>---Select Category---</option>
              {
                this.state.users1.map(function(user1) {
                  return <option 
                    key={user1}
                    value={user1}>{user1}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Sub Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.SubCategory}
              onChange={this.onChangeSubCategory}>
              <option>---Select Sub-Category---</option>
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
          <input type="submit" value="Enroll Asset" className="btn navbar-gradient navlink-custom" />
        </div>
      </form>
    </UnlockAccess>

    <UnlockAccess request={'Admin'}>
      Page Not Available...
    </UnlockAccess>
    </div>
    )
  }
}