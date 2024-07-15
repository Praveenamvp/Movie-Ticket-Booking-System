using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class ShowTime
    {
        public Guid UID { get; set; }
        public Guid MovieID { get; set; }
        public Guid LocationID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool LikeState { get; set; } 
        public int AvailableSeats { get; set; } 
    }
}
