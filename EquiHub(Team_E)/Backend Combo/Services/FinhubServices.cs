using EquityManagement.Models;
using Microsoft.Extensions.Options;
using System.Text.Json;
using Newtonsoft.Json.Linq;


namespace EquityManagement.Services
{
    public class FinhubService :IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<FinhubSettings> _settings;
        private readonly ILogger<FinhubService> _logger;
        private readonly IConfiguration _configuration;


        public FinhubService(
            HttpClient httpClient,
            IOptions<FinhubSettings> settings,
            ILogger<FinhubService> logger,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _settings = settings;
            _logger = logger;
            _configuration = configuration;
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
public async Task<float> GetCurrentStockPriceAsync(string symbol)
    {
        string apiKey = _configuration["Finnhub:ApiKey"];
string url = $"https://finnhub.io/api/v1/quote?symbol={symbol}&token={apiKey}";
 
        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode)
            return 0;
 
        var content = await response.Content.ReadAsStringAsync();
        var json = JObject.Parse(content);
        return json["c"]?.Value<float>() ?? 0; // 'c' is current price
    }

    }
}
