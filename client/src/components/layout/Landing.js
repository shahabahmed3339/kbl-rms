import React, { Component } from "react";
import { Link } from "react-router-dom";
import Blur from "react-blur";
import Background from "../../IT_management.jpg";
import Logo from '../../qc.png';
import "../auth/Login.css";

class Landing extends Component {
  render() {
    return (
      <Blur img={Background} blurRadius={10} enableStyles className="container container2 body2">
      <div className="bgimage2 text-center">
        <div className="row">
          <div className="col s8 offset-s2 bgcolor2">
              <img src={Logo} alt="Logo" style={{width: "300px"}}/>
            <h4 className="heading2">
              <b>Welcome to Quality Compliance 360</b>
            </h4>
            <br />
            <div style={{padding: "20px 0 50px 0"}}>
              <span>
              <Link  className="button2"
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
              >
                Register
              </Link>
              </span>
              <span style={{paddingLeft: "100px"}}>
              <Link  className="button2"
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  padding: "12px 24px"
                }}
              >
                Log In
              </Link>
              </span>
              <span style={{paddingLeft: "100px"}}>
              <Link  className="button2"
                to="/careers"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  padding: "12px 24px"
                }}
              >
                Careers
              </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      </Blur>
    );
  }
}

export default Landing;
