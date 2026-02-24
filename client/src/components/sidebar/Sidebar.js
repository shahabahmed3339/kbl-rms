import "./Sidebar.css";
import logo from "../../qc.png";
import { Link } from 'react-router-dom';

const Sidebar = ({sidebarOpen, closeSidebar}) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={logo} alt="logo"/>
                </div>
                <i 
                className="fa fa-times"
                id="sidebarIcon"
                onClick={() => closeSidebar()}>
                </i>
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link active_menu_link">
                    <i className="fa fa-home"></i>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <Link to="/enrollhr">Enroll HR</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-building-o"></i>
                    <Link to="/enrollasset">Enroll Asset</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-wrench"></i>
                    <Link to="/assetissue">Issue Asset</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-archive"></i>
                    <Link to="/enrollprocess">Enroll Process</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-handshake-o"></i>
                    <Link to="/assetciamark">Mark Asset CIA</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-question"></i>
                    <Link to="/processciamark">Mark Process CIA</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-sign-out"></i>
                    <Link to="/riskassessment">Risk Assessment</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-calendar-check-o"></i>
                    <Link to="/riskmitigation">Risk Mitigation</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-files-o"></i>
                    <Link to="/reportdownload">Download Report</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-question"></i>
                    <Link to="/setvision">Set Vision</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-question"></i>
                    <Link to="/setgoal">Set Goal</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-question"></i>
                    <Link to="/setobjective">Set Objective</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-files-o"></i>
                    <Link to="/objectivereport">Objective Report</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-files-o"></i>
                    <Link to="/processdocumentation">Process Documentation</Link>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;