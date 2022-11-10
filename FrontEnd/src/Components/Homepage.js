import React, {  useState,useEffect } from "react";
import { Navbar,Container,Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";


export const UserContext = React.createContext();

function Homepage(props) {   
    const navigate=useNavigate();
    var [From,setFrom]= useState('');
    var [To,setTo]= useState('');

  var  userId=localStorage.getItem('UserId');
  var  email=localStorage.getItem('email');
   // let user=localStorage.getItem('user-info')
    function logout()
    {
     localStorage.clear();
     navigate('/Login');   
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/Login')
        }
    },[])

    var changeFrom =(event)=>{
       setFrom(event.target.value)
    }

    var changeTo =(event)=>{
        setTo(event.target.value);
    }

    //Users Ticket History
    var TicketHistory=async(id)=>{

        var response = await fetch("http://localhost:5077/api/Ticket/GetAllTicket?id="+id,{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {
            console.log(result);
            if(result === 'No ticket found for that Id')
            {
                alert('No Flights for  this route available');
            }
            else{
                navigate("/History",{
                    state:{
                        result
                    }
                });   
            }
            
        })        
}

    //Users Profile
    var UserProfile=async()=>{
        var user={
            Email:email
        };
        var response = await fetch("http://localhost:5077/api/User/GetUser",{
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
            if(result === 'User Not Found')
            {
                alert('user Not found');
            }
            else{
                navigate("/Profile",{
                    state:{
                        result
                    }
                });   
            }            
        })        
}

    //Getting All flights from Source and Destination
    var BookTicket=async (event)=>{
        event.preventDefault();
        var ticket={
            source:From,
            destination:To
        };
        var response = await fetch("http://localhost:5077/api/Flights/GetFlights",{
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
            if(result === 'No ticket found for that Id')
            {
                alert('No Flights available for this route ');
            }
            else{
                localStorage.setItem('AllFlights',result)
                navigate("/AllFlight",{
                    state:{
                        result
                    }
                });   
            }            
        })        
}  



    return (
        <div >
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Airline</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Homepage">Home</Nav.Link>
                        <Nav.Link onClick={()=>UserProfile()} >Profile</Nav.Link>
                        <Nav.Link className="logout"onClick={logout} >Logout</Nav.Link>
                        <Nav.Link className="email">{email}</Nav.Link>
                    </Nav>
                </Container>
      </Navbar>

            <div className="alert alert-success home" >
            <form onSubmit={BookTicket}>
                <div className="mb-3">
                    <label>Source</label>
                    <select className='form-control' onChange={changeFrom}>
                        <option value=" ">None</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                </select>
                </div>

                <div className="mb-3">
                <label>Destination</label><br/>
                <select className='form-control' onChange={changeTo}>
                        <option value=" ">None</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                </select>
                    
                </div>

                <br/>
                <div className="d-grid">
                    <button className="btn btn-success">
                        Search Flights
                    </button> 
                </div>
                <br/>
            </form>   
            </div>
            <Button className="btn btn-primary Btnhome" onClick={()=>TicketHistory(userId)}>Ticket History </Button>
        </div>
  );
};

export default Homepage;
