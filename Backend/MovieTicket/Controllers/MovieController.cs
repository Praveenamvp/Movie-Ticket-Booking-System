using BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.View;

namespace MovieTicket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]

    public class MovieController : ControllerBase
    {

        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<MovieView>>> GetAllLocations(Guid uid)
        {
            var movie = _movieService.GetAllMoviesByLocation(uid);
            if (movie != null)
            {
                return Ok(movie);
            }
            return BadRequest(" Unable to fetch Movie Details");
        }
        [HttpGet("MovieDetails")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieView>> GetMovieDetails(Guid uid)
        {
            var movie =await _movieService.GetAllMoviesDetailsByMovieUid(uid);
            if (movie != null)
            {
                return Ok(movie);
            }
            return BadRequest(" Unable to fetch Movie Details");
            
        }
        [HttpGet("GetAllLanguages")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieView>> GetAllLanguages()
        {
            var languages = await _movieService.GetAllLanguages();
            if (languages != null)
            {
                return Ok(languages);
            }
            return BadRequest(" Unable to fetch Languages");

        }
        [HttpGet("GetAllGenre")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieView>> GetAllGenres()
        {
            var genres = await _movieService.GetAllGenre();
            if (genres != null)
            {
                return Ok(genres);
            }
            return BadRequest(" Unable to fetch genres");

        }
    }
}
