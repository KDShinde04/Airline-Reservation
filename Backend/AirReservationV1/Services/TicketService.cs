using AirReservationV1.Models;
using System.Diagnostics;
using System.Net.Sockets;

namespace AirReservationV1.Services
{
    public class TicketService : ITicketService
    {
        private readonly ILogger<TicketService> _logger;
        private readonly ITicketRepo _ticketrepo;

        public TicketService(ITicketRepo ticketRepo,ILogger<TicketService> logger)
        {
            _logger = logger;
            _ticketrepo = ticketRepo;
        }

        public TicketService()
        {
        }

        public Ticket BookTicket(Ticket ticket)
        {           
            try
            {
                _ticketrepo.Add(ticket);
                return ticket;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketService BookTicket method",e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }

        public Ticket GetTicket(int id)
        {
            try
            {
                Ticket ticket = new Ticket();
                 ticket = _ticketrepo.Get(id);
                if (ticket != null)
                {
                    return ticket;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketService GetTicket method", e.Message);
                Debug.Write(e.Message);
                throw;
            }
           
        }
        public IEnumerable<Ticket> GetByUserId(int id)
        {
            try
            {
                var ticket = _ticketrepo.GetAll(id);
                if(ticket!=null)
                {
                    return ticket;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketService GetByUserId method", e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }

        public Ticket CancelTicket(TicketDTO user)
        {
            try
            {
                var ticket = _ticketrepo.Update(user.TicektId);
                if (ticket != null)
                {
                    return ticket;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketService CancelTicket method", e.Message);
                Debug.Write(e.Message);
                throw;
            }

        }
        public Ticket RescheduleTicket(TicketDTO user)
        {
            try
            {
                var ticket = _ticketrepo.Reschedule(user);
                if (ticket != null)
                {
                    return ticket;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In TicketService RescheduleTicket method", e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }
    }
}
