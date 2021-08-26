import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Edit } from './CSS/svg';

export default function UpdateLeaves() {

    const [employeeId, setId] = useState('');
    const [data, setData] = useState([]);

    const storeValue = (event: any) => {
        setId(event.target.value);
    }

    const search = () => {
        const url = 'http://localhost:5000/employees/' + employeeId;
        axios.get(url).then(res => {
            setData(res.data);
        })
    }

    const getDate = (value: Date) => {
        const date = new Date(value).toLocaleDateString();
        return date;
    }

    return (
        <>
            <div>
                <label className="required">EmployeeID</label>
                <input required onChange={(event)=>storeValue(event)} />
                <button onClick={()=>search()}>Search</button>
            </div>
            <div>
            <table className="table-class">
                     <thead>
                        <tr>
                           <th>Employee ID</th>
                           <th>PSID</th>
                           <th>Employee Name</th>
                           <th>Start Date</th>
                           <th>End Date</th>
                           <th>Update</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.length > 0 && data.map(
                           (employee: any, index) => (
                              <tr key={index}>
                                 <td>{employee.employeeId}</td>
                                 <td>{employee.PSID}</td>
                                 <td>{employee.employeeName}</td>
                                 <td>{getDate(employee.startDate)}</td>
                                 <td>{getDate(employee.endDate)}</td>
                                 <td><Link to={{pathname: 'addLeaves', state: employee}}>{<Edit />}</Link></td>
                              </tr>
                           )
                        )}
                        {data.length === 0 && <tr><td colSpan={6}>No records</td></tr>}
                     </tbody>
                  </table>
            </div>
        </>

    )
}
