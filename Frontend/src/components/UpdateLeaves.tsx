import axios from 'axios';
import { isFuture } from 'date-fns';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Edit,Delete } from './CSS/svg';

export default function UpdateLeaves() {

    const [employeeId, setId] = useState('00000');
    const [data, setData] = useState([]);

    const storeValue = (event: any) => {
        setId(event.target.value);
    }

    const search = () => {
        const url = 'https://leavetrackers.herokuapp.com/employees/' + employeeId;
        axios.get(url).then(res => {
            setData(res.data);
        })
    }

    const remove = (removeEmployee : any) =>{
        const url = 'https://leavetrackers.herokuapp.com/employees/delete/' + removeEmployee._id;
        axios.delete(url).then(res =>{
            alert('Deleted SuccessFully.')
            search()
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
                           <th>Delete</th>
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
                                 <td>{isFuture(new Date(employee.endDate)) && <Link to={{pathname: 'addLeaves', state: employee}}>{<Edit />}</Link>}</td>
                                 <td>{isFuture(new Date(employee.endDate)) && <button onClick={()=> remove(employee)}><Delete/></button>}</td>
                              </tr>
                           )
                        )}
                        {data.length === 0 && <tr><td colSpan={7}>No records</td></tr>}
                     </tbody>
                  </table>
            </div>
        </>

    )
}
