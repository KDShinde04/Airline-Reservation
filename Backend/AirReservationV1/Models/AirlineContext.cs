using Microsoft.EntityFrameworkCore;

namespace AirReservationV1.Models
{
    public class AirlineContext:DbContext
    {
        public AirlineContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Flights> Flights { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketDetails> TicketDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flights>().HasData(
                new Flights
                {
                    FlightId=1,FlightName="Air India",Source="Mumbai",Destination="Delhi",NumberOfSeats=95,Price=3999,TakeOffTime=DateTime.Now,LandingTime=DateTime.Now.AddHours(2),Duration=2
                });
        }
        
    }
}
