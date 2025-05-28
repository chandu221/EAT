// using Microsoft.AspNetCore.Mvc;
// using EquityManagement.Services;
// using Microsoft.AspNetCore.Authorization;
// namespace EquityManagement.Controllers
// {
// [ApiController]
// [Route("api/[controller]")]
// [AllowAnonymous]
//  public class AnomolyController:ControllerBase
// {
//     private readonly IAnomalyService _anomolyService;
// public  AnomolyController(IAnomalyService anomolyService)
// {
//     _anomolyService=anomolyService;

// }

// [HttpGet("detect/{symbol}")]
// public async Task<IActionResult>Detect(string symbol)
// {
//     var spikes=await _anomolyService.DetectSpikesAsync(symbol);
//     return Ok(spikes);
// }
// }}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EquityManagement.Models;
using EquityManagement.Services;
using System.IO;
using System;
using Microsoft.Extensions.Logging;
 
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]  // or remove if you want auth
    public class AnomalyController : ControllerBase
    {
        private readonly IAnomalyService _anomalyService;
        private readonly FinhubService _finnhubService;
        private readonly ILogger<AnomalyController> _logger;
        public AnomalyController(IAnomalyService anomalyService,FinhubService finnhubService,ILogger<AnomalyController> logger)
            
        {
            _logger = logger;
            _anomalyService = anomalyService;
            _finnhubService = finnhubService;
        }
 
        // [HttpGet("check/{empId}/{symbol}")]
        // public async Task<IActionResult> Check(string empId, string symbol)
        // {
        //     var result = await _anomalyService.CheckAnomalyAsync(empId, symbol);
        //     //return Ok(result);
        //         return Ok(new { symbol, grantPrice, message = "Anomaly check successful" });
        // }
// [HttpGet("check")]
// public async Task<IActionResult> Check([FromQuery] string empId, [FromQuery] string symbol, [FromQuery] double grantPrice)
// {
//     var result = await _anomalyService.CheckAnomalyAsync(empId, symbol);
//     return Ok(new { symbol, grantPrice, message = "Anomaly check successful" });
// }
 [HttpGet("check/{empId}/{symbol}/{grantPrice}")]
    public async Task<IActionResult> Check(string empId, string symbol, double grantPrice)
    {
        var result = await _anomalyService.CheckAnomalyAsync(empId, symbol);
        return Ok(new { symbol, grantPrice, message = "Anomaly check successful" });
    }
    [HttpPost("check")]
public async Task<IActionResult> CheckAnomaly([FromBody] AnomalyInput input)
{
    var realTimePrice = await _finnhubService.GetCurrentStockPriceAsync(input.Symbol);
 
    if (realTimePrice == 0)
        return BadRequest("Invalid real-time price");
 
    var percentageDiff = Math.Abs(realTimePrice - input.GrantPrice) / realTimePrice * 100;
    //console.WriteLine($"Real-time price: {realTimePrice}, Grant price: {input.GrantPrice}, Percentage difference: {percentageDiff}");
    _logger.LogInformation($"Real-time price: {realTimePrice}, Grant price: {input.GrantPrice}, Percentage difference: {percentageDiff}");
    if (percentageDiff > 10)  // you can change this threshold
        return Ok("Anomaly");
 
    return Ok("Not Anomaly");
}
}

    }
