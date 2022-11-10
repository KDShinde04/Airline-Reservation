namespace AirReservationV1.Models
{
    public class UserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Token { get; set; }
        public int? UserId { get; set; }

    }
}
