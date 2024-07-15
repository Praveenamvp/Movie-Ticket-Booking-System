using Models.Models;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface ILocationService
    {
      
         public Task<List<LocationsView>> GetAllLocations();
        //public Task<Dictionary<Guid, string>> GetAllLocationsDictionary();
        public Task<Dictionary<Guid, LocationDatasView>> GetAllLocationsDictionary();
    }
}
