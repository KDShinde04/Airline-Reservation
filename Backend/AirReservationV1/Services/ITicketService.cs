using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface ITicketService
    {
        Ticket BookTicket(Ticket ticket);
        Ticket GetTicket(int id);
        IEnumerable<Ticket> GetByUserId(int userid);
        Ticket CancelTicket(TicketDTO user);
        Ticket RescheduleTicket(TicketDTO ticket);
    }
}
