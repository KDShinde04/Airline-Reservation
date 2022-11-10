import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import './Bookticket.css';


function Bookticket(props) {   

    //const location=useLocation();
   // const res= location.state.result;
    const navigate=useNavigate();

    var [date,setDate]= useState(new Date());
    var [NumberPassanger,setNumber]= useState(0);
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/Login')
        }
    },[])
    var FId=localStorage.getItem('FlightID');
    var price=localStorage.getItem('Price');
    //var UID = location.state.userid
    var UID = localStorage.getItem('UserId')

    var changeDate =(event)=>{
        setDate(event.target.value);
    }
    var changePassangers =(event)=>{
        setNumber(event.target.value);
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth()+1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    var BookTicket=async (event)=>{
        event.preventDefault();
        var ticket={
            UserId:UID,
            TotalAmount:price*NumberPassanger,
            FlightId:FId,
            DepartureDate:date,
            NumberOfPassangers:NumberPassanger
        };
        //passing Ticket object for booking ticket
        var response = await fetch("http://localhost:5077/api/Ticket/BookTicket",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ticket),
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {
            console.log(result);
            alert("Ticket Booked!!! redirecting to add details of Passanger")
            localStorage.setItem('TicektId',result.ticketId)
            localStorage.setItem('NumberOfPassangers',result.numberOfPassangers)
            navigate("/Details",{
                state:{
                    UserId:ticket.UserId,
                    TicketId:result.ticketId
                }

            });

        })
        
    }  

    return (
        <div>
            <div>
            </div>
            <div className='button' >
                <button className='btn btn-danger bookBtn' onClick={() => navigate(-1)}>Go Back </button><br/>
                <button className='btn btn-danger hoBtn' onClick={() => navigate('/Homepage')}>Go Home </button>
            </div>
        <div className="alert alert-success ticket" >

                <form onSubmit={BookTicket}>
                <h3>Confirm Booking</h3>
                <div className="mb-3">
                    <label>UserID</label>
                    <label className='form-control' aria-disabled="true">{UID}</label><br/>
                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <label className='form-control' aria-disabled="true">{price}</label><br/>
                </div>

                <div className="mb-3">
                    <label>Flight Id </label><br/>
                    <label className='form-control' aria-disabled="true">{FId}</label><br/>
                </div>

                <div className="mb-3">
                    <label>Departure Date</label>
                    <input
                        required
                        onChange={changeDate}
                        type="date"
                        min={disablePastDate()}
                        className="form-control"
                        placeholder="Departure Date"
                    />
                </div>
                <br/>
                <div className="mb-3">
                    <label>Number of Passangers</label>
                    <input
                        required
                        onChange={changePassangers}
                        type="number"
                        className="form-control"
                        placeholder="Number of Passangers"
                    />
                </div>
                <br/>

                <div className="d-grid">
                    <button className="btn btn-primary">
                        Confirm Ticket and Add Details
                    </button> 
                </div>
                <br/>

            </form>
            <br/><br/>

        </div>
        
        </div>
        
  );
};

export default Bookticket;
