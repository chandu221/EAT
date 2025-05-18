
// Controllers/StockController.cs

using Microsoft.AspNetCore.Mvc;

using EquityManagement.Services;
 
namespace EquityManagement.Controllers

{

    [ApiController]

    [Route("api/[controller]")]

    public class StockController : ControllerBase

    {

        private readonly IFinnhubService _finnhubService;

        private readonly ILogger<StockController> _logger;
 
        public StockController(IFinnhubService finnhubService, ILogger<StockController> logger)

        {

            _finnhubService = finnhubService;

            _logger = logger;

        }

        [HttpGet("quote")]
        public async Task<IActionResult> GetStockQuote(string symbol)
        {
            try
            {
                if (string.IsNullOrEmpty(symbol))
                {
                    return BadRequest("Stock symbol is required");
                }

                var quote = await _finnhubService.GetStockQuoteAsync(symbol);
                return Ok(quote);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving stock quote for {Symbol}", symbol);
                return StatusCode(500, "An error occurred while retrieving stock quote");
            }
        }

    }

}
 