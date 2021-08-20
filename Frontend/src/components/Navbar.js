import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <ul>
                <li><Link to='/employee'>Employee</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
            </ul>
        </div>
    )
}
