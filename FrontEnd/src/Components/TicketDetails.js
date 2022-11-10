import React,{ useState,useEffect }  from 'react';
import './TicketDetails.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';



function TicketDetails(props) {

    var [name,setName]= useState('');
    var [age,setAge]= useState('');
    var [gender,setGender]= useState('');

    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/Login')
        }
    })
    const navigateHome = () => {
        navigate('/Homepage');
      };

    const numberofpassangers=localStorage.getItem('NumberOfPassangers');
    const ticketid=localStorage.getItem('TicektId')
    
    console.log(location);
    var changeName =(event)=>{
        setName(event.target.value);
    }

    var changeAge=(event)=>{
        setAge(event.target.value)   
    }
    var changeGender=(event)=>{
        setGender(event.target.value)   
    }

    var ticketDetails=async (event)=>{
        event.preventDefault();
        var Details={
            TicketId: ticketid,
            Name:name,
            Age:age,
            Gender:gender
        };
        //Adding Details of Passanger
        var response = await fetch("http://localhost:5077/api/TicketDetails/AddDetails",{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Details),
            mode:'cors'
        }).then((response)=>response.json()).then((result)=>
        {   
            console.log(result);
            alert("Passanger Details Added!!!" )
            //navigate("/Homepage")
        })

}

    return (
        <div className='alert alert-success details'>
            <br/>
                <h3>Passanger Details</h3><br/>
            <form onSubmit={ticketDetails}>
            {
            Array.from({length: numberofpassangers}).map((_, index) => (
            <>
                <div className='det'>
                <h4>Passanger {index+1}</h4>
                <label className='form-control'>Ticket Id </label><br/>
                <label className='form-control' aria-disabled="true">{ticketid} </label><br/>
                <br/>
                <label className='form-control'>Name of Passanger</label><br/>
                <input className='form-control' type="text" onChange={changeName} />
                <br/>
                <label className='form-control'>Age of Passanger</label><br/>
                <input className='form-control' type="number" onChange={changeAge} />
                <br/>
                <label className='form-control'>Gender of Passanger</label><br/>
                <select className='form-control' onChange={changeGender}>
                        <option value=" ">Not Selected</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Children">Children</option>
                </select>
                <br/>
                <button className='btn btn-success' >Add Details of Passanger {index+1}</button><br/><br/>
                </div>

            </>
            
        )
    )
} 

            </form>
            <br/><br/><br/>
            <Button onClick={navigateHome} >Go to Home</Button>
        </div>
    );
}
export default TicketDetails;