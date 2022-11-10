using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface IDetails
    {
        TicketDetails Add(TicketDetails item);
        IEnumerable<TicketDetails> GetByTicketId(int key);
        TicketDetails Get(int key);
        TicketDetails Update(TicketDetails item);
    }
}
