import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

import EnrollHR from "./components/enroll-hr.component";
import EnrollAsset from "./components/enroll-asset.component";
import AssetIssue from "./components/asset-issue.component";
import EnrollProcess from "./components/enroll-process.component";
import AssetCIAMark from "./components/asset-cia-mark.component";
import ProcessCIAMark from "./components/process-cia-mark.component";
import RiskAssessment from "./components/risk-assessment.component";
import RiskMitigation from "./components/risk-mitigation.component";
import ReportDownload from "./components/report-download.component";

const App = () => {

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
      <Route path="/dashboard" component={Main} />
      <Route path="/enrollhr" component={EnrollHR} />
      <Route path="/enrollasset" component={EnrollAsset} />
      <Route path="/assetissue" component={AssetIssue} />
      <Route path="/enrollprocess" component={EnrollProcess} />
      <Route path="/assetciamark" component={AssetCIAMark} />
      <Route path="/processciamark" component={ProcessCIAMark} />
      <Route path="/riskassessment" component={RiskAssessment} />
      <Route path="/riskmitigation" component={RiskMitigation} />
      <Route path="/reportdownload" component={ReportDownload} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default App;
