using EquityManagement.Models;
using System.Globalization;
 
namespace EquityManagement.Services
{
    public class RsuService : IRsuService
    {
        private readonly IDataService _dataService;
        private readonly IFinnhubService _finnhubService;
        private readonly ILogger<RsuService> _logger;
 
        public RsuService(IDataService dataService, IFinnhubService finnhubService, ILogger<RsuService> logger)
        {
            _dataService = dataService;
            _finnhubService = finnhubService;
            _logger = logger;
        }
 
        public async Task<RsuViewModel> GetRsuDataForEmployeeAsync(string employeeId)
{
    if (string.IsNullOrWhiteSpace(employeeId))
    {
        _logger.LogWarning("Invalid Employee ID provided.");
        return new RsuViewModel();
    }

    try
    {
        var employee = await _dataService.GetEmployeeByIdAsync(employeeId);
        if (employee == null || employee.awards == null)
        {
            _logger.LogWarning("Employee or awards data not found for ID: {EmployeeId}", employeeId);
            return new RsuViewModel();
        }

        return await CalculateRsuInfo(employee);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error retrieving RSU data for employee {EmployeeId}", employeeId);
        return new RsuViewModel(); // Returns empty model instead of throwing
    }
}

public async Task<RsuViewModel> CalculateRsuInfo(Employee employee)
{
    if (employee?.awards == null || !employee.awards.Any())
    {
        _logger.LogWarning("No RSU awards found for employee.");
        return new RsuViewModel();
    }

    var rsuAwards = employee.awards
        .Where(a => string.Equals(a.type, "rsu", StringComparison.OrdinalIgnoreCase))
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
        if (!TryParseDate(award.grant_date, out DateTime grantDate))
        {
            _logger.LogWarning("Invalid grant date format for award.");
            continue;
        }

        var fullVestDate = grantDate.AddYears(4);
        var cliffDate = grantDate.AddYears(1);

        viewModel.Granted += award.granted;

        try
        {
            var stockQuote = await _finnhubService.GetStockQuoteAsync(award.symbol).ConfigureAwait(false);
            decimal stockPrice = (decimal)(stockQuote?.c ?? 0);

            int vestedShares = 0;
            var vestHistory = new List<VestingEvent>();

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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving stock quote for {Symbol}", award.symbol);
        }
    }

    viewModel.VestHistory = viewModel.VestHistory
        .OrderByDescending(v => TryParseDate(v.VestDate, out var date) ? date : DateTime.MinValue)
        .ToList();

    var earliestGrant = rsuAwards
        .Select(a => TryParseDate(a.grant_date, out var d) ? d : DateTime.MaxValue)
        .Min();

    var latestFullVest = rsuAwards
        .Select(a => TryParseDate(a.grant_date, out var d) ? d.AddYears(4) : DateTime.MinValue)
        .Max();

    double totalDays = (latestFullVest - earliestGrant).TotalDays;
    double daysPassed = (now - earliestGrant).TotalDays;

    viewModel.VestingProgressPercentage = Math.Floor(Math.Min(100, (daysPassed / totalDays) * 100));

    var timeRemaining = latestFullVest > now ? latestFullVest - now : TimeSpan.Zero;
    viewModel.TimeToFullVest = $"{timeRemaining.Days / 365} years, {(timeRemaining.Days % 365) / 30} months";

    return viewModel;
}

// TryParse logic for safer parsing
private static bool TryParseDate(string dateString, out DateTime date)
{
    return DateTime.TryParse(dateString, out date);
}

    }
}