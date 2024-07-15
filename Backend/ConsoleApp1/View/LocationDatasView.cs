using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.View
{
    public  class LocationDatasView
    {
        public Guid UID { get; set; }
        public string? Name { get; set; }

        public Dictionary<Guid,LocationDatasView> LocationChild { get; set; }
    }
}
