import React, { useState } from 'react';
import '../components/CSS/AddLeaves.css';
import {differenceInBusinessDays} from 'date-fns';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddLeaves = () => {
const [employeeDetails, setEmpDetails] = useState<any>({});
const [leaveDays, setLeaveDays] = useState<undefined | number>();
const history = useHistory();

    const submitForm = (event: any) => {
        event.preventDefault()
        if (leaveDays && leaveDays < 0) {
            alert('End date must be later than start date')
        } else {
            axios.post('http://localhost:5000/employees/add', employeeDetails).then((res)=> {
                alert(res.data);
                history.push('/employee');
            })
        }
    }

    const updateValue = (event: any, id: string) => {
        const payload: any = {};
        payload[id] = event.target.value;
        let details = { ...employeeDetails, ...payload };
        setEmpDetails(details);
        if (details.hasOwnProperty('startDate') && details.hasOwnProperty('endDate')) {
            const startDate = new Date(details['startDate']);
            const endDate = new Date(details['endDate']);
            let Difference_In_Days = differenceInBusinessDays(endDate, startDate)
            if (Difference_In_Days < 0) {
                details[id] = '';
                setEmpDetails(details);
                alert('End date must be later than start date');
            } else {
                details = { ...details, ...{ appliedLeaves: Difference_In_Days} };
                setEmpDetails(details);
                setLeaveDays(Difference_In_Days);

            }
        }

    }

    return (
        <div className="form">
            <div><h4>Enter the following details:</h4></div>
            <form onSubmit={(event) => submitForm(event)}>
                <div>
                    <label className="required">EmployeeID</label>
                    <input required value={employeeDetails.employeeId} onChange={(event) => updateValue(event, 'employeeId')} />
                </div>
                <div>
                    <label className="required">PSID</label>
                    <input required value={employeeDetails.PSID} onChange={(event) => updateValue(event, 'PSID')} />
                </div>
                <div>
                    <label className="required">Employee Name</label>
                    <input required value={employeeDetails.employeeName} onChange={(event) => updateValue(event, 'employeeName')} />
                </div>
                <div>
                    <label className="required">Start Date</label>
                    <input required value={employeeDetails.startDate} type="date" onChange={(event) => updateValue(event, 'startDate')} />
                </div>
                <div>
                    <label className="required">End Date</label>
                    <input required value={employeeDetails.endDate} type="date" onChange={(event) => updateValue(event, 'endDate')} />
                </div>
                {leaveDays && <div>
                    <label style={{ color: 'red' }}>Total days : {leaveDays}</label>
                </div>}
                <div className="submit"><input type="submit" value="Submit" /></div>
            </form>
        </div>
    )

}
export default AddLeaves;
