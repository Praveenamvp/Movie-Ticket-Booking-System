using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.View
{
    public class LocationsView
    {
        public Guid UID { get; set; }
        public string? Name { get; set; }

        public List<LocationsView>  LocationChild{ get; set; }
    }
}
