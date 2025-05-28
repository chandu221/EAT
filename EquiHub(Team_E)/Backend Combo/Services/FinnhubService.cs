using System.Text.Json;
using EquityManagement.Models;
using Microsoft.Extensions.Options;

namespace EquityManagement.Services
{
    public class FinnhubService : IFinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FinhubService> _logger;
        private readonly string _baseUrl = "http://localhost:5010/api/Finhub";

        public FinnhubService(HttpClient httpClient, ILogger<FinhubService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<StockQuote> GetStockQuoteAsync(string symbol)
        {
            try
            {
                // Using the local API from FinhubController
                var response = await _httpClient.GetAsync($"{_baseUrl}/quote?symbol={symbol}");
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
