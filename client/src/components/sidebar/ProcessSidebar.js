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
                    <div className="sidebar__link">
                        <i className="far fa-recycle"></i>
                        <Link to="/enrollprocess">Enroll Process</Link>
                    </div>
                <UnlockAccess request={'Admin'}>
                    <div className="sidebar__link">
                        <i className="far fa-recycle"></i>
                        <Link to="/processdocumentation">Process Documentation</Link>
                    </div>
                    <div className="sidebar__link">
                        <i className="far fa-recycle"></i>
                        <Link to="/writeprocess">Write Process</Link>
                    </div>
                </UnlockAccess>
            </div>
        </div>
    )
}
export default Sidebar;