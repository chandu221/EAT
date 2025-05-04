using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmployeeStockApi.Models;
using EmployeeStockApi.Services;

namespace EmployeeStockApi.Controllers
{
   [ApiController]
    [Route("api/[controller]")]
    public class RsuController : ControllerBase
    {
        private readonly EmployeeDataService _employeeService;
        private readonly RsuService _rsuService;

        public RsuController(EmployeeDataService employeeService, RsuService rsuService)
        {
            _employeeService = employeeService;
            _rsuService = rsuService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var employee = _employeeService.ValidateCredentials(request.Email, request.Password);
            
            if (employee == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            
            return Ok(new 
            { 
                employee.EmpId,
                employee.Name,
                employee.Email
            });
        }

        [HttpGet("{emp_id}")]
        public IActionResult GetRsuInfo(string emp_id)
        {
            var employee = _employeeService.GetEmployeeByEmpId(emp_id);
            
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }
            
            var rsuInfo = _rsuService.CalculateRsuInfo(employee);
            
            return Ok(rsuInfo);
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}




