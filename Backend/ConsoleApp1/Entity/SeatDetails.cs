using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entity
{
    public class SeatDetails
    {
        public Guid UID { get; set; }
        public Guid ShowTimeID { get; set; }
        public int SeatNumber { get; set; }
        public bool IsAvailable { get; set; }
    }
}
