using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using Mapper.Interfaces;
using Models.Models;
using Models.View;
using System.Collections.Generic;


namespace BusinessLayer.Implementations
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locationRepo;
        private readonly IBusinessLayerMapper _businessLayerMapper;

        public LocationService(ILocationRepo locationRepo, IBusinessLayerMapper businessLayerMapper)
        {
            _locationRepo = locationRepo;
            _businessLayerMapper = businessLayerMapper;
        }
       
        public async  Task<List<LocationsView>> GetAllLocations()
        {
          var locations=await _locationRepo.GetAll();
            List<LocationsView> locationsView = new List<LocationsView>();
            locations = locations.Where(location => location.ParentLocationID == null).ToList();
            LocationsView locationView;
            foreach (var location in locations)
            {
                locationView = await _businessLayerMapper.LocationToLocationsView(location);
                locationsView.Add(await GetAllLocationsChild(locationView));
            }
            return locationsView;
        }
        public async Task<LocationsView> GetAllLocationsChild(LocationsView locationView)
        {
            var locations = await _locationRepo.GetAll();
            List<Location>? parents;
            if (locations != null)
            {
                parents = locations.Where(location => location.ParentLocationID == locationView.UID).ToList();

                if (parents.Count <= 0)
                    return locationView;
                LocationsView childData;
                locationView.LocationChild = new List<LocationsView>();
                foreach (var item in parents)
                {
                    childData = await _businessLayerMapper.LocationToLocationsView(item);
                    var child = await GetAllLocationsChild(childData);

                    if (child != null)
                        locationView.LocationChild.Add(child);
                }
            }
            return locationView;
        }
        public async Task<Dictionary<Guid, LocationDatasView>> GetAllLocationsDictionary()
        {
            var locations = await _locationRepo.GetAll();
            //List<Dictionary<Guid, LocationDatasView>> listData = new List<Dictionary<Guid, LocationDatasView>>();
            Dictionary<Guid, LocationDatasView> dictionaryData = new Dictionary<Guid, LocationDatasView>();
            locations = locations.Where(location => location.ParentLocationID == null).ToList();
            foreach (var location in locations)
            {
                LocationDatasView locationView = await _businessLayerMapper.LocationToLocationDatasView(location);
                var child =await GetAllLocationsDataChild(locationView);
           
                dictionaryData.Add(child.UID, child);
            }

            return dictionaryData;
        }


        public async Task<LocationDatasView> GetAllLocationsDataChild(LocationDatasView locationView)
        {
            var locations = await _locationRepo.GetAll();
            List<Location>? parents;

            if (locations != null)
            {
                parents = locations.Where(location => location.ParentLocationID == locationView.UID).ToList();

                if (parents.Count <= 0)
                    return locationView;
                LocationDatasView player;
                locationView.LocationChild = new Dictionary<Guid,LocationDatasView>();
                foreach (var item in parents)
                {
                    player = await _businessLayerMapper.LocationToLocationDatasView(item);
                    var child = await GetAllLocationsDataChild(player);

                    if (child != null)
                        locationView.LocationChild.Add(item.UID,child);
                }
            }
            return locationView;
        }



    }
}
