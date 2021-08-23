import React from 'react'
import {Link} from 'react-router-dom'

export default function Employee() {
    return (
        <div>
            <ul>
                <li><Link to='employee/addLeaves'>Add Leaves</Link></li>
                <li><Link to='employee/updateLeaves'>Modify Leaves</Link></li>
            </ul>
        </div>
    )
}
