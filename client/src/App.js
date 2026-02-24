import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";
import RiskManagement from "./components/modules/RiskManagement";
import ObjectiveManagement from "./components/modules/ObjectiveManagement";
import HRManagement from "./components/modules/HRManagement";
import AssetManagement from "./components/modules/AssetManagement";
import ProcessManagement from "./components/modules/ProcessManagement";
// import RoleBasedRouting from "./components/roles/RoleBasedRouting";
import Main from "./components/main/Main";
import BudgetManagement from "./components/modules/BudgetManagement";
import Logs from "./components/Logs/Logs";
import Careers from "./components/careers.component";
import Application from "./components/application.component";
import CaseManagement from "./components/modules/CaseManagement";
import AttendanceReport from "./components/modules/AttendanceManagement";
import PayrollManagement from "./components/modules/PayrollManagement";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/careers" component={Careers} />
            <Route exact path="/apply/:Designation" component={Application} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Main}/>
              <PrivateRoute path="/riskmanagement" component={RiskManagement} />
              <PrivateRoute path="/objectivemanagement" component={ObjectiveManagement} />
              <PrivateRoute path="/hrmanagement" component={HRManagement} />
              <PrivateRoute path="/assetmanagement" component={AssetManagement} />
              <PrivateRoute path="/processmanagement" component={ProcessManagement} />
              <PrivateRoute path="/pool" component={HRManagement} />
              <PrivateRoute path="/shortlist" component={HRManagement} />
              <PrivateRoute path="/techschedule/:Name" component={HRManagement} />
              <PrivateRoute path="/technicalevaluation" component={HRManagement} />
              <PrivateRoute path="/techevaluation/:Name" component={HRManagement} />
              <PrivateRoute path="/hrevaluation" component={HRManagement} />
              <PrivateRoute path="/hrevaluationform/:Name" component={HRManagement} />
              <PrivateRoute path="/hrschedule/:Name" component={HRManagement} />
              <PrivateRoute path="/verification" component={HRManagement} />
              <PrivateRoute path="/selection" component={HRManagement} />
              <PrivateRoute path="/enrollhr" component={HRManagement} />
              <PrivateRoute path="/updatehr" component={HRManagement} />
              <PrivateRoute path="/addlevel" component={HRManagement} />
              <PrivateRoute path="/hierarchy" component={HRManagement} />
              <PrivateRoute path="/jobdescription" component={HRManagement} />
              <PrivateRoute path="/organogram" component={HRManagement} />
              <PrivateRoute path="/reportingorganogram" component={HRManagement} />
              <PrivateRoute path="/requisition" component={HRManagement} />
              <PrivateRoute path="/approval" component={HRManagement} />
              <PrivateRoute path="/action" component={HRManagement} />
              <PrivateRoute path="/requested" component={HRManagement} />
              <PrivateRoute path="/editrequisition" component={HRManagement} />
              <PrivateRoute path="/enrollasset" component={AssetManagement} />
              <PrivateRoute path="/assetissue" component={AssetManagement} />
              <PrivateRoute path="/enrollprocess" component={ProcessManagement} />
              <PrivateRoute path="/riskmanagementprogram" component={RiskManagement} />
              <PrivateRoute path="/assetciamark" component={RiskManagement} />
              <PrivateRoute path="/processciamark" component={RiskManagement} />
              <PrivateRoute path="/riskassessment" component={RiskManagement} />
              <PrivateRoute path="/setrisklevel/:id" component={RiskManagement} />
              <PrivateRoute path="/riskmitigation" component={RiskManagement} />
              <PrivateRoute path="/controlrisk/:id:Risk_Name" component={RiskManagement} />
              <PrivateRoute path="/riskmanagementreport" component={RiskManagement} />
              <PrivateRoute path="/setvision" component={ObjectiveManagement} />
              <PrivateRoute path="/setgoal" component={ObjectiveManagement} />
              <PrivateRoute path="/setobjective" component={ObjectiveManagement} />
              <PrivateRoute path="/objectivereport" component={ObjectiveManagement} />
              <PrivateRoute path="/processdocumentation" component={ProcessManagement} />
              <PrivateRoute path="/writeprocess" component={ProcessManagement} />
              <PrivateRoute path="/budgetmanagement" component={BudgetManagement} />
              <PrivateRoute path="/casemanagement" component={CaseManagement} />
              <PrivateRoute path="/casereport" component={CaseManagement} />
              <PrivateRoute path="/reportcase/:id" component={CaseManagement} />
              <PrivateRoute path="/logs" component={Logs} />
              <PrivateRoute path="/attendancereport" component={AttendanceReport} />
              <PrivateRoute path="/durationreport" component={AttendanceReport} />
              <PrivateRoute path="/monthlyreport" component={AttendanceReport} />
              <PrivateRoute path="/payrollmanagement" component={PayrollManagement} />
              <PrivateRoute path="/payrollcalculator" component={PayrollManagement} />
              <PrivateRoute path="/payrollprocess" component={PayrollManagement} />
              <PrivateRoute path="/payrolldeduction" component={PayrollManagement} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
