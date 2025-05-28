using Microsoft.AspNetCore.Mvc;
using EquityManagement.Models;
using System.Collections.Generic;
 
namespace EquityManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssistantController : ControllerBase
    {
        private static readonly Dictionary<string, string> _faq = new()
        {
            ["what is rsu"]     = "RSU (Restricted Stock Unit) is a grant of company shares that vests over time.",
            ["what is esop"]    = "ESOP (Employee Stock Option Plan) allows employees to buy shares at a discounted price.",
            ["help"]            = "You can ask me about RSU, ESOP, anomaly, trend or type 'faq' for a list of commands.",
            ["faq"]             = "Available commands: 'what is rsu', 'what is esop', 'anomaly', 'trend'.",
            ["what is vesting"] = "Vesting is the process by which an employee earns the right to own shares over time.",
            ["what is anomaly"] = "An anomaly is an irregularity in stock price that may indicate a significant event.",
            ["what is trend"]   = "A trend is the general direction in which a stock price is moving over time.",
            ["what is vested stocks"] = "Vested stocks are shares that an employee has earned the right to own, typically after a vesting period.",
            ["what is stock option"] = "A stock option gives an employee the right to buy company shares at a predetermined price.",
            ["what is equity"] = "Equity refers to ownership in a company, represented by shares of stock.",
            ["what is exercise"] = "Exercising a stock option means buying the shares at the agreed price.",
            ["what is strike price"] = "The strike price is the fixed price at which an employee can buy shares under a stock option plan.",
            ["what is vesting schedule"] = "A vesting schedule outlines when an employee earns rights to their granted shares.",
            ["what is cliff"] = "A cliff is the initial period in a vesting schedule before any shares vest.",
            ["what is market cap"] = "Market cap (market capitalization) is the total value of a company's outstanding shares."
        };
 
        [HttpPost("ask")]
        public IActionResult Ask([FromBody] AssistantRequest req)
        {
            var q = req.Message?.Trim().ToLowerInvariant() ?? "";
            if (_faq.TryGetValue(q, out var answer))
                return Ok(new AssistantResponse { Reply = answer });
 
            return Ok(new AssistantResponse { Reply = "Sorry, I don't understand. Try 'faq'." });
        }
    }
}