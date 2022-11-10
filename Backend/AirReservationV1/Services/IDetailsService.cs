using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface IDetailsService
    {
        TicketDetails AddDetails(TicketDetails item);
       IEnumerable<TicketDetails> GetDetails(int item);
        TicketDetails UpdateDetails(TicketDetails item);
    }
}
