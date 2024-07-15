using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.View
{
    public class SeatDetailsView
    {
        public Guid UID { get; set; }
        public Guid ShowTimeID {  get; set; }
        public int SeatNumber { get; set; }
        public bool IsAvailable { get; set;}
    }
}
