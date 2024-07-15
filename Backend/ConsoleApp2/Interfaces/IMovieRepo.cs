using Models.Models;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Interfaces
{
    public interface IMovieRepo
    {
        public Task<Movie> Get(Guid id);

        public Task<List<Movie>> GetMovieDetails(Guid id);

        public Task<List<LanguageView>> GetAllLanguages();
        public Task<List<GenreView>> GetAllGenre();




    }
}
