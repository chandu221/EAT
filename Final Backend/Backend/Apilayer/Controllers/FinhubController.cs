//   using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Logging;
// using ExternalApiMock.Services;
// using ExternalApiMock.Models;
 
// namespace ExternalApiMock.Controllers;
 
// [ApiController]
// [Route("api/[controller]")]
// public class ExternalApiController : ControllerBase
// {
//     private readonly IExternalApiService _apiService;
//     private readonly ILogger<ExternalApiController> _logger;
 
//     public ExternalApiController(IExternalApiService apiService, ILogger<ExternalApiController> logger)
//     {
//         _apiService = apiService;
//         _logger = logger;
//     }
 
//     /// <summary>
//     /// Get real‑time stock quote for the given symbol.
//     /// </summary>
//     /// <param name="symbol">Stock symbol (e.g., SCHW, AAPL)</param>
//     [HttpGet("quote")]
//     public async Task<IActionResult> GetQuote([FromQuery] string symbol)
//     {
//         if (string.IsNullOrWhiteSpace(symbol))
//             return BadRequest("The 'symbol' query parameter is required.");
 
//         try
//         {
//             var quote = await _apiService.GetQuoteAsync(symbol);
//             if (quote == null)
//                 return NotFound($"No data found for symbol '{symbol}'.");
//             return Ok(quote);
//         }
//         catch
//         {
//             _logger.LogError("Failed to retrieve quote for {Symbol}", symbol);
//             return StatusCode(500, "An error occurred while fetching the quote.");
//         }
//     }
// }

using Microsoft.AspNetCore.Mvc;
using FinhubApiLayer.Services;
 
namespace FinhubApiLayer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FinnhubController : ControllerBase
    {
        private readonly FinnhubService _finnhubService;
        private readonly ILogger<FinnhubController> _logger;
 
        public FinnhubController(FinnhubService finnhubService, ILogger<FinnhubController> logger)
        {
            _finnhubService = finnhubService;
            _logger = logger;
        }
 [HttpGet("quote")]
public async Task<IActionResult> GetQuote([FromQuery] string symbol)
{
    if (string.IsNullOrEmpty(symbol))
        return BadRequest("Symbol is required.");
 
    try
    {
        var result = await _finnhubService.GetStockQuoteAsync(symbol); // Use _finnhubService here
        return Ok(result);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Failed to get stock quote for symbol: {Symbol}", symbol);
        return StatusCode(500, $"Internal error: {ex.Message}");
    }
}
//  [HttpGet("quote")]
// public async Task<IActionResult> GetQuote([FromQuery] string symbol)
// {
//     if (string.IsNullOrEmpty(symbol))
//         return BadRequest("Symbol is required.");
 
//     try
//     {
//         var result = await _service.GetQuoteAsync(symbol);
//         return Ok(result);
//     }
//     catch (Exception ex)
//     {
//         return StatusCode(500, $"Internal error: {ex.Message}");
//     }
// }
    }
}
//         [HttpGet("quote")]
//         public async Task<IActionResult> GetStockQuote([FromQuery] string symbol)
//         {
//             if (string.IsNullOrWhiteSpace(symbol))
//                 return BadRequest("Symbol is required.");
 
//             try
//             {
//                 var result = await _finnhubService.GetStockQuoteAsync(symbol);
//                 return Ok(result);
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Failed to get stock quote.");
//                 return StatusCode(500, "Internal server error.");
//             }
//         }
//     }
// }