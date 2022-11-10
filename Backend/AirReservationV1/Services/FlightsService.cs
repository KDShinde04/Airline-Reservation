using AirReservationV1.Models;
using System.Diagnostics;
using System.Net.Sockets;

namespace AirReservationV1.Services
{
    public class FlightsService : IFlightsService
    {
        private readonly IFlightRepo _repo;
        private readonly ILogger<FlightsService> _logger;

        public FlightsService(IFlightRepo repo, ILogger<FlightsService> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        public IEnumerable<Flights> AllFlights(FlightsDTO item)
        {
            try
            {
                var flights = _repo.GetAllFlights(item);
                if (flights != null)
                {
                    return flights;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In FlightsService AllFlights method ", e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }

        public Flights FlightDetails(FlightsDTO item)
        {
            try
            {
                var flight = _repo.GetFlight(item);
                if (flight != null)
                {
                    return flight;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In FlightService FlightDetails method ", e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }
    }
}
