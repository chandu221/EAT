// Services/FinnhubService.cs
using System.Text.Json;
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public class FinnhubService : IFinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FinnhubService> _logger;

        public FinnhubService(HttpClient httpClient, ILogger<FinnhubService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<StockQuote> GetStockQuoteAsync(string symbol)
        {
            try
            {
                // Using the local API that's already set up
                var response = await _httpClient.GetAsync($"http://localhost:5010/api/Finnhub/quote?symbol={symbol}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var quote = JsonSerializer.Deserialize<StockQuote>(content,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return quote;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching stock quote for {Symbol}", symbol);
                throw;
            }
        }
    }
}