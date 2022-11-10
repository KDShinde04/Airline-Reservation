using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface ITokenService
    {
        public string CreateToken ( UserDTO user );
    }
}
