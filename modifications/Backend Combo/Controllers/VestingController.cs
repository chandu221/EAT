using Microsoft.AspNetCore.Mvc;
using EquiHubBackend.Services;
using EquityManagement.Models;
using EquityManagement.Services;

namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VestingController : ControllerBase
    {
        private readonly IVestingServices _vestingService;
        private readonly IDataService _dataService;

        public VestingController(IVestingServices vestingService, IDataService dataService)
        {
            _vestingService = vestingService;
            _dataService = dataService;
        }

        [HttpGet("schedule/{empId}/{type}")]
        public async Task<IActionResult> GetVestingSchedule(string empId, string type)
        {
            // First check if employee exists
            var employee = await _dataService.GetEmployeeByIdAsync(empId);
            if (employee == null)
            {
                return NotFound($"Employee with ID {empId} not found");
            }

            // Check if employee has the specified award type
            var hasAwardType = employee.awards?.Any(a => a.type.ToLower() == type.ToLower()) ?? false;
            if (!hasAwardType)
            {
                return NotFound($"No {type.ToUpper()} awards found for employee {empId}");
            }

            // Get vesting schedule
            var vestingSchedule = await _vestingService.GetVestingScheduleAsync(empId, type);
            if (vestingSchedule == null || !vestingSchedule.Any())
            {
                return NotFound($"No vesting history found for empId={empId}, type={type}");
            }

            return Ok(vestingSchedule);
        }
    }
}
