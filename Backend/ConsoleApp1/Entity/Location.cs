using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class Location
    {
        public Guid UID { get; set; }
        public string? Name { get; set; }
        public Guid? ParentLocationID { get; set; }
    }
}
