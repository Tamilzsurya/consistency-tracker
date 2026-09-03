
import {Link, withRouter} from 'react-router-dom';

import { MdCalendarToday } from "react-icons/md";
import { BiGridAlt } from "react-icons/bi";
import { MdPersonOutline } from "react-icons/md";
import { BiLineChart } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

import BrandLogo from '../BrandLogo';

import './index.css';

const HomeSidebar = props => {
    const menuItems = [
    {id: 1, to: '/', label: 'Today', icon: MdCalendarToday},
    {id: 2, to: '/grid', label: 'Grid', icon: BiGridAlt},
    {id: 3, to: '/trends', label: 'Trends', icon: BiLineChart},
    {id: 4, to: '/profile', label: 'Profile', icon: MdPersonOutline},
];

    const { match } = props;
    const { path } = match;
    console.log(path);

    return (
                <div className="side-bar">

                    <div className="sidebar-brand-logo">
                        <BrandLogo />
                    </div>

                    <ul className="sidebar-mobile-menu">
                        {menuItems.map(item => (
                            <li key={item.id} className="sidebar-mobile-menu-item">
                                <Link to={item.to} className={`sidebar-mobile-menu-link ${path === item.to ? 'active-link' : ''}`}>
                                    <item.icon className="sidebar-mobile-menu-icon" />
                                    <label  className="sidebar-mobile-menu-text">{item.label}</label>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button className="habit-btn">
                        <FaPlus className="habit-btn-icon" />
                        <span className="habit-btn-text">New Habit</span>
                    </button>
                </div>
            )
};

export default withRouter(HomeSidebar);