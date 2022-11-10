using AirReservationV1.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AirReservationV1.Services
{
    public class DetailsRepo : IDetails
    {
        private readonly AirlineContext _context;
        private readonly ILogger<DetailsRepo> _logger;

        public DetailsRepo(AirlineContext context,ILogger<DetailsRepo> logger)
        {
            _context = context;
            _logger = logger;

        }
        public TicketDetails Add(TicketDetails item)
        {
            try
            {
                _context.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                _logger.LogError("In DetailsRepo Add method", e.Message);
                Debug.Write(e.Message);
            }
            return null;
        }


        public TicketDetails Get(int key)
        {
            var details=_context.TicketDetails.FirstOrDefault(x=>x.DetailsId == key);
            return details;
        }

        public TicketDetails Update(TicketDetails item)
        {
            var details=Get(item.DetailsId);
            if (details != null)
            {
                try
                {
                     details.Name= item.Name;
                     details.Age = item.Age;
                     details.Gender = item.Gender;
                    _context.SaveChanges();
                    return details;
                }
                catch (Exception e)
                {
                    _logger.LogError("In DetailsRepo Update method", e.Message);
                    Debug.Write(e.Message);
                    throw;
                }
            }
            return null;
        }
        public IEnumerable<TicketDetails> GetByTicketId(int key)
        {
            var result = _context.TicketDetails.Where(x => x.TicketId == key).ToList();
            return result;
        }
    }
}
