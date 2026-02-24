import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Logo from '../../qc.png';
import Blur from "react-blur";
import Background from "../../IT_management.jpg";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
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
                <b>Login</b> below
              </h4>
              <p className="p2">
                Don't have an account? <Link to="/register" className="btn2">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit} className="form2">
              <div className="input-field s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("input2", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email"></label>
                <div className="text-danger span2">
                  {errors.email}
                  {errors.emailnotfound}
                </div>
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
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password"></label>
                <div className="text-danger span2">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>
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
                  Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
