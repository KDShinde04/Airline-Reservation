import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button,Card,ListGroup } from 'react-bootstrap';
import moment from 'moment'
import './Cancel.css'

function Cancel(props) {
    const location=useLocation();
    const navigate=useNavigate();

    var ticketDetails=async (id)=>{
        alert("You sure about cancelling the ticket?")
        var Details={
            ticektId: id
        };
        //Passing to .net/ connecting with backend
        var response = await fetch("http://localhost:5077/api/Ticket/CancelTicket",{
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
            if(result === 'Ticket Id is incorrect or not present')
            {
                alert('Ticket is already Cancelled');
            }
            else{
                alert("Ticket Cancelled Successfully")
                navigate('/Homepage')
            }

        })
    }
    return (
        <div>
            <div className='button' >
            <button className='btn btn-danger Cbutton' onClick={() => navigate(-1)}>Go back </button>
            </div>
            <div className='alert alert-success cancel'>
            <h3 className='details'>Ticket Details</h3>
            <Card border="success" color="success" align='left' className='alert alert-success cancel' style={{ width: '28rem' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>Ticket ID : {location.state.result.ticketId}</ListGroup.Item>
                <ListGroup.Item>Flight ID : {location.state.result.flightId}</ListGroup.Item>
                <ListGroup.Item>Departue Date: {moment(location.state.result.departureDate).format('DD-MM-YYYY')}</ListGroup.Item>
                <ListGroup.Item>Total Amount : {location.state.result.totalAmount}</ListGroup.Item>
                <ListGroup.Item>Status : {location.state.result.status}</ListGroup.Item>
                <ListGroup.Item><Button onClick={()=>ticketDetails(location.state.result.ticketId)}>Cancel </Button></ListGroup.Item>
            </ListGroup>
            </Card>
            </div>
            
        </div>
    );
}

export default Cancel;