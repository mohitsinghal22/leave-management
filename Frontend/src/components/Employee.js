import React from 'react'
import {Link} from 'react-router-dom'

export default function Employee() {
    return (
        <div>
            <ul>
                <li><Link to='/addLeaves'>Add Leaves</Link></li>
                <li><Link to='/updateLeaves'>Modify Leaves</Link></li>
            </ul>
        </div>
    )
}
