import React,{useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import './ManageTicket.css'

function ManageTicket(props) {

    const location=useLocation();

   useEffect(()=>{
      if(!localStorage.getItem('token')){
          navigate('/Login')
      }
  },[])
    
    const navigate = useNavigate();  
    var cancelId=0;

    var EditDetails=async(Did,Tid)=>{
        navigate("/Edit",{
            state:{
                detailsId:Did,
                TicketId:Tid
            }
        })
    }
    //Getting details of a Ticket by Ticekt Id returns TicketId,FlightId,TotalAmount,Booking status,departure date
    var CancelTicket=async(id)=>{

        var response = await fetch("http://localhost:5077/api/Ticket/GetTicket?ticket="+id,{
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
                navigate("/Cancel",{
                    state:{
                        result
                    }
                });   
            }
            
        })        
    }
        

return (
    <div>
            <div className='button' >
            <button className='btn btn-danger ManageBtn' onClick={() => navigate(-1)}>Go back </button>
            </div>
        <div className='alert alert-success ManageDetails'>
            <h3>Passanger Details</h3>
            <div>
            {      location.state.result && location.state.result.length>0
                    ?
                    location.state.result.map((passanger, index) => {
                    cancelId=passanger.ticketId
                    localStorage.setItem('cancelId',passanger.ticketId)
                   return (
                        <div key={index}>
                            <table className="table table-striped ">
                        <thead>
                        <tr>
                        <th>Ticket Number</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Edit</th>
                         </tr>
                        </thead>
            <br/>
            <tbody>
                <tr>
                  <td>{passanger.ticketId}</td>
                  <td>{passanger.name}</td>
                  <td>{passanger.age}</td>
                  <td>{passanger.gender}</td>
                  <td><Button onClick={()=>EditDetails(passanger.detailsId,passanger.ticketId)}>Edit Details</Button>
</td>
                </tr>
              </tbody>
            </table>  
            <hr/>   
                        </div>
        );
      })
      :
      "No data Found"
}
        </div>

            <br/>
            <Button className='btn btn-success' onClick={()=>navigate('/Reschedule')} >Reschedule Ticket</Button>        
            <br/><br/>
            <Button className='btn btn-danger' onClick={()=>CancelTicket(cancelId)}>Cancel Ticekt</Button>
            <br/><br/>
            
            
        </div>
        </div>
    );
}


export default ManageTicket;