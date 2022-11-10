import React from 'react';
import {BrowserRouter as Router,Routes,Route,Link, Navigate} from 'react-router-dom'

function Navbar(props) {
    const auth=localStorage.getItem('token')

    return (
        <div>
            
      <div>
        {
            auth?
            <ul className='nav-ul' >
              <li><Link to="/Profile"></Link>  Home</li>
              <li>Profile</li>
            </ul>
            :
            <ul className='nav-ul' >
              <li><Link to="/Login" >Login</Link></li>
              <li><Link to="/Register">Register</Link></li>
            </ul>
        }

      </div>
        </div>
    );
}

export default Navbar;