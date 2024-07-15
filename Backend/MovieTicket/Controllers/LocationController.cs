using BusinessLayer.Implementations;
using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.View;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MovieTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }
       
        
        [HttpGet("AllLocations")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Dictionary<Guid,LocationsView>>> GetAllLocations()
        {
            var locations = await _locationService.GetAllLocations();
            if(locations!= null)
            {
                return Ok(locations);
            }
            return BadRequest( "Cannot fetch locations ");

        }
        
    }
}
