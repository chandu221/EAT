// Controllers/EsopController.cs
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Services;
 
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EsopController : ControllerBase
    {
        private readonly IEsopService _esopService;
        private readonly ILogger<EsopController> _logger;
 
        public EsopController(IEsopService esopService, ILogger<EsopController> logger)
        {
            _esopService = esopService;
            _logger = logger;
        }
 
        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEsopData(string employeeId)
        {
            try
            {
                var esopData = await _esopService.GetEsopDataForEmployeeAsync(employeeId);
                if (esopData == null)
                {
                    return NotFound($"No ESOP data found for employee with ID: {employeeId}");
                }
 
                return Ok(esopData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ESOP data for employee {EmployeeId}", employeeId);
                return StatusCode(500, "An error occurred while retrieving ESOP data");
            }
        }
 
        [HttpGet("calculate-tax")]
        public async Task<IActionResult> CalculateTax(string employeeId, string taxType, int stocksToExercise)
        {
            try
            {
                if (string.IsNullOrEmpty(taxType))
                {
                    return BadRequest("Tax type is required");
                }
 
                var taxAmount = await _esopService.CalculateTaxAmount(employeeId, taxType, stocksToExercise);
                return Ok(new { taxAmount });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating tax for employee {EmployeeId}", employeeId);
                return StatusCode(500, "An error occurred while calculating tax");
            }
        }
    }
}