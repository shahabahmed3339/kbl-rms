import "./Sidebar.css";
import { Link } from 'react-router-dom';
import UnlockAccess from "../roles/UnlockAccess";

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
                    <i className="far fa-calendar-check"></i>
                    <Link to="/setvision">Set Vision</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-calendar-check"></i>
                    <Link to="/setgoal">Set Goal</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-calendar-check"></i>
                    <Link to="/setobjective">Set Objective</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-files-o"></i>
                    <Link to="/objectivereport">Objective Report</Link>
                </div>
                </UnlockAccess>
            </div>
        </div>
    )
}
export default Sidebar;