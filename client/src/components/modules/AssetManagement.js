import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/AssetSidebar';

import EnrollAsset from "../enroll-asset.component";
import AssetIssue from "../asset-issue.component";
import Main from '../main/AssetMain';

const AssetManagement = () => {

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
      <Route path="/assetmanagement" component={Main} />
      <Route path="/enrollasset" component={EnrollAsset} />
      <Route path="/assetissue" component={AssetIssue} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default AssetManagement;
