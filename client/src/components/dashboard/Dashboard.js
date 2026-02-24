import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from '../main/Main';
import Navbar from '../navbar/Navbar';

import RiskManagement from "../modules/RiskManagement";
import ObjectiveManagement from "../modules/ObjectiveManagement";
import HRManagement from "../modules/HRManagement";
import AssetManagement from "../modules/AssetManagement";
import ProcessManagement from "../modules/ProcessManagement";

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  }

  const closeSidebar = () => {
    setSidebarOpen(false);
  }

  return (
    <Router>
      <div className="">
      <Route path="/dashboard" component={Main} />
      <Route path="/riskmanagement" component={RiskManagement} />
      <Route path="/objectivemanagement" component={ObjectiveManagement} />
      <Route path="/hrmanagement" component={HRManagement} />
      <Route path="/assetmanagement" component={AssetManagement} />
      <Route path="/processmanagement" component={ProcessManagement} />
      </div>
    </Router>
  );
}

export default Dashboard;
