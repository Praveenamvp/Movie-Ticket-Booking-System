using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.Request;

namespace MovieTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

        public class BookingController : ControllerBase {
        private readonly IBookingService _bookingService;
        private readonly IEmailService _emailService;

        public BookingController(IBookingService bookingService,IEmailService  emailService)
        {
            _bookingService=bookingService;
            _emailService=emailService;

         }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllLocations(BookingRequest bookingRequest)
        {
            if (await _bookingService.Add(bookingRequest))
            {
                var result=_emailService.SendEmail(bookingRequest);
                return Ok("User");
            }
            else
            {
                return BadRequest("Failed to add booking"); 
            }
        }
       

    }
}
