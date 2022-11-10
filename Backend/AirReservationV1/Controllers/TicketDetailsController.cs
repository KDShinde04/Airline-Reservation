using AirReservationV1.Models;
using AirReservationV1.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Sockets;

namespace AirReservationV1.Controllers
{
    [EnableCors("MyCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketDetailsController : ControllerBase
    {
        private readonly IDetailsService _detailsService;

        public TicketDetailsController(IDetailsService detailsService)
        {
            _detailsService = detailsService;
        }

        [HttpPost]
        public ActionResult<ICollection<TicketDetails>> GetDetails(TicketDTO id)
        {
            var result = _detailsService.GetDetails(id.TicektId);
            if (result == null)
                return NotFound("No Details found for this Id");
            return Ok(result);
        }
        [Route("AddDetails")]
        [HttpPost]
        public ActionResult AddDetails(TicketDetails details)
        {
            var emp = _detailsService.AddDetails(details);
            return Created("", emp);
        }
        [HttpPut]
        public ActionResult<ICollection<Ticket>> UpdateDetails(TicketDetails details)
        {
            var emp = _detailsService.UpdateDetails(details);
            if (emp == null)
                return NotFound("Invalid TicketId");
            return Ok(emp);
        }
    }
}
