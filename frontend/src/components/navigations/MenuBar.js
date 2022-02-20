import React from 'react'

import './MenuBar.css'

const MenuBar = () => {
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <img class="ubc-image" src="ubc.png" alt="ubc"></img>
                <a className="logo" href='/'>UBC Wrapped</a>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            </div>
        </nav>
    )
}

export default MenuBar;