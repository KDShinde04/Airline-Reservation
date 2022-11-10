import React,{useState} from "react";
import './Edit.css'
import {useNavigate,useLocation} from 'react-router-dom';


function Edit() {
        var[name,setName]=useState('');
        var[age,setAge]=useState('');
        var[gender,setGender]=useState('');
        const location=useLocation();
        const navigate=useNavigate();

        var tid=location.state.TicketId;
        var did=location.state.detailsId;

        var changeName=(event)=>{
            setName(event.target.value)
          }
          var changeAge=(event)=>{
            setAge(event.target.value)
          }
          var changeGender=(event)=>{
            setGender(event.target.value)
          }
        var ticketUser =async (event)=>{
            event.preventDefault()
            var user={
                DetailsId:did,
                TicketId:tid,
                Name:name,
                Age:age,
                Gender:gender
            };
            var response = await fetch('http://localhost:5077/api/TicketDetails',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'},
            body:JSON.stringify(user),
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {
          console.log(result);
          alert("Details edited successfully!!!")
          navigate("/Homepage");
        })
        
    }
        return(
            <div>
              <div className='button' >
            <button className='btn btn-danger EditBtn' onClick={() => navigate(-1)}>Go back </button>
            </div>
                <div className="alert alert-success edit">
                    <form onSubmit={ticketUser}>
                        <h1 className="center"> Edit details </h1>
                        <label className='form-control'>TicketId</label>&nbsp;&nbsp;&nbsp;
                        <label className='form-control' aria-disabled="true">{location.state.TicketId} </label><br/>
                        <br/>
                        <label className='form-control'>Name of Passanger</label><br/>
                        <input className='form-control' required  type="text" onChange={changeName} />
                        <br/>
                        <label className='form-control'>Age of Passanger</label><br/>
                        <input className='form-control' required type="number" onChange={changeAge} />
                        <br/>
                        <label className='form-control'>Gender of Passanger</label><br/>
                        <select className='form-control' required onChange={changeGender}>
                                <option value=" ">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Children">Children</option>
                        </select>
                        <br/>
                        <button className='btn btn-success'>Save Details</button>
                        <br/><br/>
                    </form>

                </div>
                </div>
            
        );
}
export default Edit;