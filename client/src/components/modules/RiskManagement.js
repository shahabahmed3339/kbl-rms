import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from '../main/RiskMain';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/RiskSidebar';

import AssetCIAMark from "../asset-cia-mark.component";
import ProcessCIAMark from "../process-cia-mark.component";
import RiskAssessment from "../risk-assessment.component";
import RiskMitigation from "../risk-mitigation.component";
import RiskManagementReport from "../risk-management-report.component";
import RiskAssessmentDeptWise from '../risk-assessment-dept-wise.component';
import RiskManagementProgram from '../risk-management-program.component';
import RiskMitigationAsset from '../risk-mitigation-asset.component';

const RiskManagement = () => {

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
      <Route path="/riskmanagement" component={Main} />
      <Route path="/riskmanagementprogram" component={RiskManagementProgram} />
      <Route path="/assetciamark" component={AssetCIAMark} />
      <Route path="/processciamark" component={ProcessCIAMark} />
      <Route path="/riskassessment" component={RiskAssessment} />
      <Route path="/setrisklevel/:id" component={RiskAssessmentDeptWise} />
      <Route path="/riskmitigation" component={RiskMitigation} />
      <Route path="/controlrisk/:id:Risk_Name" component={RiskMitigationAsset} />
      <Route path="/riskmanagementreport" component={RiskManagementReport} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default RiskManagement;
