import React, { Component } from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import format from 'date-fns/format';
import axios from 'axios';

const getDate = (value) => {
   const date = value && new Date(value);
   return date ? format(date, 'yyyy-MM-dd') : '';
};
export class Leavedetails extends Component {
   constructor(props) {
      super(props);
      this.state = {
         filteredEmpDetails: [],
         employeeLeaveDetails: [],
         startDate: '',
         endDate: '',
      };
   }

   componentDidMount() {
      axios.get('https://leavetrackers.herokuapp.com/employees/').then((res) => {
         this.setState({ employeeLeaveDetails: res.data });
      });
   }
   handleStartDate = (e) => {
      this.setState({ startDate: getDate(e.target.value) });
   };
   handleEndDate = (e) => {
      this.setState({ endDate: getDate(e.target.value) });
   };

   checkValues = (e) => {
      e.preventDefault();

      if (this.state.endDate <= this.state.startDate) {
         alert('Enter valid Start and End Dates');
      }else{
         var result = this.state.employeeLeaveDetails.filter((obj) => {
            return (
               (obj.startDate >= this.state.startDate &&
                  obj.startDate <= this.state.endDate) ||
               (obj.endDate >= this.state.startDate &&
                  obj.endDate <= this.state.endDate)
            );
         });
         this.setState({ filteredEmpDetails: result });
      }
   };

   onFileDownload = () => {
      const wb1 = XLSX.utils.book_new();
      wb1.Props = {
         Title: 'Leave Data',
      };

      wb1.SheetNames.push('LeaveData');
      const ws1 = XLSX.utils.json_to_sheet(this.state.filteredEmpDetails);
      wb1.Sheets['LeaveData'] = ws1;
      const outputSheet1 = XLSX.write(wb1, {
         bookType: 'xlsx',
         type: 'binary',
      });

      var buf1 = new ArrayBuffer(outputSheet1.length); 
      var view1 = new Uint8Array(buf1); 
      for (var j = 0; j < outputSheet1.length; j++)
         view1[j] = outputSheet1.charCodeAt(j) & 0xff; 
      saveAs(
         new Blob([buf1], { type: 'application/octet-stream' }),
         'EmployeesLeavesDetails.xlsx'
      );
   };

   render() {
      return (
         <>
            <h1>leaves Details</h1>
            <form>
               <label>Start Date :</label>
               <input
                  type='date'
                  name='startdate'
                  id='startdate'
                  value={this.state.startDate}
                  onChange={(e) => this.handleStartDate(e)}
               />
               <label>End Date :</label>
               <input
                  type='date'
                  value={this.state.endDate}
                  onChange={(e) => this.handleEndDate(e)}
                  id='enddate'
               />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button type='submit' onClick={this.checkValues}>
                  Submit
               </button>
            </form>
            <center>
               <div>
                  <table className='table'>
                     <thead className='table-dark'>
                        <tr>
                           <th>Employee ID</th>
                           <th>PSID</th>
                           <th>Employee Name</th>
                           <th>Start Date</th>
                           <th>End Date</th>
                           <th>Applied Leaves</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.state.filteredEmpDetails.map(
                           (employee, index) => (
                              <tr key={index}>
                                 <td>{employee.employeeId}</td>
                                 <td>{employee.PSID}</td>
                                 <td>{employee.employeeName}</td>
                                 <td>{getDate(employee.startDate)}</td>
                                 <td>{getDate(employee.endDate)}</td>
                                 <td>{employee.appliedLeaves}</td>
                              </tr>
                           )
                        )}
                     </tbody>
                  </table>
               </div>
               <button onClick={this.onFileDownload}>Download Excel</button>
            </center>
         </>
      );
   }
}

export default Leavedetails;
