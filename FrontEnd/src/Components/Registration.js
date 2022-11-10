import React, { useState,useEffect } from 'react';
import './Registration.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

 function Registration(props) {

    const initialValues = { name: "", email: "",phone: "", password: "",ConfirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
            
        const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (!values.name) {
          errors.name = "Name is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
            errors.phone = "phone is required!";
          } else if (values.phone.length >10 || values.phone.length <10) {
            errors.phone = "Phone number must be of length 10";
          }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (!mediumRegex.test(values.password)) {
          errors.password = "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:";          
        } 
        if (!values.ConfirmPassword) {
          errors.ConfirmPassword = "Confirm Password is required";
        } else if (values.password !== values.ConfirmPassword) {
          errors.ConfirmPassword = "Password does not match with confirm password";
        } 
        return errors;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      };
      
      useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
          var user={
            Name: formValues.name,
            age: 0,
            gender: '',
            email: formValues.email,
            phone: formValues.phone,
            password:formValues.password
        };

        console.log(user);
        //Register new User
        var response = fetch("http://localhost:5077/api/User/Register",{
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
            if(result === 'User already Exists')
            {
                alert('Email Id already registered');
            }
            else{
                navigate("/Login");
            }
        })
        }
      }, [formErrors]);

    return (
        <div className='alert alert-success userdiv'>

        <div>

        </div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                    
                        name='name'
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={formValues.name}
                    />
                </div>
                <p>{formErrors.name}</p>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                    
                        name='email'
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={formValues.email}
                    />
                </div>
                <p>{formErrors.email}</p>

                <div className="mb-3">
                    <label>Phone Number</label>
                    <input
                    
                        name='phone'
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        placeholder="Enter Phone number"
                        value={formValues.phone}
                    />
                </div>
                <p>{formErrors.phone}</p>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                    
                        name='password'
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formValues.password}
                    />
                </div>
                <p>{formErrors.password}</p>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                    
                        name='ConfirmPassword'
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Enter ConfirmPassword"
                        value={formValues.ConfirmPassword}
                    />
                </div>
                <p>{formErrors.ConfirmPassword}</p>
                <div className="d-grid">
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Register
                    </button>

                </div>
                <p className="forgot-password text-right">
                Already registered <Link to="/Login">Sign in</Link>
                </p>
            </form>

        </div>
    );
}

export default Registration;