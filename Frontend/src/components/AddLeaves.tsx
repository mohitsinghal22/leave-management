import React, { useState } from 'react';
import '../components/CSS/AddLeaves.css';
import {differenceInBusinessDays, isWeekend} from 'date-fns';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import format from 'date-fns/format';

const AddLeaves = (props: any) => {
const employee = props?.location.state;
const [employeeDetails, setEmpDetails] = useState<any>(employee);

const getDate = (value: Date) => {
    const date = value && new Date(value);
    return date ? format(date, 'yyyy-MM-dd') : '';
}

const getLeaves = (details: any, id?: string) => {
    if (details && details['startDate'] !== '' && details['endDate'] !== '' 
    && details.hasOwnProperty('startDate') && details.hasOwnProperty('endDate') ) {
        const startDate:any = new Date(details['startDate']);
        const endDate:any = new Date(details['endDate']);
        let Difference_In_Days = differenceInBusinessDays(endDate, startDate);
        if (Difference_In_Days < 0) {
            alert('End date must be later than start date');
            if (id) details[id] = '';
        } else if (isWeekend(startDate) || isWeekend(endDate)) {
            return Difference_In_Days;
        } 
        else 
            return Difference_In_Days + 1;
    }
}

const [leaveDays, setLeaveDays] = useState<undefined | number>(getLeaves(employee));
const history = useHistory();

    const submitForm = (event: any) => {
        event.preventDefault()
        if (leaveDays && leaveDays < 0) {
            alert('End date must be later than start date')
        } else {
            employee ? 
            axios.post('https://leavetrackers.herokuapp.com/employees/update/'+employee._id, employeeDetails).then((res)=> {
                alert(res.data);
                history.push('/employee');
            }):
            axios.post('https://leavetrackers.herokuapp.com/employees/add', employeeDetails).then((res)=> {
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
        const leaves = getLeaves(details, id);
        setLeaveDays(leaves);
        details = { ...details, ...{ appliedLeaves: leaves} };
        setEmpDetails(details);
    }

    return (
        <div className="form">
            <div><h4>Enter the following details:</h4></div>
            <form onSubmit={(event) => submitForm(event)}>
                <div>
                    <label className="required">EmployeeID</label>
                    <input required value={employeeDetails ? employeeDetails.employeeId: ''} onChange={(event) => updateValue(event, 'employeeId')} />
                </div>
                <div>
                    <label className="required">PSID</label>
                    <input required value={employeeDetails ? employeeDetails.PSID: ''} onChange={(event) => updateValue(event, 'PSID')} />
                </div>
                <div>
                    <label className="required">Employee Name</label>
                    <input required value={employeeDetails ? employeeDetails.employeeName: ''} onChange={(event) => updateValue(event, 'employeeName')} />
                </div>
                <div>
                    <label className="required">Start Date</label>
                    <input required value={employeeDetails ? getDate(employeeDetails.startDate): ''} type="date" onChange={(event) => updateValue(event, 'startDate')} />
                </div>
                <div>
                    <label className="required">End Date</label>
                    <input required value={employeeDetails ? getDate(employeeDetails.endDate): ''} type="date" onChange={(event) => updateValue(event, 'endDate')} />
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
