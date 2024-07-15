using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using DataLayer.Repositories;
using Mapper.Implemenations;
using Mapper.Interfaces;
using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Implementations
{
    public class ShowTimeService : IShowTimeService
    {
        private readonly IShowTimeRepo _showTimeRepo;
        private readonly IBusinessLayerMapper _businessLayerMapper;

     
        public ShowTimeService(IShowTimeRepo showTimeRepo, IBusinessLayerMapper businessLayerMapper)
        {
            _showTimeRepo=showTimeRepo;
            _businessLayerMapper = businessLayerMapper;

        }
        public async Task<List<DateView>> GetAllDatesByMovie(Guid id)
        {
            var dates = await _showTimeRepo.GetAllDates(id);
            List<DateView> dateViews = new List<DateView>();
            if (dateViews != null)
            {

                foreach (var item in dates)
                {
                    dateViews.Add(item);
                }
            }
            return dateViews;
        }

        public async  Task<List<SeatDetailsView>> GetAllSeatDetails(Guid id)
        {
            var seats=await _showTimeRepo.GetSeatDetails(id);
            List<SeatDetailsView> seatDetailsViews = new List<SeatDetailsView>();
           

                foreach (var item in seats)
                {
                    seatDetailsViews.Add(await _businessLayerMapper.SeatDetailsToSeatDetailsView(item));
                }
            
            return seatDetailsViews;

        }

        public async Task<List<ShowTimeView>> GetShowTimesByMovie(MovieDateRequest movieDate)
        {
            var showTimes = await _showTimeRepo.GetAllShowTImeByMoveiDate(movieDate);
       
            return showTimes;
        }

        public async Task<bool> UpdateAvailableSeats(UpdateShowTimeRequest updateShowTimeRequest)
        {
            var result = await _showTimeRepo.UpdateAvailableSeats(updateShowTimeRequest);
            return result;
        }
    
    }
}
