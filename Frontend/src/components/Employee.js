import React from 'react'
import {Link} from 'react-router-dom'
import { Add, Edit } from './CSS/svg'

export default function Employee() {
    return (
        <div>
            <ul className="home-page">
                <li><Link to='employee/addLeaves'><div>{<Add />}</div>Add Leaves</Link></li>
                <li><Link to='employee/updateLeaves'><div>{<Edit />}</div>Modify Leaves</Link></li>
            </ul>
        </div>
    )
}
