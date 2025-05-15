
using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Options;
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public class FinhubService : IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FinhubService> _logger;
        private readonly string _baseUrl;
        private readonly string _apiKey;
 
        public FinhubService(HttpClient httpClient, IOptions<FinhubSettings> settings, ILogger<FinhubService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _baseUrl = settings.Value.BaseUrl;
            _apiKey = settings.Value.ApiKey;
        }
        public async Task<JsonDocument> GetStockAsync(string symbol)
        {
    try
    {
        var url = $"{_baseUrl}/quote?symbol={symbol}&token={_apiKey}";
        _logger.LogDebug("Requesting URL: {Url}", url);

        var response = await _httpClient.GetAsync(url);

        if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
        {
            _logger.LogError("Unauthorized access. Check your API key.");
            throw new UnauthorizedAccessException("Invalid API key.");
        }

        response.EnsureSuccessStatusCode();

        var contentStream = await response.Content.ReadAsStreamAsync();
        return await JsonDocument.ParseAsync(contentStream);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error fetching stock quote for symbol: {Symbol}", symbol);
        throw;
    }
 }
 
    }
}