import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from '../main/ObjectiveMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/ObjectiveSidebar';

import SetVision from "../vision.component";
import SetObjective from "../objective.component";
import ObjectiveReport from "../objective-report.component";
import SetGoal from '../goal.component';

const ObjectiveManagement = () => {

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
      <Route path="/objectivemanagement" component={Main} />
      <Route path="/setvision" component={SetVision} />
      <Route path="/setgoal" component={SetGoal} />
      <Route path="/setobjective" component={SetObjective} />
      <Route path="/objectivereport" component={ObjectiveReport} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default ObjectiveManagement;
