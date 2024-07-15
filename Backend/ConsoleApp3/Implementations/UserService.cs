using BusinessLayer.Interfaces;
using DataLayer.Interfaces;
using DataLayer.Repositories;
using Models.DTOs;
using Models.Entity;
using Models.Request;
using System.Security.Cryptography;
using System.Text;


namespace BusinessLayer.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;
        private readonly ITokenGenerate _tokenGenerate;

        public UserService(IUserRepo  userRepo,ITokenGenerate tokenGenerate) {
            _userRepo = userRepo;
            _tokenGenerate= tokenGenerate;
        }
        public async Task<bool> Add(UserRegisterRequest userRegisterRequest)
        {
            UserDetails userdata = new UserDetails();
            userdata.UserName = userRegisterRequest.UserName;
            userdata.PhoneNumber = userRegisterRequest.PhoneNumber;

            userdata.Email = userRegisterRequest.Email;
            var hmac = new HMACSHA512();
            userdata.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userRegisterRequest.Password ?? ""));
            userdata.PasswordKey = hmac.Key;
            if (await _userRepo.Add(userdata))
            {
                return true;
            }
            return false;
        }

        public async Task<UserDetails> Get(Guid uid)
        {
            UserDetails userDetails =await  _userRepo.GetByUID(uid);
            if(userDetails != null)
            {
                return userDetails;
            }
            return null;
        }

        public async  Task<UserDTO> LoginUser(UserRequest userRequest)
        {
            UserDTO userDetails = null;
            bool s = false;
            var userData = await _userRepo.Get(userRequest);
            var hmac = new HMACSHA512(userData.PasswordKey);
            if (userData != null)
            {
                var password = hmac.ComputeHash(Encoding.UTF8.GetBytes(userRequest.Password));
                for (int i = 0; i < password.Length; i++)
                {
                    if (password[i] != userData.PasswordHash[i])
                    {
                        return null;
                    }
                }
            }

          
            
                    userDetails = new UserDTO();
                    userDetails.UID = userData.UID;
                    userDetails.Email = userData.Email;
                     userDetails.Name = userData.UserName;
                     userDetails.PhoneNumber= userData.PhoneNumber;
                    userDetails.Token = await _tokenGenerate.GenerateToken(userDetails.Email);
                    return userDetails;
                
            


            
        }
    }
}
