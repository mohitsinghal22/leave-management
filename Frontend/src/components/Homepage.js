import React from 'react';
import { Link } from 'react-router-dom'

export default function Homepage() {
    return (
        <div>
            <ul>
                <li><Link to='/employee'>Employee</Link></li>
                <li><Link to='/admin'>Admin</Link></li>
            </ul>
        </div>
    )
}
