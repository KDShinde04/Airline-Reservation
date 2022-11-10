using AirReservationV1.Models;
using AirReservationV1.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirReservationV1.Controllers
{
    [EnableCors("MyCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [Route("BookTicket")]
        [HttpPost]
        public ActionResult Booking(Ticket ticket)
        {
            var data = _ticketService.BookTicket(ticket);
            return Created("", data);
        }

        [Route("GetTicket")]
        [HttpGet]
        public ActionResult<ICollection<Ticket>> GetByTicketId(int ticket)
        {
            var data = _ticketService.GetTicket(ticket);
            if (data == null)
                return NotFound("No ticket found for that Id");
            return Ok(data);
        }

        [Route("GetAllTicket")]
        [HttpGet]
        public ActionResult<ICollection<Ticket>> GetByUserId(int id)
        {
            List<Ticket> result = new List<Ticket> { };
            result = (List<Ticket>)_ticketService.GetByUserId(id);
            if (result == null)
                return NotFound("No ticket found for that Id");
            return Ok(result);
        }

        [Route("CancelTicket")]
        [HttpPut]
        public ActionResult<ICollection<Ticket>> UpdateTicket(TicketDTO ticket)
        {
            var emp = _ticketService.CancelTicket(ticket);
            if (emp == null)
                return NotFound("Ticket Id is incorrect or not present");
            return Ok(emp);

        }

        [Route("RescheduleTicket")]
        [HttpPut]
        public ActionResult<ICollection<Ticket>> RescheduleTicket(TicketDTO ticket)
        {
            var emp = _ticketService.RescheduleTicket(ticket);
            if (emp == null)
                return NotFound("Ticket not found or Ticket is cancelled");
            return Ok(emp);
        }
    }
}
