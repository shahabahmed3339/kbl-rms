import "./Sidebar.css";
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
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

            <UnlockAccess request={'Admin'}>
                <div className="sidebar__menu">
                    <div className="sidebar__link1 active_menu_link">
                        <i className="fa fa-home"></i>
                        <a href="/dashboard">Dashboard</a>
                    </div>

                    <div className="sidebar__link1">
                        <i className="fa fa-sitemap"></i>
                        <Collapsible trigger="Organogram">
                            <div className="sidebar__link">
                                <Link to="#">Levels</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="hierarchy">Designations</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Job Description</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Report</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-wpforms"></i>
                        <Collapsible trigger="Requisition">
                            <div className="sidebar__link">
                                <Link to="/requisition">New</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="/approval">Approvals</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="/requested">Report</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-briefcase"></i>
                        <Collapsible trigger="Recruitment Process">
                            <div className="sidebar__link">
                                <Link to="#">Pool</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Shortlist</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Verification</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Selection</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="enrollhr">Enrollment</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-window-restore"></i>
                        <Collapsible trigger="On Boarding">
                            <div className="sidebar__link">
                                <Link to="#">Employee Guidelines</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Orientation</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-chain-broken"></i>
                        <Collapsible trigger="Separation">
                            <div className="sidebar__link">
                                <Link to="#">Tasks Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Assets Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Data Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Clearance</Link>
                            </div>
                        </Collapsible>
                    </div>

                </div>
            </UnlockAccess>

            <UnlockAccess request={'User'}>
                <div className="sidebar__menu">
                    <div className="sidebar__link1 active_menu_link">
                        <i className="fa fa-home"></i>
                        <a href="/dashboard">Dashboard</a>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-wpforms"></i>
                        <Collapsible trigger="Requisition">
                            <div className="sidebar__link">
                                <Link to="/requisition">New</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-briefcase"></i>
                        <Collapsible trigger="Recruitment Process">
                            <div className="sidebar__link">
                                <Link to="enrollhr">Enrollment</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-window-restore"></i>
                        <Collapsible trigger="On Boarding">
                            <div className="sidebar__link">
                                <Link to="#">Employee Guidelines</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Orientation</Link>
                            </div>
                        </Collapsible>
                    </div>
                    
                    <div className="sidebar__link1">
                        <i className="fa fa-chain-broken"></i>
                        <Collapsible trigger="Separation">
                            <div className="sidebar__link">
                                <Link to="#">Tasks Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Assets Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Data Handing Over</Link>
                            </div>
                            <div className="sidebar__link">
                                <Link to="#">Clearance</Link>
                            </div>
                        </Collapsible>
                    </div>

                </div>
            </UnlockAccess>
        </div>
    )
}
export default Sidebar;