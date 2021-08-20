import React, { useState } from 'react';
import '../components/CSS/AddLeaves.css';
import {differenceInBusinessDays} from 'date-fns';

const AddLeaves = () => {
const [employeeDetails, setEmpDetails] = useState<any>({});
const [leaveDays, setLeaveDays] = useState<undefined | number>();

    const submitForm = () => {
        if (leaveDays && leaveDays < 0) {
            alert('End date must be later than start date')
        } else {
            alert('Data Submitted')
            console.log(employeeDetails)
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
            const Difference_In_Time = endDate.getTime() - startDate.getTime();
            // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let Difference_In_Days = differenceInBusinessDays(endDate, startDate)
            if (Difference_In_Days < 0) {
                details[id] = '';
                setEmpDetails(details);
                alert('End date must be later than start date');

            } else {
                setLeaveDays(Difference_In_Days);

            }
        }

    }

    return (
        <div className="form">
            <div><h4>Enter the following details:</h4></div>
            <form onSubmit={() => submitForm()}>
                <div>
                    <label className="required">EmployeeID</label>
                    <input required value={employeeDetails.empId} onChange={(event) => updateValue(event, 'empId')} />
                </div>
                <div>
                    <label className="required">PSID</label>
                    <input required value={employeeDetails.psId} onChange={(event) => updateValue(event, 'psId')} />
                </div>
                <div>
                    <label className="required">Employee Name</label>
                    <input required value={employeeDetails.empName} onChange={(event) => updateValue(event, 'empName')} />
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
