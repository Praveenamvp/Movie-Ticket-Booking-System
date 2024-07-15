using Models.Entity;
using Models.Models;
using Models.View;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Mapper.Interfaces
{
    public interface IDataLayerMapper
    {
        public Task<Location> FetchLocationsAndMap(DataRow row);
        public Task<Movie> FetchMovieAndMap(DataRow row);
        public Task<ShowTimeView> FetchShowTimeView(DataRow row);
        public Task<UserDetails> FetchUserDetails(DataRow row);



    }
}
