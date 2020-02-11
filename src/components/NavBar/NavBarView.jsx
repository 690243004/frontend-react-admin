import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
class NavBar extends React.Component{
    render() {
        return <nav>
            <ul>
                <li><NavLink replace to="about">About</NavLink></li>
                <li><NavLink replace to="login">Login</NavLink></li>
                <li><NavLink replace to="users">User</NavLink></li>
            </ul>
        </nav>
    }
}

export default connect(null)(NavBar)