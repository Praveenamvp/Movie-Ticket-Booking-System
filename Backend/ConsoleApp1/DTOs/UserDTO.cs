﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
    public  class UserDTO
    {
        public Guid UID { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Token { get; set; }
        public string? PhoneNumber { get; set; }



    }
}
