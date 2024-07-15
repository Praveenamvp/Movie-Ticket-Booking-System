using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using Mapper.Interfaces;
using Models.Models;
using Models.View;


namespace BusinessLayer.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepo _movieRepo;
        private readonly IBusinessLayerMapper _businessLayerMapper;
        private readonly IBlobService _blobService;

        public MovieService(IMovieRepo movieRepo, IBusinessLayerMapper businessLayerMapper,IBlobService blobService)
        {
            _movieRepo = movieRepo;
            _businessLayerMapper = businessLayerMapper;
            _blobService= blobService;
        }

        public async Task<List<GenreView>> GetAllGenre()
        {
            var genres = await _movieRepo.GetAllGenre();
            return genres;
        }

        public async Task<List<LanguageView>> GetAllLanguages()
        {
            var languages = await _movieRepo.GetAllLanguages();
            return languages;
        }

        public async Task<List<MovieView>> GetAllMoviesByLocation(Guid uid)
        {
            var movies =await _movieRepo.GetMovieDetails(uid);
            List<MovieView> movieViews = new List<MovieView>();
            if (movies != null)
            {

                foreach (var item in movies)
                {
                    item.Image =await _blobService.GetBlob(item.Image, "azurelearning-images");
                    movieViews.Add(await _businessLayerMapper.MovieToMovieView(item));
                }
            }
            return movieViews;
        }

        public async Task<MovieView> GetAllMoviesDetailsByMovieUid(Guid uid)
        {
            Movie movies =await  _movieRepo.Get(uid);
            MovieView movieViews = new MovieView();
            if (movies != null)
            {
                movieViews=await _businessLayerMapper.MovieToMovieView(movies);
                
            }
            return movieViews;
        }
    }
}
