using AirReservationV1.Models;
using System.Diagnostics;

namespace AirReservationV1.Services
{
    public class UserRepo:IRepo<string,User>
    {
        private readonly AirlineContext _context;
        private readonly ILogger<UserRepo> _logger;

        public UserRepo(AirlineContext context,ILogger<UserRepo> logger)
        {
            _context = context;
            _logger = logger;
        }

        public User Add(User item)
        {
            try
            {
                _context.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                _logger.LogError("In UserRepo Add method",e.Message);
                Debug.Write(e.Message);
            }
            return null;
        }

        public User Get(string key)
        {
            var user = _context.Users.FirstOrDefault(e => e.Email == key);
            if (user != null)
            {
                try
                {
                    return user;
                }
                catch (Exception e)
                {
                    _logger.LogError("In UserRepo Get method", e.Message);
                    Debug.Write(e.Message);
                }
            }
            return null;
        }

        public ICollection<User> GetAll()
        {
            // ICollection<User> user = (ICollection<User>)_context.Users;
            var usr = _context.Users.ToList();
            return usr;
        }

        public ICollection<User> GetAll(User user)
        {
            // ICollection<User> user = (ICollection<User>)_context.Users;
            var usr = _context.Users.ToList();
            return usr;
        }
        public User Update(User item)
        {
            var employee = Get(item.Email);
            if(employee!=null)
            {
                employee.Name = item.Name;
                employee.Age = item.Age;
                employee.Email = item.Email;
                employee.Phone = item.Phone;
                employee.Gender = item.Gender;
                _context.SaveChanges();
                return employee;
            }
            return null;
        }

        public User Delete(string key)
        {
            var emp = Get(key);
            if (emp != null)
            {
                try
                {
                    _context.Users.Remove(emp);
                    _context.SaveChanges();
                    return emp;
                }
                catch (Exception e)
                {
                    _logger.LogError("In UserRepo Delete method", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }

    }
}
