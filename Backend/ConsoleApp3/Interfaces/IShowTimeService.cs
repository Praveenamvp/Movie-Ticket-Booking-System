using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public  interface IShowTimeService
    {
        public Task<List<DateView>> GetAllDatesByMovie(Guid id);
        public Task<List<ShowTimeView>> GetShowTimesByMovie(MovieDateRequest movieDate);
        public Task<bool> UpdateAvailableSeats(UpdateShowTimeRequest updateShowTimeRequest);
        public Task<List<SeatDetailsView>> GetAllSeatDetails(Guid id);


    }
}
