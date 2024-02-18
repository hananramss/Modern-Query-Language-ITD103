import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Header.css'

export const Header = () => {
    const location = useLocation();

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-md navbar-light">
                <NavLink  to="/home" className="navbar-brand" > <img className="logo" src="/img/HR-trans-black.png" alt="Website LOGO" /></NavLink>
                <ul className="navbar-nav flex-column">
                    <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                        <NavLink className="nav-link" to="/home"><i className="fa fa-home"></i>Home</NavLink>
                    </li>
                    <li className={`nav-item ${location.pathname === '/trans_history' ? 'active' : ''}`}>
                        <NavLink className="nav-link" to="/trans_history"><i  className="fa fa-exchange" aria-hidden="true"></i>Transactions</NavLink>
                    </li>
                    <li className={`nav-item ${location.pathname === '/others' ? 'active' : ''}`}>
                        <NavLink className="nav-link" to="/others"><i className="fa fa-lightbulb-o"></i>Others</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
