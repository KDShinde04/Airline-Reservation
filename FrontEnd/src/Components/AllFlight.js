import React,{useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';
import './AllFlight.css'


function AllFlight(props) {
  const location=useLocation();
  const res= location.state.result;
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/Login')
    }
},[])
 const AllFlight=localStorage.getItem('AllFlights')
 console.log(AllFlight)
    var PassFlightData= async (id)=>{
      var Id={
          FlightId:id};
        // Getting flight Details of a single flight from flight Id
        var response = await fetch("http://localhost:5077/api/Flights/FlightDetails",{
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
                  navigate("/FlightDetail",{
                      state:{
                          result
                      }
                  });
                }
            })
      }
 console.log(location);


    return (
      <div>
      <div className='button' >
      <button  className='btn btn-danger allBtn' onClick={() => navigate(-1)}>Go back </button>
      </div>
      <div className="alert alert-success allFlights">
      <h1>All Available Flights</h1>
      {
      res && res.length>0
      ?
      res.map((person, index) => {
        return (
          <div key={index}>  
            <table className="table table-striped">
                        <thead>
                        <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Duration </th>
                        <th>FlightName</th>
                        <th>Price</th>
                        <th>Details</th>
                         </tr>
                        </thead>
              <tbody>
                <tr>
                  <td>{person.source}</td>
                  <td>{person.destination}</td>
                  <td>{person.duration} hr</td>
                  <td>{person.flightName}</td>
                  <td>{person.price}</td>
                  <td><Button  onClick={()=>PassFlightData(person.flightId)}>Details</Button></td>
                </tr>
              </tbody>
            </table> 
          </div>
        );
      })
      :
      "No data Found"
}
            
    </div>
    </div>
    );
}

export default AllFlight;