using Microsoft.AspNetCore.Mvc;

using JwtAuthApi.Services;

using JwtAuthApi.Models;

using Microsoft.IdentityModel.Tokens;

using System.Text;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;
 
namespace JwtAuthApi.Controllers

{

    [ApiController]

    [Route("api/[controller]")]

    public class AuthController : ControllerBase

    {

        private readonly AuthService _authService;

        
        private readonly string _jwtKey = "ThisIsASuperSecureKey123456789!!";

 
 
        public AuthController(AuthService authService)

        {

            _authService = authService;

        }
 
        [HttpPost("login")]

        public IActionResult Login([FromBody] LoginRequest request)

        {

            var user = _authService.ValidateUser(request.Email, request.Password);

            if (user == null)

                return Unauthorized("Invalid credentials");
 
            var token = GenerateJwtToken(user);

            return Ok(new { token,user=new{user.name,user.email,user.emp_id} });

        }
 
        private string GenerateJwtToken(User user)

        {

            var claims = new[]

            {

                new Claim(ClaimTypes.Name, user.name),

                new Claim(ClaimTypes.Email, user.email),

                new Claim("emp_id", user.emp_id)

            };
 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                claims: claims,

                expires: DateTime.Now.AddHours(2),

                signingCredentials: creds

            );
 
            return new JwtSecurityTokenHandler().WriteToken(token);

        }

    }
 
    public class LoginRequest

    {

        public string Email { get; set; }

        public string Password { get; set; }

    }

}

 