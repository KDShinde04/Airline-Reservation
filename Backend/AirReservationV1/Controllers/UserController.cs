using AirReservationV1.Models;
using AirReservationV1.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AirReservationV1.Controllers
{
    [EnableCors("MyCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userservice;
        private readonly IRepo<string, User> _repo;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService userService,IRepo<string,User> repo,ILogger<UserController> logger)
        {
            _userservice = userService;
            _repo = repo;
            _logger = logger;
        }

        [Route("Register")]
        [HttpPost]
        public ActionResult Register(UserPassDTO user)
        {          
            try
            {
                var result = _userservice.Register(user);
                if (result != null)
                {
                    _logger.LogInformation("New User Registerd");
                    return Created("User Registerd successfully", result);
                }
            }
            catch (Exception e)
            {
                _logger.LogError("User was not able to Register",e.Message);
            }
            return BadRequest("User already Exists");

        }

        [Route("Login")]
        [HttpPost]
        public ActionResult Login(UserDTO user)
        {
            var result = _userservice.Login(user);
            if (result != null)
            {
                _logger.LogInformation("User Logged");
                return Ok(result);
            }
            return NotFound("Wrong Username or Password");

        }
        [Route("ProfileUpdate")]
        [HttpPut]
        public ActionResult ProfileUpdate(User user)
        {
            try
            {
                var result = _userservice.ProfileUpdate(user);
                if(result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Something wrong");
                
            }
            catch (Exception)
            {
                return BadRequest("Bad request");
            }
        }

        [Route("GetUser")]
        [HttpPost]
        public ActionResult UserProfile(UserEmailDTO user)
        {
            try
            {
                var result = _userservice.UserProfile(user);
                if(result==null)
                {
                    return NotFound("User Not Found");
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Bad request");
            }
        }

    }
}
