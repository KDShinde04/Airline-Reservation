using AirReservationV1.Models;
using System.Diagnostics;

namespace AirReservationV1.Services
{
    public class FlightRepo : IFlightRepo
    {
        private readonly AirlineContext _context;
        private readonly ILogger<FlightRepo> _logger;

        public FlightRepo(AirlineContext context,ILogger<FlightRepo> logger)
        {
            _context = context;
            _logger = logger;
        }
        public IEnumerable<Flights> GetAllFlights(FlightsDTO item)
        {
            List<Flights> result = _context.Flights.Where(x => (x.Source == item.Source && x.Destination == item.Destination)).OrderBy(e => e.Price).ToList();
            if (result != null)
            {
                try
                {
                    return result;
                }
                catch (Exception e)
                {
                    _logger.LogError("In FlightRepo GetAllFlights method ", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }

        public Flights GetFlight(FlightsDTO id)
        {
            var flight = _context.Flights.FirstOrDefault(e => e.FlightId == id.FlightId);
            if (flight != null)
            {
                try
                {
                    return flight;
                }
                catch (Exception e)
                {
                    _logger.LogError("In FlightRepo GetFlight method ", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }
    }
}
