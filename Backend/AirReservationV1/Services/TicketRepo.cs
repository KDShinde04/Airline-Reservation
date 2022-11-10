using AirReservationV1.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;

namespace AirReservationV1.Services
{
    public class TicketRepo : ITicketRepo
    {
        private readonly AirlineContext _context;
        private readonly ILogger<TicketRepo> _logger;

        public TicketRepo(AirlineContext context,ILogger<TicketRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public Ticket Add(Ticket ticket)
        {
            try
            {
                ticket.Status = "Booked";
                _context.Add(ticket);
                _context.SaveChanges();
                return ticket;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketRepo Add method", e.Message);
                Debug.Write(e.Message);
                throw;
            }
            return null;
        }

        public Ticket Get(int id)
        {
            var user = _context.Tickets.FirstOrDefault(e => e.TicketId == id);
            if (user != null)
            {
                try
                {
                    return user;
                }
                catch (Exception e)
                {
                    _logger.LogError("In TicketRepo Add method", e.Message);

                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }

        public IEnumerable<Ticket> GetAll(int UserId)
        {
            List<Ticket> result = _context.Tickets.Where(e => e.UserId == UserId).OrderByDescending(x=>x.DepartureDate).ToList();
            if (result != null)
            {
                try
                {
                    return result;
                }
                catch (Exception e)
                {
                    _logger.LogError("In TicketRepo GetAll method", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }

        public Ticket Reschedule(TicketDTO item)
        {
            var emp = Get(item.TicektId);
            if (emp != null & emp.Status == "Booked")
            {
                try
                {
                    emp.DepartureDate = (DateTime)item.DepartureDate;
                    _context.SaveChanges();
                    return emp;
                }
                catch (Exception e)
                {
                    _logger.LogError("In TicketRepo Reschedule method", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }

        public Ticket Update(int id)
        {
            Ticket emp = Get(id);
            if (emp != null & emp.Status == "Booked")
            {
                    try
                    {
                        emp.Status = "Cancelled";
                        _context.SaveChanges();
                        return emp;
                    }
                    catch (Exception e)
                {
                    _logger.LogError("In TicketRepo Update method", e.Message);
                    Debug.Write(e.Message);
                    throw;
                    }

            }
            return null;
        }
    }
}
