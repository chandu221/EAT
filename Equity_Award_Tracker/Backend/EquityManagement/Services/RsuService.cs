using EquityManagement.Models;
using System.Globalization;

namespace EquityManagement.Services
{
    public class RsuService : IRsuService
    {
        private readonly IDataService _dataService;
        private readonly IFinnhubService _finnhubService;
        private readonly ILogger<RsuService> _logger;

        private readonly Dictionary<string, decimal> _currentStockPrices = new()
        {
            { "SCHW", 83.11m }
        };

        public async Task<RsuViewModel> CalculateRsuInfo(Employee employee)
        {
            var rsuAwards = employee.awards
                .Where(a => a.type.Equals("rsu", StringComparison.OrdinalIgnoreCase))
                .SelectMany(a => a.symbols)
                .ToList();

            if (!rsuAwards.Any())
            {
                return new RsuViewModel();
            }

            var viewModel = new RsuViewModel();
            var now = DateTime.Now;

            foreach (var award in rsuAwards)
            {
                // Parse grant_date (string to DateTime)
                if (!DateTime.TryParse(award.grant_date, out var grantDate))
                    continue;

                var fullVestDate = grantDate.AddYears(4);
                var cliffDate = grantDate.AddYears(1);

                viewModel.Granted += award.granted;

                int vestedShares = 0;
                var vestHistory = new List<VestingEvent>();
                decimal stockPrice = GetStockPrice(award.symbol);

                if (now >= cliffDate)
                {
                    int cliffVesting = (int)(award.granted * 0.25);
                    vestedShares += cliffVesting;

                    vestHistory.Add(new VestingEvent
                    {
                        VestDate = cliffDate.ToString("yyyy-MM-dd"),
                        SharesVested = cliffVesting,
                        ValueAtVest = (double)(stockPrice * cliffVesting)
                    });

                    int quarterlyVestAmount = (int)(award.granted * 0.75 / 12);
                    var currentQuarter = cliffDate;

                    while (currentQuarter.AddMonths(3) <= now && currentQuarter.AddMonths(3) <= fullVestDate)
                    {
                        currentQuarter = currentQuarter.AddMonths(3);
                        vestedShares += quarterlyVestAmount;

                        vestHistory.Add(new VestingEvent
                        {
                            VestDate = currentQuarter.ToString("yyyy-MM-dd"),
                            SharesVested = quarterlyVestAmount,
                            ValueAtVest = (double)(stockPrice * quarterlyVestAmount)
                        });
                    }

                    viewModel.NextVestingDate = currentQuarter.AddMonths(3) <= fullVestDate
                        ? currentQuarter.AddMonths(3).ToString("yyyy-MM-dd")
                        : fullVestDate.ToString("yyyy-MM-dd");
                }
                else
                {
                    viewModel.NextVestingDate = cliffDate.ToString("yyyy-MM-dd");
                }

                viewModel.Vested += vestedShares;
                viewModel.Unvested += award.granted - vestedShares;
                viewModel.CurrentValue += (double)(stockPrice * vestedShares);
                viewModel.VestHistory.AddRange(vestHistory);
            }

            // Final calculations
            viewModel.VestHistory = viewModel.VestHistory
                .OrderByDescending(v => DateTime.Parse(v.VestDate))
                .ToList();

            var earliestGrant = rsuAwards
                .Select(a => DateTime.TryParse(a.grant_date, out var d) ? d : DateTime.MaxValue)
                .Min();

            var latestFullVest = rsuAwards
                .Select(a => DateTime.TryParse(a.grant_date, out var d) ? d.AddYears(4) : DateTime.MinValue)
                .Max();

            double totalDays = (latestFullVest - earliestGrant).TotalDays;
            double daysPassed = (now - earliestGrant).TotalDays;

            viewModel.VestingProgressPercentage = Math.Round(Math.Min(100, (daysPassed / totalDays) * 100), 2);

            var timeRemaining = latestFullVest > now ? latestFullVest - now : TimeSpan.Zero;
            viewModel.TimeToFullVest = $"{timeRemaining.Days / 365} years, {(timeRemaining.Days % 365) / 30} months";

            return viewModel;
        }

        private decimal GetStockPrice(string symbol)
        {
            return _currentStockPrices.TryGetValue(symbol, out var price) ? price : 83.11m;
        }
    }
}
