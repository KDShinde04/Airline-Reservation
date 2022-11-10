import './App.css';
import {BrowserRouter as Router,Routes,Route,Link, Navigate} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import { Button,Form,Container,NavDropdown, Nav,NavLink,NavBtn } from 'react-bootstrap';
import React,{Fragment} from 'react'
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import Registration from './Components/Registration'
import TicketDetails from './Components/TicketDetails';
import { createContext, useState, Provider,useNavigate } from 'react';
import Bookticket from './Components/Bookticket';
import FlightDetail from './Components/FlightDetail';
import AllFlight from './Components/AllFlight';
import ManageTicket from './Components/ManageTicket';
import Profile from './Components/Profile';
import History from './Components/History';
import Navbar from './Components/Navbar';
import PrivateRoute from './PrivateRoute';
import Reschedule from './ManageComponents/Reschedule';
import Cancel from './ManageComponents/Cancel';
import Edit from './ManageComponents/Edit';


export const UserContext = React.createContext();

function App() {

  return (
    <div className="App">
     
    <Router>
      <div>
      <Routes>

            <Route exact path="/Register" element={<Registration/>}></Route>
            <Route exact path="/Homepage" element={<Homepage/>}></Route>
            {/* <Route exact path="/" element={<Login/>}></Route> */}
            <Route exact path="/Login" element={<Login/>}></Route>
            <Route exact path="/Bookticket" element={<Bookticket/>}></Route>
            <Route exact path="/Details" element={<TicketDetails/>}></Route>
            <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/History' element={<History/>}/>
                <Route exact path="/AllFlight" element={<AllFlight/>}/>
                <Route exact path="/FlightDetail" element={<FlightDetail/>}/>
                <Route exact path="/Manage" element={<ManageTicket/>}/>
                <Route exact path="/Profile" element={<Profile/>}/>
                <Route exact path="/Reschedule" element={<Reschedule/>}/>
                <Route exact path="/Cancel" element={<Cancel/>}/>
                <Route exact path="/Edit" element={<Edit/>}/>
            </Route>
            {/* <Route exact path="/Manage" element={<ManageTicket/>}></Route>
            <Route exact path="/Profile" element={<Profile/>}></Route>
            <Route exact path="/History" element={<History/>}></Route> */}
      </Routes>
      </div>
    </Router>

    </div>
  );
}

export default App;
