using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
    public class ErrorDTO
    {
        public Guid UID { get; set; }
        public string? Message { get; set; }
    }
}
