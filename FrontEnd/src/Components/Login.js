import React, { useState } from 'react';
import './Login.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';



 function Login(props) {

    var [pass,setPass]= useState('');
    var [mail,setMail]= useState('');
    const navigate= useNavigate();
    var changePass =(event)=>{
        setPass(event.target.value);
    }

    var changeMail=(event)=>{
        setMail(event.target.value)   
    }

    var LoginUser=async (event)=>{
        event.preventDefault();
        var user={
            email: mail,
            password:pass
        };
        console.log(user);
       // Posting to Login API return email,token,userId
        var response = await fetch("http://localhost:5077/api/User/Login",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {
            console.log(result);
            if(result === 'Wrong Username or Password')
            {
                alert('Invalid User');
            }
            else{
                localStorage.setItem('token',result.token);
                localStorage.setItem('UserId',result.userId);
                localStorage.setItem('email',result.email);
                navigate("/Homepage");
            }
        })
        var data = await response
        console.log(data);

    }  

    return (
        <div>
            
        <div className='alert alert-danger log'>
        <h3>Airline Reservation </h3>
            <form onSubmit={LoginUser}>
                <h3>Login</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        required
                        onChange={changeMail}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        required
                        onChange={changePass}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                <div className="custom-control custom-checkbox">
                        <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                        </label>
                </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button> 
                                    </div>
                <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
                </p>
                <p className="forgot-password text-right">
                New User <Link to="/Register">Register</Link>
                </p>
            </form>

            </div>
        </div>
    );
}

export default Login