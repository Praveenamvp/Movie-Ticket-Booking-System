using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.View
{
    public class ShowTimeView
    {
        public Guid UID { get; set; }
        public Guid MovieID { get; set; }
        public DateTime StartTime { get; set; }
        public int AvailableSeats { get; set; }
        public string? LocationName { get; set; }
        public bool LikeState { get; set; } 
    }
}
