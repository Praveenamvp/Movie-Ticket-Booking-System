using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IMovieService
    {
       public Task<List<MovieView>> GetAllMoviesByLocation(Guid  uid);
       public Task<MovieView>  GetAllMoviesDetailsByMovieUid(Guid uid);
        public Task<List<LanguageView>> GetAllLanguages();
        public Task<List<GenreView>> GetAllGenre();



    }
}
