import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import Navbar1 from "./components/navbar1.component"
import EnrollHR from "./components/enroll-hr.component";
import EnrollAsset from "./components/enroll-asset.component";
import AssetIssue from "./components/asset-issue.component";
import EnrollProcess from "./components/enroll-process.component";
import AssetCIAMark from "./components/asset-cia-mark.component";
import ProcessCIAMark from "./components/process-cia-mark.component";
import RiskAssessment from "./components/risk-assessment.component";
import RiskMitigation from "./components/risk-mitigation.component";
import ReportDownload from "./components/report-download.component";

import Image1 from "./Risk Management.jpg";

function App() {
  return (
    <Router>
      <div className="container" style={{padding: "2px"}}></div>
      <div className="container bg-gradient">
      <Navbar1 />
      <Navbar />
      <br/>
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
    </Router>
  );
}

export default App;
