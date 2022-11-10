using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface IFlightsService
    {
        Flights FlightDetails(FlightsDTO item);
        IEnumerable<Flights> AllFlights(FlightsDTO item);
    }
}
