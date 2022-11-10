using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AirReservationV1.Models
{
    public class TicketDetails
    {
        [Key]
        public int DetailsId { get; set; }
        public int TicketId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }

        [ForeignKey("TicketId")]
        public Ticket? Ticket { get; set; }
    }
}
