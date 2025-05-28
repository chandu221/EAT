
using Microsoft.AspNetCore.Mvc;
using EquityManagement.Services;
 
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinhubController : ControllerBase
    {
        private readonly IExternalApiService _finhubService;

        private readonly ILogger<FinhubController> _logger;
 
        public FinhubController(IExternalApiService finhubService, ILogger<FinhubController> logger)
        {
            _finhubService = finhubService;
            _logger = logger;
        }
 [HttpGet("quote")]
public async Task<IActionResult> GetQuote([FromQuery] string symbol)
{
    if (string.IsNullOrEmpty(symbol))
        return BadRequest("Symbol is required.");
 
    try
    {
        var result = await _finhubService.GetStockAsync(symbol); // Use _finnhubService here
        return Ok(result);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Failed to get stock quote for symbol: {Symbol}", symbol);
        return StatusCode(500, $"Internal error: {ex.Message}");
    }
}

    }
}
