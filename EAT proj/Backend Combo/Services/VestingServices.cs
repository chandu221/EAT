using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquityManagement.Models;
using EquityManagement.Services;

namespace EquiHubBackend.Services
{
    public class VestingService:IVestingServices
    {
        private readonly IDataService _dataService;
        private readonly IFinnhubService _finnhubService;

        public VestingService(IDataService dataService, IFinnhubService finnhubService)
        {
            _dataService = dataService;
            _finnhubService = finnhubService;
        }

        public async Task<IEnumerable<VestingScheduleItem>> GetVestingScheduleAsync(string empId, string awardType)
        {
            // Get employee data
            var employee = await _dataService.GetEmployeeByIdAsync(empId);
            if (employee == null)
                return null;

            // Find the award of the specified type
            var award = employee.awards?.FirstOrDefault(a => a.type.ToLower() == awardType.ToLower());
            if (award == null || award.symbols == null || !award.symbols.Any())
                return null;

            var vestingSchedule = new List<VestingScheduleItem>();
            DateTime now = DateTime.Now;

            // Process each symbol in the award
            foreach (var sym in award.symbols)
            {
                // Get current price from Finnhub
                double currentPrice = 0;
                try
                {
                    var stockQuote = await _finnhubService.GetStockQuoteAsync(sym.symbol).ConfigureAwait(false);
                    currentPrice = stockQuote?.c ?? 0;

                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine($"Error fetching price for {sym.symbol}: {ex.Message}");
                    // Use a default or last known price
                    currentPrice = sym.granted; // Fallback to grant price
                }

                // Parse grant date
                DateTime grantDate = DateTime.Parse(sym.grant_date);
                
                // Calculate cliff date (1 year after grant)
                DateTime cliffDate = grantDate.AddYears(1);
                
                // Calculate final vesting date (4 years after grant)
                DateTime finalVestingDate = grantDate.AddYears(4);
                
                // Total shares granted
                int totalShares = sym.granted;
                
                // Calculate vesting schedule
                // Typically: 25% after 1 year cliff, then quarterly vesting for 3 more years
                
                // First cliff vesting (25% after 1 year)
                int sharesVestedAtCliff = (int)(totalShares * 0.25);
                int remainingShares = totalShares - sharesVestedAtCliff;
                
                // Add cliff vesting entry
                if (cliffDate <= now)
                {
                    vestingSchedule.Add(new VestingScheduleItem
                    {
                        EmployeeId = employee.emp_id,
                        EmployeeName = employee.name,
                        AwardType = award.type,
                        Symbol = sym.symbol,
                        AwardPrice = currentPrice,
                        Granted = totalShares,
                        VestDate = sym.grant_date,
                        CliffDate = cliffDate.ToString("yyyy-MM-dd"),
                        FinalVestingDate = finalVestingDate.ToString("yyyy-MM-dd"),
                        VestedDate = cliffDate.ToString("yyyy-MM-dd"),
                        VestedShares = sharesVestedAtCliff,
                        Remaining = remainingShares,
                        CurrentPrice = currentPrice,
                        VestedValue = sharesVestedAtCliff * currentPrice,
                        Status = "Completed"
                    });
                }
                else
                {
                    vestingSchedule.Add(new VestingScheduleItem
                    {
                        EmployeeId = employee.emp_id,
                        EmployeeName = employee.name,
                        AwardType = award.type,
                        Symbol = sym.symbol,
                        AwardPrice = currentPrice,
                        Granted = totalShares,
                        VestDate = sym.grant_date,
                        CliffDate = cliffDate.ToString("yyyy-MM-dd"),
                        FinalVestingDate = finalVestingDate.ToString("yyyy-MM-dd"),
                        VestedDate = cliffDate.ToString("yyyy-MM-dd"),
                        VestedShares = sharesVestedAtCliff,
                        Remaining = remainingShares,
                        CurrentPrice = currentPrice,
                        VestedValue = sharesVestedAtCliff * currentPrice,
                        Status = "Pending"
                    });
                }
                
                // Quarterly vesting for the remaining 3 years (12 quarters)
                int sharesPerQuarter = remainingShares / 12;
                int runningTotal = sharesVestedAtCliff;
                
                for (int i = 0; i < 12; i++)
                {
                    // Calculate quarterly vesting date (3 months after cliff, then every 3 months)
                    DateTime quarterlyVestingDate = cliffDate.AddMonths(3 * (i + 1));
                    
                    // Calculate remaining shares after this vesting
                    runningTotal += sharesPerQuarter;
                    int currentRemaining = totalShares - runningTotal;
                    
                    // Add quarterly vesting entry
                    vestingSchedule.Add(new VestingScheduleItem
                    {
                        EmployeeId = employee.emp_id,
                        EmployeeName = employee.name,
                        AwardType = award.type,
                        Symbol = sym.symbol,
                        AwardPrice = currentPrice,
                        Granted = totalShares,
                        VestDate = sym.grant_date,
                        CliffDate = cliffDate.ToString("yyyy-MM-dd"),
                        FinalVestingDate = finalVestingDate.ToString("yyyy-MM-dd"),
                        VestedDate = quarterlyVestingDate.ToString("yyyy-MM-dd"),
                        VestedShares = sharesPerQuarter,
                        Remaining = currentRemaining,
                        CurrentPrice = currentPrice,
                        VestedValue = sharesPerQuarter * currentPrice,
                        Status = quarterlyVestingDate <= now ? "Completed" : "Pending"
                    });
                }
            }

            return vestingSchedule;
        }
    }
}
