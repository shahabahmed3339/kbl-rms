import "./Sidebar.css";
import { Link } from 'react-router-dom';
import UnlockAccess from '../roles/UnlockAccess';

const Sidebar = ({sidebarOpen, closeSidebar}) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                {/* <div className="sidebar__img">
                    <img src={logo} alt="logo"/>
                </div> */}
                <i 
                className="fa fa-times"
                id="sidebarIcon"
                onClick={() => closeSidebar()}>
                </i>
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link1 active_menu_link">
                    <i className="fa fa-home"></i>
                    <a href="/dashboard">Dashboard</a>
                </div>
                <UnlockAccess request={'Admin'}>
                <div className="sidebar__link">
                    <i className="far fa-warning"></i>
                    <Link to="/riskmanagementprogram">Risk Management Program</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-warning"></i>
                    <Link to="/assetciamark">Mark Asset CIA</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-warning"></i>
                    <Link to="/processciamark">Mark Process CIA</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-warning"></i>
                    <Link to="/riskassessment">Risk Assessment</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-warning"></i>
                    <Link to="/riskmitigation">Risk Mitigation</Link>
                </div>
                </UnlockAccess>
                <div className="sidebar__link">
                    <i className="far fa-files-o"></i>
                    <Link to="/riskmanagementreport">Download Report</Link>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;