using AirReservationV1.Models;
using AirReservationV1.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirReservationV1.Controllers
{
    [EnableCors("MyCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightsService _flightsservice;

        public FlightsController(IFlightsService flightsService)
        {
            _flightsservice = flightsService;
        }

     //   [Authorize]
        [Route("FlightDetails")]
        [HttpPost]
        public ActionResult<ICollection<Flights>> FlightDetails(FlightsDTO item)
        {
            var emp = _flightsservice.FlightDetails(item);
            if (emp == null)
                return NotFound("No ticket found for that Id");
            return Ok(emp);
        }

        [Route("GetFlights")]
        [HttpPost]
        public ActionResult<ICollection<Flights>> GetFlights(FlightsDTO item)
        {
            List<Flights> emp = new List<Flights> { };
            emp = (List<Flights>)_flightsservice.AllFlights(item);
            if (emp == null || emp.Count==0 )
                return NotFound("No ticket found for that Id");
            return Ok(emp);
        }
    }
}
