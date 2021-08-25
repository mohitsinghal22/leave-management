import React from 'react'
import { Home } from './CSS/svg'
import './CSS/Navbar.css';
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <header>
            <div style={{ display: 'flex' }}>
                <div className="header-flex--left"><Link to='/'>{<Home />}</Link></div>
                <div style={{ width: "100%" }}><h1>Employee leave Tracker</h1></div>
            </div>
        </header>
    )
}
