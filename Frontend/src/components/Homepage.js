import React from 'react';
import { Link } from 'react-router-dom'
import { User, Admin } from './CSS/svg';

export default function Homepage() {
    return (
        <div>
            <ul className="home-page">
                <li><Link to='/employee'><div>{<User />}</div>Employee</Link></li>
                <li><Link to='/admin'><div>{<Admin />}</div>Admin</Link></li>
            </ul>
        </div>
    )
}
