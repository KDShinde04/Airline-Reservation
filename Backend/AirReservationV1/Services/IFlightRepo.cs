using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface IFlightRepo
    {
        Flights GetFlight(FlightsDTO id);
        IEnumerable<Flights> GetAllFlights(FlightsDTO item);
    }
}
