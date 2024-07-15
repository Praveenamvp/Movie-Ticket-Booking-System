using BusinessLayer.Implementations;
using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Request;
using Models.View;

namespace MovieTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowTimeController : ControllerBase
    {
        private readonly IShowTimeService _showTimeService;

        public ShowTimeController(IShowTimeService showTimeService)
        {
            _showTimeService = showTimeService;
        }


        [HttpGet("AllDates")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<DateView>>> GetAllDates(Guid id)
        {
            var dates = await _showTimeService.GetAllDatesByMovie(id);
            if (dates != null)
            {
                return Ok(dates);
            }
            return BadRequest("Cannot fetch dates ");

        }
        [HttpPost("ShowTimesByMovie")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<ShowTimeView>>> GetAllShowTimes(MovieDateRequest movieDateRequest)
        {
            var showTimes = await _showTimeService.GetShowTimesByMovie(movieDateRequest);
            if (showTimes != null)
            {
                return Ok(showTimes);
            }
            return BadRequest("Cannot fetch showTImes ");

        }
        [HttpPost("UpdateSeats")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> UpdateSeats(UpdateShowTimeRequest updateShowTimeRequest)
        {
            var result = await _showTimeService.UpdateAvailableSeats(updateShowTimeRequest);
            if (result)
            {
                return Ok("Update Successfull");
            }
            return BadRequest("Update Unsuccessfull");

        }
        [HttpGet("GetAllSeats")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<SeatDetailsView>>> GetAllSeatsAvailable(Guid id)
        {
            var dates = await _showTimeService.GetAllSeatDetails(id);
            if (dates != null)
            {
                return Ok(dates);
            }
            return BadRequest("Cannot fetch dates ");

        }
    }
}
