using EquityManagement.Models;
using EquityManagement.Services;
using EquiHubBackend.Services;

namespace EquityManagement.Services
{
    public class  NotificationService: INotificationService
    {
        private readonly IDataService _dataService;
        private readonly IFinnhubService _finnhubService;
        private readonly IVestingServices _vestingService;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(
            IDataService dataService,
            IFinnhubService finnhubService,
            IVestingServices vestingService,
            ILogger<NotificationService> logger)
        {
            _dataService = dataService;
            _finnhubService = finnhubService;
            _vestingService = vestingService;
            _logger = logger;
        }

        public async Task<Notify> GetNotificationAsync(string employeeId)
        {
            try
            {
                // Get employee data
                var employee = await _dataService.GetEmployeeByIdAsync(employeeId);
                if (employee == null)
                {
                    _logger.LogWarning("Employee not found with ID: {EmployeeId}", employeeId);
                    return null;
                }

                var response = new Notify
                {
                    EmployeeId = employee.emp_id
                };

                // Get the first symbol from employee's awards (assuming single symbol output)
                var firstSymbol = GetFirstEmployeeSymbol(employee);
                response.Symbol = firstSymbol;

                // Get stock data for the first symbol
                if (!string.IsNullOrEmpty(firstSymbol))
                {
                    await SetStockDataAsync(response, firstSymbol);
                }

                // Get RSU data
                response.RSU = await GetEquityDataAsync(employeeId, "rsu");

                // Get ESOP data
                response.ESOP = await GetEquityDataAsync(employeeId, "esop");

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting dashboard data for employee {EmployeeId}", employeeId);
                throw;
            }
        }

        private string GetFirstEmployeeSymbol(Employee employee)
        {
            if (employee.awards != null)
            {
                foreach (var award in employee.awards)
                {
                    if (award.symbols != null && award.symbols.Any())
                    {
                        return award.symbols.First().symbol;
                    }
                }
            }
            return string.Empty;
        }

        private async Task SetStockDataAsync(Notify response, string symbol)
        {
            try
            {
                var stockQuote = await _finnhubService.GetStockQuoteAsync(symbol);
                if (stockQuote != null)
                {
                    response.PercentChange = Math.Round(((stockQuote.c - stockQuote.pc) / stockQuote.pc) * 100, 2);
                    response.High = stockQuote.h;
                    response.Low = stockQuote.l;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching stock data for symbol {Symbol}", symbol);
                // Set default values if there's an error
                response.PercentChange = 0;
                response.High = 0;
                response.Low = 0;
            }
        }

        private async Task<EquityData> GetEquityDataAsync(string employeeId, string awardType)
        {
            var equityData = new EquityData
            {
                RecentVested = 0,
                DateOfVested = DateTime.Now.ToString("MM/dd/yyyy")
            };

            var sevenDaysAgo = DateTime.Now.AddDays(-7).Date;
            var today = DateTime.Now.Date;

            try
            {
                var vestingSchedule = await _vestingService.GetVestingScheduleAsync(employeeId, awardType);
                
                if (vestingSchedule != null)
                {
                    // Get recent vested items (last 7 days including today)
                    var recentVestedItems = vestingSchedule
                        .Where(v => v.Status == "Completed" && 
                                   DateTime.TryParse(v.VestedDate, out var vestedDate) && 
                                   vestedDate.Date >= sevenDaysAgo && 
                                   vestedDate.Date <= today)
                        .ToList();

                    if (recentVestedItems.Any())
                    {
                        // Sum up recent vested shares
                        equityData.RecentVested = recentVestedItems.Sum(v => v.VestedShares);
                        
                        // Get the most recent vesting date
                        var mostRecentDate = recentVestedItems
                            .Select(v => DateTime.Parse(v.VestedDate))
                            .Max();
                        
                        equityData.DateOfVested = mostRecentDate.ToString("MM/dd/yyyy");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting {AwardType} data for employee {EmployeeId}", awardType, employeeId);
                // Return default values if there's an error
            }

            return equityData;
        }
    }
}
