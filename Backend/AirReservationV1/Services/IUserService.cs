using AirReservationV1.Models;

namespace AirReservationV1.Services
{
    public interface IUserService
    {
        UserDTO Login(UserDTO user);
        User ProfileUpdate(User user);
        User UserProfile(UserEmailDTO email);
        UserDTO Register(UserPassDTO user);
    }
}
