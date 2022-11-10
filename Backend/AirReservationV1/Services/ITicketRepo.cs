using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface ITicketRepo
    {
        Ticket Add(Ticket ticket);//Booking Ticket
        IEnumerable<Ticket> GetAll(int UserId);//Sort according to date
        Ticket Get(int id);//Get a Single Ticket
        Ticket Update(int id);//Status will be changed from booked to cancelled
        Ticket Reschedule(TicketDTO item);//Reschedule the flight

    }
}
