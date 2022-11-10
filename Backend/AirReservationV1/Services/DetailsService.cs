using AirReservationV1.Models;
using System.Diagnostics;
using System.Net.Sockets;

namespace AirReservationV1.Services
{
    public class DetailsService : IDetailsService
    {
        private readonly IDetails _repo;
        private readonly ILogger<DetailsService> _logger;

        public DetailsService(IDetails repo,ILogger<DetailsService> logger)
        {
            _repo = repo;
            _logger = logger;
        }
        public TicketDetails AddDetails(TicketDetails item)
        {
            try
            {   
                _repo.Add(item);
                return item;
            }
            catch (Exception e)
            {
                _logger.LogError("In DetailsService AddDetails method",e.Message);
                Debug.Write(e.Message);
                throw;
            }
        }

        public IEnumerable<TicketDetails> GetDetails(int id)
        {
            try
            {
                var ticket = _repo.GetByTicketId(id);
                if (ticket != null)
                {
                    return ticket;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In DetailsService GetDetails method", e.Message);
                Debug.Write(e.Message);
                throw;
            }

        }

        public TicketDetails UpdateDetails(TicketDetails item)
        {
            try
            {
                var user = _repo.Update(item);
                if (user != null)
                {
                    return user;
                }
                return null;
            }
            catch (Exception e)
            {
                _logger.LogError("In DetailsService UpdateDetails method", e.Message);
                Debug.Write(e.Message);
                throw;
            }

        }

    }
}
