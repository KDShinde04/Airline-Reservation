using System.ComponentModel.DataAnnotations;

namespace AirReservationV1.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? Key { get; set; }
        public string Phone { get; set; }

    }
}
