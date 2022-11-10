using AirReservationV1.Models;
using Microsoft.Extensions.Logging.Abstractions;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace AirReservationV1.Services
{
    public class UserService : IUserService
    {
        private readonly IRepo<string, User> _repo;
        private readonly ITokenService _tokenService;
        private readonly ILogger<UserService> _logger;

        public UserService(IRepo<string,User> repo,ITokenService tokenService,ILogger<UserService> logger)
        {
            _repo = repo;
            _tokenService = tokenService;
            _logger = logger;
        }
        public UserDTO Login(UserDTO user)
        {
            try
            {
                var myUser = _repo.GetAll().FirstOrDefault(u => u.Email == user.Email);
                if (myUser != null)
                {
                    var dbPass = myUser.PasswordHash;
                    HMACSHA512 hmac = new HMACSHA512(myUser.Key);
                    var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                    for (int i = 0; i < dbPass.Length; i++)
                    {
                        if (userPass[i] != dbPass[i])
                            return null;
                    }
                    user.Password = null;
                    user.Token = _tokenService.CreateToken(user);
                    user.UserId=myUser.UserId;
                    return user;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In UserService Login method", e.Message);
                Debug.WriteLine(e.Message);
            }
            return null;           
        }

        public UserDTO Register(UserPassDTO user)
        {
            try
            {           
                var usr=_repo.Get(user.Email);
                if (usr == null)
                {
                    HMACSHA512 hmac = new HMACSHA512();
                    user.Key = hmac.Key;
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
                    var myUser = _repo.Add(user);
                    if (myUser != null)
                        return new UserDTO
                        {
                            Email = user.Email,
                            Token = _tokenService.CreateToken(new UserDTO { Email = user.Email })
                        };
                    return null;
                }                
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In UserService Register method", e.Message);
                Debug.WriteLine(e.Message);
            }
            return null;
        }
        public User ProfileUpdate(User user)
        {
            try
            {
                var item = _repo.Get(user.Email);
                if (item != null)
                {
                    var result = _repo.Update(user);
                    return result;
                }
                return null; 
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                _logger.LogError("In UserService ProfileUpdate method", e.Message);
            }
            return null;

        }
        
        public User UserProfile(UserEmailDTO user)
        {
            try
            {
                var usr = _repo.Get(user.Email);
                if (usr != null)
                {
                    return usr;
                }
                return null; 
            }
            catch (Exception e)
            {
                Debug.Write(e.Message);
                _logger.LogError("In UserService UserProfile method", e.Message);
                throw;
            }
            return null;
        }
    }
}
