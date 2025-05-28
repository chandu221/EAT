
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Models;
using EquityManagement.Services;

namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _dashboardService;
        private readonly ILogger<NotificationController> _logger;

        public NotificationController(
            INotificationService dashboardService,
            ILogger<NotificationController> logger)
        {
            _dashboardService = dashboardService;
            _logger = logger;
        }

        /// <summary>
        /// Get employee dashboard data including stock info and equity summary
        /// </summary>
        /// <param name="employeeId">Employee ID</param>
        /// <returns>Employee dashboard data with stock percent change, high, low and RSU/ESOP summary</returns>
        [HttpGet("{employeeId}")]
        public async Task<ActionResult<Notify>> GetEmployeeDashboard(string employeeId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(employeeId))
                {
                    return BadRequest("Employee ID is required");
                }

                var dashboardData = await _dashboardService.GetNotificationAsync(employeeId);

                if (dashboardData == null)
                {
                    return NotFound($"Employee with ID {employeeId} not found");
                }

                return Ok(dashboardData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting dashboard data for employee {EmployeeId}", employeeId);
                return StatusCode(500, "An error occurred while retrieving dashboard data");
            }
        }
    }
}
