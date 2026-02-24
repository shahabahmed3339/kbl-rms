import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from '../main/ProcessMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/ProcessSidebar';

import EnrollProcess from "../enroll-process.component";
import ProcessDocumentation from '../process-documentation.component';
import Dictaphone from "../dictaphone.component";

const ProcessManagement = () => {

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
      <Route path="/processmanagement" component={Main} />
      <Route path="/enrollprocess" component={EnrollProcess} />
      <Route path="/processdocumentation" component={ProcessDocumentation} />
      <Route path="/writeprocess" component={Dictaphone} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default ProcessManagement;
