using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AirReservationV1.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public float TotalAmount { get; set; }
        public int FlightId { get; set; }
        public DateTime DepartureDate { get; set; }
        public int NumberOfPassangers { get; set; }
        public string? Status { get; set; }
        public string? Reason { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("FlightId")]
        public Flights? Flights { get; set; }

    }
}
