// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Models;
using EquityManagement.Services;
 
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly ILogger<AuthController> _logger;
 
        public AuthController(IDataService dataService, ILogger<AuthController> logger)
        {
            _dataService = dataService;
            _logger = logger;
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
    }
}