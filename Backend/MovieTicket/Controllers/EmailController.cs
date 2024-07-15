using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Entity;
using Models.Request;

namespace MovieTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController( IEmailService emailService)
        {
            _emailService = emailService;

        }
        [HttpPost("sendEmail")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SendEmail(BookingRequest bookingRequest)
        {
            var result = _emailService.SendEmail(bookingRequest);
            if (result != null)
            {
                return Ok("Email Sent Successfull");
            }
            return BadRequest("Unsuccessfull");
           


        }
    }
}
