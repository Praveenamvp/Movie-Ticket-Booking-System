using Models.DTOs;
using Models.Entity;
using Models.Request;
using Models.View;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IUserService
    {
        public Task<UserDTO> LoginUser(UserRequest userRequest);
        public Task<bool> Add(UserRegisterRequest userRegisterRequest);
        public Task<UserDetails> Get(Guid uid);

    }
}
