// Services/EsopService.cs
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public class EsopService : IEsopService
    {
        private readonly IDataService _dataService;
        private readonly IFinnhubService _finnhubService;
        private readonly ILogger<EsopService> _logger;

        public EsopService(IDataService dataService, IFinnhubService finnhubService, ILogger<EsopService> logger)
        {
            _dataService = dataService;
            _finnhubService = finnhubService;
            _logger = logger;
        }

        public async Task<EsopViewModel> GetEsopDataForEmployeeAsync(string employeeId)
        {
            try
            {
                var employee = await _dataService.GetEmployeeByIdAsync(employeeId);
                if (employee == null)
                {
                    _logger.LogWarning("Employee not found with ID: {EmployeeId}", employeeId);
                    return null;
                }

                // Find ESOP award
                var esopAward = employee.awards.FirstOrDefault(a => a.type.ToLower() == "esop");
                if (esopAward == null || !esopAward.symbols.Any())
                {
                    _logger.LogWarning("No ESOP award found for employee: {EmployeeId}", employeeId);
                    return null;
                }

                // Assume we're working with the first symbol in the ESOP award
                var symbol = esopAward.symbols.First();
                var stockQuote = await _finnhubService.GetStockQuoteAsync(symbol.symbol);

                // Calculations for vesting
                var grantDate = DateTime.Parse(symbol.grant_date);
                var currentDate = DateTime.Now;
                var vestingPeriod = new TimeSpan(365 * 4, 0, 0, 0); // Assuming 4 years vesting period
                var timeElapsed = currentDate - grantDate;

                // Calculate vesting percentage (25% per year)
                var vestingPercentage = Math.Min(100, (int)Math.Floor((timeElapsed.TotalDays / vestingPeriod.TotalDays) * 100));
                var vestedStocks = (int)Math.Floor(symbol.granted * (vestingPercentage / 100.0));
                var unvestedStocks = symbol.granted - vestedStocks;

                // Calculate next vesting date (assuming quarterly vesting)
                var nextVestingQuarter = (int)Math.Ceiling((currentDate - grantDate).TotalDays / 91.25) * 91.25;
                var nextVestingDate = grantDate.AddDays(nextVestingQuarter);

                // Calculate time to full vesting
                var timeToFullVesting = grantDate.AddDays(vestingPeriod.TotalDays) - currentDate;
                var timeToFullVestingString = timeToFullVesting.TotalDays > 0
                    ? $"{(int)timeToFullVesting.TotalDays / 30} months, {(int)timeToFullVesting.TotalDays % 30} days"
                    : "Fully Vested";

                // Exercisable stocks
                var exercisedStocks = symbol.exercisable.HasValue ?
                    Math.Min(vestedStocks, symbol.exercisable.Value) : 0;
                var remainingToExercise = vestedStocks - exercisedStocks;

                // Current market value calculation
                var currentMarketValue = Math.Round(stockQuote.c * vestedStocks,2);

                return new EsopViewModel
                {
                    StockSymbol = symbol.symbol,
                    CurrentStockPrice = stockQuote.c,
                    DiscountedPrice = Math.Round(stockQuote.c * 0.75, 2),
                    TotalStocksGranted = symbol.granted,
                    TotalVestedStocks = vestedStocks,
                    RemainingUnvestedStocks = unvestedStocks,
                    CurrentMarketValue = currentMarketValue,
                    NextVestingDate = nextVestingDate.ToString("MMM dd, yyyy"),
                    TimeToFullVesting = timeToFullVestingString,
                    VestingProgressPercentage = vestingPercentage,
                    ExercisedStocks = exercisedStocks,
                    RemainingStocksToExercise = remainingToExercise,
                    TaxRates = employee.taxes,
                    Username = employee.name
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ESOP data for employee {EmployeeId}", employeeId);
                throw;
            }
        }

        public async Task<double> CalculateTaxAmount(string employeeId, string taxType, int stocksToExercise)
        {
            var employee = await _dataService.GetEmployeeByIdAsync(employeeId);
            if (employee == null)
                return 0;

            var esopAward = employee.awards.FirstOrDefault(a => a.type.ToLower() == "esop");
            if (esopAward == null || !esopAward.symbols.Any())
                return 0;

            var symbol = esopAward.symbols.First();
            var stockQuote = await _finnhubService.GetStockQuoteAsync(symbol.symbol);

            // Calculate the gain (difference between current price and discounted price)
            var discountedPrice = symbol.discounted_price ?? symbol.award_price;
            var gain = (stockQuote.c - discountedPrice) * stocksToExercise;

            // Apply appropriate tax rate
            double taxRate = taxType.ToLower() switch
            {
                "federal" => employee.taxes.federal_tax_rate / 100,
                "state" => employee.taxes.state_tax_rate / 100,
                "local" => employee.taxes.local_tax_rate / 100,
                "total" => (employee.taxes.federal_tax_rate + employee.taxes.state_tax_rate + employee.taxes.local_tax_rate) / 100,
                _ => 0
            };

            return gain * taxRate;
        }
    }
}
