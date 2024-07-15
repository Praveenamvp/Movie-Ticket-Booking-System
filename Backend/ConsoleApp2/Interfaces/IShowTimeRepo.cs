using Models.Entity;
using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Interfaces
{
    public interface IShowTimeRepo
    {
        public Task<List<DateView>> GetAllDates(Guid id);
        public Task<List<ShowTimeView>> GetAllShowTImeByMoveiDate(MovieDateRequest movieDateRequest);
        public Task<bool> UpdateAvailableSeats(UpdateShowTimeRequest updateShowTimeRequest);
        public Task<List<SeatDetails>> GetSeatDetails(Guid id);






    }
}
