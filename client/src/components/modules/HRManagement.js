import {useState} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/HRSidebar';

import EnrollHR from "../enroll-hr.component";
import Hierarchy from "../hierarchy.component";
import Main from '../main/HRMain';
import Requisition from '../requisition.component';
import Approval from '../approval.component';
import Action from '../action.component';
import Requested from '../requested.component';
import EditRequisition from '../edit-requisition.component';
import { JobDescription } from '../job-description-component';
import Organogram from '../organogram-component';
import ReportingOrganogram from '../reporting-organogram-component';
import Pool from '../pool.component';
import ShortList from '../shortlist-component';
import TechnicalEvaluation from '../tech-evaluation.component';
import HREvaluation from '../hr-evaluation.component';
import Verification from '../verification.component';
import Selection from '../selection.component';
import TechSchedule from '../tech-schedule.component';
import AddLevel from '../level.component';
import TechEvaluation from '../tech-evaluation-form.component';
import HREvaluationForm from '../hr-evaluation-form.component';
import HRSchedule from '../hr-schedule.component';
import UpdateHR from '../update-hr.component';

const HRManagement = () => {

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
      <Route path="/hrmanagement" component={Main} />
      <Route path="/pool" component={Pool} />
      <Route path="/shortlist" component={ShortList} />
      <Route path="/techschedule/:Name" component={TechSchedule} />
      <Route path="/technicalevaluation" component={TechnicalEvaluation} />
      <Route path="/techevaluation/:Name" component={TechEvaluation} />
      <Route path="/hrevaluation" component={HREvaluation} />
      <Route path="/hrevaluationform/:Name" component={HREvaluationForm} />
      <Route path="/hrschedule/:Name" component={HRSchedule} />
      <Route path="/verification" component={Verification} />
      <Route path="/selection" component={Selection} />
      <Route path="/enrollhr" component={EnrollHR} />
      <Route path="/updatehr" component={UpdateHR} />
      <Route path="/addlevel" component={AddLevel} />
      <Route path="/hierarchy" component={Hierarchy} />
      <Route path="/jobdescription" component={JobDescription} />
      <Route path="/organogram" component={Organogram} />
      <Route path="/reportingorganogram" component={ReportingOrganogram} />
      <Route path="/requisition" component={Requisition} />
      <Route path="/approval" component={Approval} />
      <Route path="/action/:id" component={Action} />
      <Route path="/requested" component={Requested} />
      <Route path="/editrequisition/:id" component={EditRequisition} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default HRManagement;
