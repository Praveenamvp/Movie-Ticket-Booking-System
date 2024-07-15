using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class Booking
    {
        public Guid UID { get; set; }
        public Guid ShowtimeID { get; set; }
        public Guid UserUID { get; set; }
        public DateTime BookingDate { get; set; }
        public int NoOfSeats { get; set; }
        public List<Guid> SeatUIDs { get; set; }
    }
}
