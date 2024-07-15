using Models.Entity;
using Models.Models;
using Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Interfaces
{
    public interface IUserRepo
    {
        public Task<bool> Add(UserDetails user);
        public Task<UserDetails> Get(UserRequest userRequest);
        public Task<UserDetails> GetByUID(Guid uid);

    }
}
