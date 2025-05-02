using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeStockApi.Models;

namespace EmployeeStockApi.Services
{
    public class RsuService
    {
        // Mock current stock price - in a real app, you'd fetch this from a financial API
        private readonly Dictionary<string, decimal> _currentStockPrices = new()
        {
            { "SCHW", 85.50m }
        };

        public RsuInfo CalculateRsuInfo(Employee employee)
        {
            var rsuAwards = employee.Awards
                .Where(a => a.Type.Equals("rsu", StringComparison.OrdinalIgnoreCase))
                .SelectMany(a => a.Symbols)
                .ToList();

            if (!rsuAwards.Any())
            {
                return new RsuInfo();
            }

            var rsuInfo = new RsuInfo();
            var now = DateTime.Now;
            
            foreach (var award in rsuAwards)
            {
                // Assuming a standard 4-year vesting schedule with 1-year cliff and quarterly vesting thereafter
                var grantDate = award.GrantDate;
                var fullVestDate = grantDate.AddYears(4);
                var cliffDate = grantDate.AddYears(1);
                
                // Calculate total granted shares
                rsuInfo.Granted += award.Granted;
                
                // Calculate vested shares
                int vestedShares = 0;
                var vestHistory = new List<VestingEvent>();
                
                if (now >= cliffDate)
                {
                    // After cliff, 25% vests
                    vestedShares += (int)(award.Granted * 0.25);
                    
                    vestHistory.Add(new VestingEvent
                    {
                        VestDate = cliffDate,
                        SharesVested = (int)(award.Granted * 0.25),
                        ValueAtVest = GetStockPrice(award.SymbolName) * (int)(award.Granted * 0.25)
                    });
                    
                    // After cliff, calculate quarterly vesting
                    var quarterlyVestAmount = (int)(award.Granted * 0.75 / 12); // Remaining 75% over 12 quarters
                    var currentQuarter = cliffDate;
                    
                    while (currentQuarter.AddMonths(3) <= now && currentQuarter.AddMonths(3) <= fullVestDate)
                    {
                        currentQuarter = currentQuarter.AddMonths(3);
                        vestedShares += quarterlyVestAmount;
                        
                        vestHistory.Add(new VestingEvent
                        {
                            VestDate = currentQuarter,
                            SharesVested = quarterlyVestAmount,
                            ValueAtVest = GetStockPrice(award.SymbolName) * quarterlyVestAmount
                        });
                    }
                    
                    // Calculate next vesting date
                    if (currentQuarter.AddMonths(3) <= fullVestDate)
                    {
                        rsuInfo.NextVestingDate = currentQuarter.AddMonths(3);
                    }
                    else
                    {
                        rsuInfo.NextVestingDate = fullVestDate;
                    }
                }
                else
                {
                    // Before cliff
                    rsuInfo.NextVestingDate = cliffDate;
                }
                
                rsuInfo.Vested += vestedShares;
                rsuInfo.VestHistory.AddRange(vestHistory);
                
                // Calculate unvested shares
                rsuInfo.Unvested += award.Granted - vestedShares;
                
                // Calculate current value based on current stock price
                decimal stockPrice = GetStockPrice(award.SymbolName);
                rsuInfo.CurrentValue += stockPrice * rsuInfo.Vested;
                
                // Calculate vesting progress percentage
                double totalDays = (fullVestDate - grantDate).TotalDays;
                double daysPassed = (now - grantDate).TotalDays;
                double progressPercentage = Math.Min(100, (daysPassed / totalDays) * 100);
                rsuInfo.VestingProgressPercentage = Math.Round(progressPercentage, 2);
                
                // Calculate time to full vest
                rsuInfo.TimeToFullVest = fullVestDate > now 
                    ? fullVestDate - now 
                    : TimeSpan.Zero;
            }
            
            // Sort vest history by date
            rsuInfo.VestHistory = rsuInfo.VestHistory.OrderByDescending(v => v.VestDate).ToList();
            
            return rsuInfo;
        }
        
        private decimal GetStockPrice(string symbol)
        {
            return _currentStockPrices.TryGetValue(symbol, out decimal price) ? price :80.1m;
        }
    }
}


