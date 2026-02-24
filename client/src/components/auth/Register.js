import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Logo from '../../qc.png';
import Blur from "react-blur";
import Background from "../../IT_management.jpg";
import "./Login.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      role: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Blur img={Background} blurRadius={10} enableStyles className="container container2 body2">
      <div className="bgimage2">
        <div className="bgcolor2" style={{marginRight: "100px"}}>
          <h5>Upcoming Products</h5>
        </div>
          <div className="bgcolor2" style={{marginRight: "100px"}}>
            <Link to="/" className="btn2">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="text-center">
              <img src={Logo} alt="Logo" style={{width: "150px"}}/>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="p2">
                Already have an account? <Link to="/login" className="btn2">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit} className="form2">
              <div className="input-field s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  placeholder="Name"
                  className={classnames("input2", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name"></label>
                <div className="text-danger span2">{errors.name}</div>
              </div>
              <div className="input-field s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("input2", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email"></label>
                <div className="text-danger span2">{errors.email}</div>
              </div>
              <div className="input-field s12">
                <select
                  onChange={this.onChange}
                  value={this.state.role}
                  error={errors.role}
                  id="role"
                  type="role"
                  placeholder="Role"
                  className={classnames("input2", {
                    invalid: errors.role
                  })}>
                    <option>---Select Role---</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>User</option>
                  </select>
                <label htmlFor="role"></label>
                <div className="text-danger span2">{errors.role}</div>
              </div>
              <div className="input-field s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("input2", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password"></label>
                <div className="text-danger span2">{errors.password}</div>
              </div>
              <div className="input-field s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("input2", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2"></label>
                <div className="text-danger span2">{errors.password2}</div>
              </div>
              <div className="col s12">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="button2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        <div className="bgcolor2">
          <h5>News Updates</h5>
        </div>
      </div>
      </Blur>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
