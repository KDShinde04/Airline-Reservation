import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import moment from 'moment';
import './History.css'

function History(props) {
    const location=useLocation();
    const navigate=useNavigate();
    const res= location.state.result;

    var PassangerDetails= async (id)=>{
        var Id={
            ticektId:id};
          // getting Ticket details by ticketId returns list of passangers details 
          var response = await fetch("http://localhost:5077/api/TicketDetails",{
                  method:'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify(Id),
                  mode:'cors'
              }).then((response)=>response.json()).then((result)=>
              {
                  console.log(result);
                  if(result === 'No ticket found for that Id')
                  {
                      alert('Something went wrong');
                  }
                  else{
                    navigate("/Manage",{
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
            <button id="mybutton" className='btn btn-danger float-right' onClick={() => navigate(-1)}>Go back </button>
            </div>
            <div className="alert alert-success hist">
            <h3>Ticket History</h3>
          
            <div>
                              {
                  res && res.length>0
                    ?
                  res.map((ticket, index) => {
                    return (
                      <div key={index}>
                        <table className="table table-striped">
                        <thead>
                        <tr>
                        <th>Ticket Number</th>
                        <th>Flight ID Number</th>
                        <th>Departure Date</th>
                        <th>Status of Ticket</th>
                        <th>Price</th>
                        <th>Details</th>
                         </tr>
                        </thead>
              <tbody>
                <tr>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.flightId}</td>
                  <td>{moment(ticket.departureDate).format('DD-MM-YYYY')}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.totalAmount}</td>
                  <td><Button  onClick={()=>PassangerDetails(ticket.ticketId)}>Manage</Button></td>
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
        </div>
        </div>
    );
}

export default History;