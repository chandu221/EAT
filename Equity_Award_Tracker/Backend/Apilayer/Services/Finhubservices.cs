// using System.Net.Http;
// using System.Net.Http.Json;
// using Microsoft.Extensions.Logging;
// using Microsoft.Extensions.Configuration;
// using ExternalApiMock.Models;
 
// namespace ExternalApiMock.Services;
 
// public class ExternalApiService : IExternalApiService
// {
//     private readonly HttpClient _httpClient;
//     private readonly ILogger<ExternalApiService> _logger;
//     private readonly string _baseUrl;
//     private readonly string _apiToken;
 
//     public ExternalApiService(
//         HttpClient httpClient,
//         ILogger<ExternalApiService> logger,
//         IConfiguration configuration)
//     {
//         _httpClient = httpClient;
//         _logger = logger;
//         _baseUrl = configuration["Finhub:BaseUrl"] ?? throw new ArgumentNullException("Finhub:BaseUrl");
//         _apiToken = configuration["Finhub:ApiToken"] ?? throw new ArgumentNullException("Finhub:ApiToken");
//     }
 
//     public async Task<QuoteResponse?> GetQuoteAsync(string symbol)
//     {
//         var url = $"{_baseUrl}quote?symbol={symbol}&token={_apiToken}";
//         _logger.LogInformation("Fetching real‑time quote for {Symbol}", symbol);
 
//         try
//         {
// // uses System.Net.Http.Json extension
//             var quote = await _httpClient.GetFromJsonAsync<QuoteResponse>(url);
//             if (quote == null)
//             {
//                 _logger.LogWarning("Empty response for symbol {Symbol}", symbol);
//             }
//             return quote;
//         }
//         catch (HttpRequestException ex)
//         {
//             _logger.LogError(ex, "HTTP error while fetching quote for {Symbol}", symbol);
//             throw;
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Unexpected error while fetching quote for {Symbol}", symbol);
//             throw;
//         }
//     }
// }
using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Options;
 using FinhubApiLayer.Models;
namespace FinhubApiLayer.Services
{
    public class FinnhubService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FinnhubService> _logger;
        private readonly string _baseUrl;
        private readonly string _apiKey;
 
        public FinnhubService(HttpClient httpClient, IOptions<FinnhubSettings> settings, ILogger<FinnhubService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _baseUrl = settings.Value.BaseUrl;
            _apiKey = settings.Value.ApiKey;
        }
        public async Task<JsonDocument> GetStockQuoteAsync(string symbol)
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
 
//         public async Task<JsonDocument> GetStockQuoteAsync(string symbol)
//         {
//             try
//             {
//                 var url = $"{_baseUrl}/quote?symbol={symbol}&token={_apiKey}";
//                 var response = await _httpClient.GetAsync(url);
//                 response.EnsureSuccessStatusCode();
 
//                 var contentStream = await response.Content.ReadAsStreamAsync();
//                 return await JsonDocument.ParseAsync(contentStream);
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Error fetching stock quote for symbol: {Symbol}", symbol);
//                 throw;
//             }
//         }
    }
}