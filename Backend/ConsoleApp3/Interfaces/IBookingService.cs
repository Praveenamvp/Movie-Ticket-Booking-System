using Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IBookingService
    {
        public Task<bool> Add(BookingRequest bookingRequest);
    }
}
