import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from '../main/PayrollMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/PayrollSidebar';
import PayrollProcess from '../payroll-process';
import PayrollCalculator from '../payroll-calculator';
import PayrollDeduction from '../payroll-deduction';

const PayrollManagement = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  }

  const closeSidebar = () => {
    setSidebarOpen(false);
  }

  return (
    <Router>
      <div className="container1">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
      <div className="main1">
      <Route path="/payrollmanagement" component={Main} />
      <Route path="/payrollprocess" component={PayrollProcess} />
      <Route path="/payrollcalculator" component={PayrollCalculator} />
      <Route path="/payrolldeduction" component={PayrollDeduction} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default PayrollManagement;
