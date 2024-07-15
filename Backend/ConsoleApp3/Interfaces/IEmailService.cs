using Models.Entity;
using Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IEmailService
    {
        public Task<bool> SendEmail(BookingRequest bookingRequest);

    }
}
