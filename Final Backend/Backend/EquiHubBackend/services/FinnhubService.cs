// using System.Net.Http.Json;
//  namespace EquiHubBackend.Services
//  {
    
 
// public class FinnhubService
// {
//     private readonly HttpClient _httpClient;
//     private readonly IConfiguration _config;
 
//     public FinnhubService(HttpClient httpClient, IConfiguration config)
//     {
//         _httpClient = httpClient;
//         _config = config;
//     }
 
//     public async Task<double> GetLatestPrice(string symbol)
//     {
//         string baseUrl = _config["Finnhub:BaseUrl"];
//         string apiKey = _config["Finnhub:ApiKey"];
//         var url = $"{baseUrl}/quote?symbol={symbol}&token={apiKey}";
 
//         var data = await _httpClient.GetFromJsonAsync<FinnhubResponse>(url);
//         return data?.C ?? 0;
//     }
 
//     private class FinnhubResponse
//     {
//         public double C { get; set; }
//     }
// }
// }
using Newtonsoft.Json.Linq;
namespace EquiHubBackend.Services
{
    public class FinnhubService
    {
        private readonly HttpClient _http;
        private readonly string     _baseUrl;
 
        public FinnhubService(HttpClient http, IConfiguration cfg)
        {
            _http    = http;                             // injected via AddHttpClient<T>
_baseUrl = cfg["MockApi:BaseUrl"]!; // e.g. https://localhost:5070
        }
 
        public async Task<decimal> GetCurrentPriceAsync(string symbol)
        {
            var resp = await _http.GetAsync($"/api/Finnhub/quote?symbol={symbol}");
            resp.EnsureSuccessStatusCode();
            var json = await resp.Content.ReadAsStringAsync();
            var obj  = JObject.Parse(json);
            return obj["c"]?.Value<decimal>() ?? 0m;
        }
    }
}