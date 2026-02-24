import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from '../main/AttendanceMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/AttendanceSidebar';
import DurationReport from '../duration-report.component';
import MonthlyReport from '../monthly-report';

const AttendanceReport = () => {

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
      <Route path="/attendancereport" component={Main} />
      <Route path="/durationreport" component={DurationReport} />
      <Route path="/monthlyreport" component={MonthlyReport} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default AttendanceReport;
