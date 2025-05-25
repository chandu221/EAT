// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Models;
using EquityManagement.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
  
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;
        private readonly string _jwtKey = "ThisIsASuperSecureKey123456789!!";
 
        public AuthController(IDataService dataService, ILogger<AuthController> logger, IAuthService authService)
        {
            _dataService = dataService;
            _logger = logger;
            _authService = authService;
        }
 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                {
                    return BadRequest("Email and password are required");
                }
 
                var employee = await _dataService.GetEmployeeByEmailAsync(request.Email);
                if (employee == null || employee.pwd != request.Password)
                {
                    return Unauthorized("Invalid email or password");
                }
 
                // In a real application, you would generate a JWT token here
                // For simplicity, we're just returning the employee ID
                return Ok(new { employeeId = employee.emp_id, name = employee.name });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, "An error occurred during login");
            }
        }
        [HttpPost("Auth")]

        public IActionResult Auth([FromBody] LoginRequest request)

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

                expires: DateTime.Now.AddMinutes(2),

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