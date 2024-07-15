using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Request
{
    public class UpdateShowTimeRequest
    {
        public int seats {  get; set; }
        public Guid showTimeId { get; set; }
    }
}
