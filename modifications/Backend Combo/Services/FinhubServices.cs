using EquityManagement.Models;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace EquityManagement.Services
{
    public class FinhubService :IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<FinhubSettings> _settings;
        private readonly ILogger<FinhubService> _logger;

        public FinhubService(
            HttpClient httpClient,
            IOptions<FinhubSettings> settings,
            ILogger<FinhubService> logger)
        {
            _httpClient = httpClient;
            _settings = settings;
            _logger = logger;
        }

       public async Task<JsonDocument?> GetStockAsync(string symbol)
{
    try
    {
        // Check if settings are valid
        if (string.IsNullOrEmpty(_settings.Value.BaseUrl))
        {
            _logger.LogError("Finnhub BaseUrl is not configured");
            throw new InvalidOperationException("Finnhub BaseUrl is not configured");
        }

        if (string.IsNullOrEmpty(_settings.Value.ApiKey))
        {
            _logger.LogError("Finnhub ApiKey is not configured");
            throw new InvalidOperationException("Finnhub ApiKey is not configured");
        }

        // Ensure the BaseUrl is properly formatted
        string baseUrl = _settings.Value.BaseUrl;
        if (!baseUrl.StartsWith("http://") && !baseUrl.StartsWith("https://"))
        {
            baseUrl = "https://" + baseUrl;
        }

        // Remove trailing slash if present
        baseUrl = baseUrl.TrimEnd('/');

        // Build the complete URL
        string requestUrl = $"{baseUrl}/quote?symbol={symbol}&token={_settings.Value.ApiKey}";
        _logger.LogInformation("Requesting stock data from: {Url}", requestUrl);
        
        var response = await _httpClient.GetAsync(requestUrl);
        response.EnsureSuccessStatusCode();
        
        var stream = await response.Content.ReadAsStreamAsync();
        return await JsonDocument.ParseAsync(stream);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error fetching stock quote for symbol: {Symbol}", symbol);
        throw;
    }
}

    }
}
