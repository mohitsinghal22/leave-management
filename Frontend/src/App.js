import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Employee from './components/Employee';
import AddLeaves from './components/AddLeaves';
import UpdateLeaves from './components/UpdateLeaves';
import Leavedetails from './components/LeaveDetails';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/employee' component={Employee}/>
        <Route path='/employee/addLeaves' component={AddLeaves}/>
        <Route path='/employee/updateLeaves' component={UpdateLeaves}/>
        <Route exact path='/admin' component={Leavedetails}/>
      </Switch> 
    </Router>
  );
}

export default App;
