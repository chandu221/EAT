// Controllers/RsuController.cs
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Services;
using System.Threading.Tasks;

namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RsuController : ControllerBase
    {
        private readonly IRsuService _rsuService;
        private readonly IDataService _dataService;

        public RsuController(IRsuService rsuService, IDataService dataService)
        {
            _rsuService = rsuService;
            _dataService = dataService;
        }

        [HttpGet("{emp_id}")]
        public async Task<IActionResult> GetRsuInfo(string emp_id)
        {
            var employee = await _dataService.GetEmployeeByIdAsync(emp_id);

            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            var rsuInfo = await _rsuService.CalculateRsuInfo(employee);

            return Ok(rsuInfo);
        }
    }
}
