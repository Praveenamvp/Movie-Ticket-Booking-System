using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using Mapper.Interfaces;
using Models.Models;
using Models.Request;


namespace BusinessLayer.Implementations
{
    public class BookingService:IBookingService
    {
        private readonly IBusinessLayerMapper _businessLayerMapper;
        private readonly IBookingRepo _bookingRepo;

        public BookingService(IBusinessLayerMapper businessLayerMapper,IBookingRepo bookingRepo) {
            _businessLayerMapper = businessLayerMapper;
            _bookingRepo = bookingRepo;
        }

        public async Task<bool> Add(BookingRequest bookingRequest)
        {

           Booking booking=await _businessLayerMapper.BookingRequestToBooking(bookingRequest);

            if (await _bookingRepo.Add(booking))
            {
                return true;
            }
            return false;
            


        }
    }
}
