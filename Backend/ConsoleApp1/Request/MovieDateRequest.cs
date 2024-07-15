using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Request
{
    public class MovieDateRequest
    {
        public Guid MovieUID { get; set; }
        public DateTime date {  get; set; } 
    }
}
