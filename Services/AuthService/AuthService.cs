using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Bookends.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();

            // find the user
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower().Equals(email.ToLower()));

            // no user found
            if (user is null)
            {
                response.Success = false;
                response.Message = "User not found.";
            }
            // wrong password
            else if (VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt) is false)
            {
                response.Success = false;
                response.Message = "Wrong password.";
            }
            // user found and correct password
            else
                response.Data = CreateToken(user);

            return response;
        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            // check for existence
            if (await UserExists(user.Email))
            {
                return new ServiceResponse<int>
                {
                    Success = false,
                    Message = "User already exists."
                };
            }

            // create password hash
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            // store values in user
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // add user to database
            _context.Users?.Add(user);

            // update database
            await _context.SaveChangesAsync();

            // return user id
            return new ServiceResponse<int> {Data = user.Id};
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(user => user.Email.ToLower().Equals(email.ToLower()));
        }
        
        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // generate key
            using var hmac = new HMACSHA512();

            // salt 
            passwordSalt = hmac.Key;

            // hash
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);

            // hash attempted password
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            // compare attempted password to saved password
            return computedHash.SequenceEqual(passwordHash);
        }

        private string CreateToken(User user)
        {
            // create claims
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email)
            };

            // get secret key from config settings
            var key = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            // security credentials
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // create security token
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            // create json web token
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}