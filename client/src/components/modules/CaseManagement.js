import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from '../main/CaseMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/CaseSidebar';
import CaseReport from '../case-report.component';
import Reportcase from '../report-case.component';

const CaseManagement = () => {

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
      <Route path="/casemanagement" component={Main} />
      <Route path="/casereport" component={CaseReport} />
      <Route path="/reportcase/:id" component={Reportcase} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default CaseManagement;
