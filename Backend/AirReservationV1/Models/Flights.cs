using System.ComponentModel.DataAnnotations;

namespace AirReservationV1.Models
{
    public class Flights
    {
        [Key]
        public int FlightId { get; set; }
        public string FlightName { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public int NumberOfSeats { get; set; }
        public int Price { get; set; }
        public DateTime TakeOffTime { get; set; }
        public DateTime LandingTime { get; set; }
        public float Duration { get; set; }

    }
}
