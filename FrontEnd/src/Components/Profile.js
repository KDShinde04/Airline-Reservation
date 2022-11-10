import React,{useState} from 'react';
import './Profile.css'
import { useNavigate,useLocation } from "react-router-dom";

function Profile(props) {
    const location=useLocation();
    const navigate=useNavigate();
    var [name,setName]= useState('');
    var [age,setAge]= useState('');
    var [gender,setGender]= useState('');
    var [phone,setPhone]= useState('');
    
    var changeName =(event)=>{
        console.log(event.target.value);
       setName(event.target.value);
    }

    var changeAge =(event)=>{
        console.log(event.target.value);

        setAge(event.target.value);
    }
    var changeGender =(event)=>{
        console.log(event.target.value);

        setGender(event.target.value);
    }
    var changePhone=(event)=>{
        console.log(event.target.value)
;
        setPhone(event.target.value)   ;
    }

    var UpdateUser=async (event)=>{
        event.preventDefault();
        var user={
//            userId: localStorage.getItem('UserId'),
            name: name,
            age: age,
            gender: gender,
            email: localStorage.getItem('email'),
            phone: phone
        };
        console.log(user);
        //Update the user profile API
        var response = await fetch("http://localhost:5077/api/User/ProfileUpdate",{
            method:'PUT',
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
                navigate("/Homepage");
            }
        })
}  
    return (
        <div>
            <div className='button' >
                        <button id="mybutton" className='btn btn-danger float-right' onClick={() => navigate(-1)}>Go back </button>
                    </div>
        <div className='alert alert-success profile' >
            <div>
            <form onSubmit={UpdateUser}>
                <h3>Profile Update</h3>
                <div className="mb-3">
                    <label className='label'>Your Email Id</label>
                    <label className='form-control' aria-disabled="true">{location.state.result.email}</label><br/>
                </div>

                <div className="mb-3">
                    <label className='label' >Name : {location.state.result.name}</label><br/>
                    <input className='form-control' placeholder="Enter New name" type="text" onChange={changeName} />
                </div>
                <div className="mb-3">
                    <label className='label'>Age : {location.state.result.age}</label>
                    <input className='form-control' placeholder="Enter New Age" type="number" onChange={changeAge} />
                </div>
                <div className="mb-3">
                <label className='label'>Gender : {location.state.result.gender}</label>                <select className='form-control' onChange={changeGender}>
                        <option value=" ">Not Selected</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Children">Children</option>
                </select>
                </div>

                <div className="mb-3">
                    <label className='label'>Phone : {location.state.result.phone} </label>
                    <input className='form-control' placeholder="Enter New Phone Number" type="number" onChange={changePhone} />
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Profile;