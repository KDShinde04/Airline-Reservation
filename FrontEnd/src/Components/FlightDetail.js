import React,{useEffect} from 'react';
import { Button,Card,ListGroup } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import moment from 'moment';
import './FlightDetail.css'

function FlightDetail(props) {
    const location=useLocation();

 useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/Login')
    }
},[])
    localStorage.setItem('FlightID',location.state.result.flightId);
    localStorage.setItem('Price',location.state.result.price);
    const navigate = useNavigate();  

    var Book=(id,price)=>{
        navigate('/BookTicket');
    }

    return(
            <div>   
            <div className='button' >
            <button className='btn btn-danger Fbutton' onClick={() => navigate(-1)}>Go back </button>
            </div>
            <div className='alert alert-success flight'>
            <h3 className='details'>Flight Details</h3>
            <Card border="success" color="success" align='left' className='alert alert-success flight' style={{ width: '28rem' }}>
            <ListGroup variant="flush">
                <ListGroup.Item>Flight ID : {location.state.result.flightId}</ListGroup.Item>
                <ListGroup.Item>Flight Name : {location.state.result.flightName}</ListGroup.Item>
                <ListGroup.Item>Source : {location.state.result.source}</ListGroup.Item>
                <ListGroup.Item>Destination : {location.state.result.destination}</ListGroup.Item>
                <ListGroup.Item>Landing Time : {moment(location.state.result.landingTime).format('h:mm:ss a')}</ListGroup.Item>
                <ListGroup.Item>Take Off Time : {moment(location.state.result.takeOffTime).format('h:mm:ss a')}</ListGroup.Item>
                <ListGroup.Item>Total Seats in Flight : {location.state.result.numberOfSeats}</ListGroup.Item>
                <ListGroup.Item>Price : {location.state.result.price} Rs</ListGroup.Item>
                <ListGroup.Item>Duration of Flight : {location.state.result.duration} hr</ListGroup.Item>
                <ListGroup.Item><Button onClick={()=>Book(location.state.result.flightId,location.state.result.price)}>Book </Button></ListGroup.Item>
            </ListGroup>
            </Card>
            </div>
            </div>
            
        );  
}

export default FlightDetail;




