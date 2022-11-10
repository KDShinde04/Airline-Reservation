using AirReservationV1.Controllers;
using AirReservationV1.Models;
using AirReservationV1.Services;
using Microsoft.AspNetCore.Mvc;

namespace TestProject1
{
    public class TicketControllerTest
    {
        TicketController _controller;
        TicketService _service;
        public TicketControllerTest()
        {
            _service = new TicketService();
            _controller = new TicketController(_service);
        }
        [Fact]
        //public void AddBookTest()
        //{
        //    //OK RESULT TEST START

        //    //Arrange
        //    var completeBook = new Ticket()
        //    {
        //        UserId = 1,
        //        TotalAmount = 1,
        //        FlightId = 1,
        //        DepartureDate=DateTime.Now,
        //        NumberOfPassangers=1
        //    };

        //    //Act
        //    var createdResponse = _controller.Booking(completeBook);

        //    //Assert
        //    Assert.IsType<CreatedAtActionResult>(createdResponse);

        //    //value of the result
        //    var item = createdResponse as CreatedAtActionResult;
        //    Assert.IsType<Ticket>(item.Value);

        //    //check value of this book
        //    var bookItem = item.Value as Ticket;
        //    Assert.Equal(completeBook.UserId, bookItem.UserId);
        //    Assert.Equal(completeBook.TotalAmount, bookItem.TotalAmount);
        //    Assert.Equal(completeBook.FlightId, bookItem.FlightId);
        //    Assert.Equal(completeBook.DepartureDate, bookItem.DepartureDate);
        //    Assert.Equal(completeBook.NumberOfPassangers, bookItem.NumberOfPassangers);
        //    //OK RESULT TEST END

        //    //BADREQUEST AND MODELSTATE ERROR TEST START

        //    //Arrange
        //    var incompleteBook = new Ticket()
        //    {
        //        TotalAmount = 1,
        //        FlightId = 2,
        //        DepartureDate = DateTime.Now,
        //        NumberOfPassangers = 1
        //    };

        //    //Act
        //    _controller.ModelState.AddModelError("UserId", "UserId is a requried filed");
        //    var badResponse = _controller.Booking(incompleteBook);

        //    //Assert
        //    Assert.IsType<BadRequestObjectResult>(badResponse);



        //    //BADREQUEST AND MODELSTATE ERROR TEST END
        //}
    }
}