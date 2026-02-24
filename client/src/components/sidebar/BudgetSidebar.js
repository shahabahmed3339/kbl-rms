import "./Sidebar.css";
import { Link } from 'react-router-dom';
import UnlockAccess from '../roles/UnlockAccess';

const Sidebar = ({sidebarOpen, closeSidebar}) => {
    return (
        <UnlockAccess request={'Admin'}>
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
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">HR Budgeting</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">Network Budgeting</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">Bandwidth Budgeting</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">Remise Budgeting</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">Transport Budgeting</Link>
                </div>
                <div className="sidebar__link">
                    <i className="far fa-cash-register"></i>
                    <Link to="#">Hardware Budgeting</Link>
                </div>
            </div>
        </div>
        </UnlockAccess>
    )
}
export default Sidebar;