using Models.Entity;
using Models.Models;
using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapper.Interfaces
{
    public interface IBusinessLayerMapper
    {
        public Task<LocationsView> LocationToLocationsView(Location location);
        public Task<LocationDatasView> LocationToLocationDatasView(Location location);
        public Task<MovieView> MovieToMovieView(Movie movie);
        public Task<Booking> BookingRequestToBooking(BookingRequest bookingRequest);
        public Task<SeatDetailsView> SeatDetailsToSeatDetailsView(SeatDetails seatDetails);


    }
}
