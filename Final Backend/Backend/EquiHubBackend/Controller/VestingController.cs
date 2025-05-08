// using Microsoft.AspNetCore.Mvc;
// using EquiHubBackend.Models;
// using EquiHubBackend.Services;
// using System.Text.Json;
// [ApiController]
// [Route("api/[controller]")]
// public class VestingController : ControllerBase
// {
//     private readonly VestingService _service;
 
//     public VestingController(VestingService service)
//     {
//         _service = service;
//     }
 
//     [HttpGet("{empId}/{type}")]
//     public async Task<IActionResult> GetVestingData(string empId, string type)
//     {
//         var employees = LoadMockEmployees(); // replace with DB or service call
//         var emp = employees.FirstOrDefault(e => e.EmpId == empId);
 
//         if (emp == null)
//             return NotFound();
 
//         var data = await _service.ProcessAwardsAsync(emp, type);
//         return Ok(data);
//     }
 
// private List<Employee> LoadMockEmployees()
// {
//     var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "db.json");
// var json = System.IO.File.ReadAllText(jsonPath);
//     var employeeData = JsonSerializer.Deserialize<EmployeeListWrapper>(json, new JsonSerializerOptions
//     {
//         PropertyNameCaseInsensitive = true
//     });
//     return employeeData?.Employees ?? new List<Employee>();
// }
 
// // Helper class to match JSON root
// public class EmployeeListWrapper
// {
//     public List<Employee> Employees { get; set; }
// }
// }
using EquiHubBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Globalization; 
using System.Threading.Tasks;
using System.Linq;
namespace EquiHubBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VestingController : ControllerBase
    {
        private readonly VestingService _svc;
 
        public VestingController(VestingService svc)
        {
            _svc = svc;
        }
 
     [HttpGet("{empId}/{type}")]
public async Task<IActionResult> Get(string empId, string type)
{
    try
    {
        var data = await _svc.GetVestingScheduleAsync(empId, type);
        if (!data.Any())
            return NotFound($"No data for empId={empId}, type={type}");
        return Ok(data);
    }
    catch (Exception ex)
    {
        // Log the full exception details
        return StatusCode(500, $"Internal Server Error: {ex.Message} - {ex.InnerException?.Message}");
    }
}
[HttpGet("history/{empId}/{type}")]
public async Task<IActionResult> GetVestingHistory(string empId, string type)
{
    try
    {
        var data = await _svc.GetVestingHistoryAsync(empId,type);
        if (!data.Any())
            return NotFound($"No vesting history found for empId={empId}, type={type}");
        return Ok(data);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal Server Error: {ex.Message}");
    }
}
[HttpGet("schedule/{empId}/{type}")]
public async Task<IActionResult> GetFullVestingScheduleAsync(string empId, string type)
{
    try
    {
        var data = await _svc.GetFullVestingScheduleAsync(empId,type);
        if (!data.Any())
            return NotFound($"No vesting history found for empId={empId}, type={type}");
        return Ok(data);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal Server Error: {ex.Message}");
    }
}
    }
}