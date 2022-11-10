import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Reschedule.css'

function Reschedule(props) {
    const navigate=useNavigate();
    var [date,setDate]= useState('');

    var changeDate=(event)=>{
        setDate(event.target.value)   
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth()+1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    var reschedule=async (event)=>{
        event.preventDefault();
        var Details={
            ticektId: localStorage.getItem('cancelId'),
            departureDate:date
        };
        //Passing to .net/ connecting with backend
        var response = await fetch("http://localhost:5077/api/Ticket/RescheduleTicket",{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Details),
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {   
            console.log(result);
            if(result === 'Ticket not found or Ticket is cancelled')
            {
                alert('Sorry, Ticket is already Cancelled');
            }
            else{
                alert("Rescheduled Successfully");
                navigate('/Homepage')
            }

        })

    }
    return (
        <div>
            <div className='button' >
            <button className='btn btn-danger Rbutton' onClick={() => navigate(-1)}>Go back </button>
            </div>
        <div className='alert alert-success Reschedule'>
            <form onSubmit={reschedule}>
                <h3>Passanger Details</h3>

                <label className='form-control'>Select a date</label><br/>
                <input className='form-control' required min={disablePastDate()} type="date" onChange={changeDate} />
                <br/><br/>
                <button className='btn btn-success'>Update</button><br/>     
            </form>
            <br/>
            <br/>
        </div>
        </div>
    );
}

export default Reschedule;