
 
// using EquiHubBackend.Models;
// using EquiHubBackend.Services;

// public class VestingService
// {
//     private readonly FinnhubService _finnhub;
 
//     public VestingService(FinnhubService finnhub)
//     {
//         _finnhub = finnhub;
//     }
 
//     public async Task<List<dynamic>> ProcessAwardsAsync(Employee employee, string awardType)
//     {
//         var result = new List<dynamic>();
//         var today = DateTime.UtcNow;
 
//         var filtered = employee.Awards
//             .Where(a => a.Type.Equals(awardType, StringComparison.OrdinalIgnoreCase))
//             .SelectMany(a => a.Symbols);
 
//         foreach (var symbol in filtered)
//         {
//             var cliffDate = symbol.GrantDate.AddYears(1);
//             var vested = 0;
 
//             if (today > cliffDate)
//             {
//                 var monthsSinceCliff = ((today.Year - cliffDate.Year) * 12) + today.Month - cliffDate.Month;
//                 var quarters = monthsSinceCliff / 3;
//                 var totalQuarters = 12; // 3 years vesting
//                 var totalVesting = Math.Min(quarters, totalQuarters) / (double)totalQuarters;
//                 vested = (int)(symbol.Granted * totalVesting);
//             }
 
//             var unvested = symbol.Granted - vested;
//             var marketPrice = await _finnhub.GetLatestPrice(symbol.Symbol);
//             var currentValue = vested * marketPrice;
 
//             result.Add(new
//             {
//                 Symbol = symbol.Symbol,
//                 Type = awardType.ToUpper(),
//                 AwardPrice = symbol.AwardPrice,
//                 Vested = vested,
//                 RemainingUnvested = unvested,
//                 FinalVestingDate = symbol.GrantDate.AddYears(4).ToString("dd/MM/yyyy"),
//                 CurrentValue = (int)currentValue,
//                 Status = "Pending"
//             });
//         }
 
//         return result;
//     }
// }
using EquiHubBackend.Models;
using EquiHubBackend.Utils;
using System.Collections.Generic;
using System.Globalization; 
using System.Threading.Tasks;
using System.Linq;
namespace EquiHubBackend.Services
{
    public class VestingService
    {
        private readonly FinnhubService _finnhub;
 
        public VestingService(FinnhubService finnhub)
        {
            _finnhub = finnhub;
        }
 
        public async Task<List<object>> GetVestingScheduleAsync(string empId, string type)
        {
            // load data
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "db.json");
            var employees = DataLoader.LoadEmployees(path);
            var emp = employees.FirstOrDefault(e => e.EmpId == empId);
            if (emp == null) return new List<object>();
 
var now = DateTime.Today;
            var result = new List<object>();
 
            // find matching awards
            var awards = emp.Awards
                          .Where(a => a.Type.Equals(type, StringComparison.OrdinalIgnoreCase));
 
            foreach (var award in awards)
            foreach (var sym in award.Symbols)
            {
                // 1-year cliff
                var cliff = sym.GrantDate.AddYears(1);
                if (now < cliff) continue;
 
                // quarters passed after cliff
                var months = (now.Year - cliff.Year)*12 + now.Month - cliff.Month;
                var quarters = Math.Min(12, months/3); // cap at 12 quarters
 
                // vested shares
                var vested = (int)Math.Floor(sym.Granted * (quarters/12.0));
 
                // current price
                var price = await _finnhub.GetCurrentPriceAsync(sym.Ticker);
                var value = vested * price;
 
                result.Add(new {
                  
                  EmployeeId    = emp.EmpId,
EmployeeName = emp.Name,
                  AwardType     = award.Type,
                  Symbol        = sym.Ticker,
                  AwardPrice    = sym.AwardPrice,
                  Granted       = sym.Granted,
                  VestDate      = sym.GrantDate.ToString("yyyy-MM-dd"),
                  CliffDate     = cliff.ToString("yyyy-MM-dd"),
                  FinalVestingDate = sym.GrantDate.AddYears(4).ToString("yyyy-MM-dd"),
                  VestedDate    = now.ToString("yyyy-MM-dd"),
                  VestedShares  = vested,
                  Remaining     = sym.Granted - vested,
                  CurrentPrice  = price,
                  VestedValue   = value,
                  Status        = vested==sym.Granted?"Complete":"Pending"
                });
            }
            
            return result;
        }
  public async Task<List<object>> GetVestingHistoryAsync(string empId, string type)
{
    // Load employee data
    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "db.json");
    var employees = DataLoader.LoadEmployees(path);
    var emp = employees.FirstOrDefault(e => e.EmpId == empId);
    if (emp == null) return new List<object>();

    var now = DateTime.Today;
    var result = new List<object>();
    var awards = emp.Awards
                          .Where(a => a.Type.Equals(type, StringComparison.OrdinalIgnoreCase));

    // Iterate through all awards (RSU and ESOP)
    foreach (var award in awards)
    {
        foreach (var sym in award.Symbols)
        {
            // 1-year cliff
            var cliff = sym.GrantDate.AddYears(1);
            if (now < cliff) continue;

            // Calculate vesting details for the last 3 months
            for (int i = 0; i < 3; i++)
            {
                var date = now.AddMonths(-i); // Go back 1 month at a time
                var months = (date.Year - cliff.Year) * 12 + date.Month - cliff.Month;
                var quarters = Math.Min(12, Math.Max(0, months / 3)); // Cap at 12 quarters

                // Vested shares
                var vested = (int)Math.Floor(sym.Granted * (quarters / 12.0));

                // Current price
                var price = await _finnhub.GetCurrentPriceAsync(sym.Ticker);
                var value = vested * price;

                result.Add(new
                {
                    EmployeeId = emp.EmpId,
                    EmployeeName = emp.Name,
                    AwardType = award.Type,
                    Symbol = sym.Ticker,
                    AwardPrice = sym.AwardPrice,
                    Granted = sym.Granted,
                    VestDate = sym.GrantDate.ToString("yyyy-MM-dd"),
                    CliffDate = cliff.ToString("yyyy-MM-dd"),
                    FinalVestingDate = sym.GrantDate.AddYears(4).ToString("yyyy-MM-dd"),
                    VestedDate = date.ToString("yyyy-MM-dd"),
                    VestedShares = vested,
                    Remaining = sym.Granted - vested,
                    CurrentPrice = price,
                    VestedValue = value,
                    Status = vested == sym.Granted ? "Complete" : "Pending"
                });
            }
        }
    }

    return result;
}
public async Task<List<object>> GetFullVestingScheduleAsync(string empId, string type)
{
    // Load employee data
    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "db.json");
    var employees = DataLoader.LoadEmployees(path);
    var emp = employees.FirstOrDefault(e => e.EmpId == empId);
    if (emp == null) return new List<object>();

    var result = new List<object>();
    var awards = emp.Awards.Where(a => a.Type.Equals(type, StringComparison.OrdinalIgnoreCase));

    var now = DateTime.Today;

    foreach (var award in awards)
    {
        foreach (var sym in award.Symbols)
        {
            var grantDate = sym.GrantDate;
            var cliffDate = grantDate.AddYears(1);
            var finalVestingDate = grantDate.AddYears(4);

            var remainingShares = sym.Granted;

            for (var date = cliffDate; date <= finalVestingDate; date = date.AddMonths(3)) // Iterate by quarters
            {
                int vestedShares;

                if (date == cliffDate)
                {
                    // Immediately vest 25% after the cliff
                    vestedShares = (int)Math.Floor(sym.Granted * 0.25);
                }
                else
                {
                    // Vesting 75% over 12 quarters (without accumulating)
                    vestedShares = (int)Math.Floor(sym.Granted * (0.75 / 12.0));
                }

                remainingShares -= vestedShares; // Deduct vested amount per period
                var price = await _finnhub.GetCurrentPriceAsync(sym.Ticker);
                var value = vestedShares * price;

                result.Add(new
                {
                    EmployeeId = emp.EmpId,
                    EmployeeName = emp.Name,
                    AwardType = award.Type,
                    Symbol = sym.Ticker,
                    AwardPrice = sym.AwardPrice,
                    Granted = sym.Granted,
                    VestDate = grantDate.ToString("yyyy-MM-dd"),
                    CliffDate = cliffDate.ToString("yyyy-MM-dd"),
                    FinalVestingDate = finalVestingDate.ToString("yyyy-MM-dd"),
                    VestedDate = date.ToString("yyyy-MM-dd"),
                    VestedShares = vestedShares, // Now only shows vesting for that quarter
                    Remaining = remainingShares,
                    CurrentPrice = price,
                    VestedValue = value,
                    Status = date <= now ? "Completed" : "Pending"
                });
            }
        }
    }

    return result;
}


    }
}