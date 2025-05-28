// // // using Microsoft.ML;
// // // using Microsoft.ML.TimeSeries;
// // // using System.Net.Http.Json;
// // // using System;
// // // using System.Collections.Generic;
// // // using System.Linq;
// // // using System.Threading.Tasks;
// // // using System.Net.Http;
// // // using EquityManagement.Models;
// // // namespace EquityManagement.Services
// // // {

// // // public class AnomolyService:IAnomolyService{
// // //     private readonly MLContext _mlcontext;
// // //     private  readonly HttpClient _http;
// // //     public AnomolyService(HttpClient http, MLContext mlcontext)
// // //     {
// // //         _http = http;
// // //         _mlcontext = mlcontext;
// // //     }
// // //     public async Task<List<(DateTime,bool)>>DetectSpikeAsync(string symbol)
// // //     {
// // //         var url=$"https://finnhub.io/api/v1/stock/candle?symbol={symbol}&resolution=D&from={DateTimeOffset.UtcNow.AddDays(-60).ToUnixTimeSeconds()}&to={DateTimeOffset.UtcNow.ToUnixTimeSeconds()}&token=d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0";
// // //         var candle=await http.GetFromJsonAsync<CandleResponse>(url);
// // //         var prices=new List<DailyPrice>();
// // //         for(int i=0;i<candle.t.Length;i++)
// // //         {
// // //             prices.Add(new DailyPrice
// // //             {
// // //                 Date=DateTimeOffset.FromUnixTimeSeconds(candle.t[i]).DateTime,
// // //                 Price=candle.c[i]
// // //             });
// // //         }
// // //         var data=_mlcontext.Data.LoadFromEnumerable(prices);
// // //         var pipeline=_mlcontext.Transforms.DetectIidSpike(
// // //             outputColumnName:nameof(SpikePrediction.Prediction),
// // //             inputColumnName:nameof(DAilyPrice.Price),
// // //             confidence:95,pvalueHistoryLength:30);

// // //         var model=pipeline.Fit(data);
// // //         var transformed=model.Transfrom(data);
// // //         var preds= _mlcontext.Data.CreateEnumerable<SpikePrediction>(transformed,reuseRowObject:false).ToList();
// // //         var results=prices.Zip(preds,(dp,p)=>(dp.Date,IsSpike:p.Prediction[0]==1)).ToList();
// // //         return results;

    
// // //     }
// // // private class CandleResponse{
// // //     public long[] t {get;set;}
// // //     public float[] c {get;set;}
// // // }
// // // }
// // // }


// // using Microsoft.ML;
// // using Microsoft.ML.TimeSeries;
// // using System;
// // using System.Collections.Generic;
// // using System.Linq;
// // using System.Net.Http;
// // using System.Net.Http.Json;
// // using System.Threading.Tasks;
// // using EquityManagement.Models;
// // using EquityManagement.Services;

// // namespace EquityManagement.Services
// // {
// //     public class AnomalyService : IAnomalyService
// //     {
// //         private readonly MLContext _mlContext;
// //         private readonly HttpClient _http;
 
// //         public AnomalyService(HttpClient http, MLContext mlContext)
// //         {
// //             _http = http;
// //             _mlContext = mlContext;
// //         }
 
// //         public async Task<List<(DateTime Date, bool IsSpike)>> DetectSpikesAsync(string symbol)
// //         {
// //             // 1. Fetch historical prices from Finnhub
// // // var url = $"https://finnhub.io/api/v1/stock/quote?symbol={symbol}&resolution=D"
// // //                     + $"&from={DateTimeOffset.UtcNow.AddDays(-60).ToUnixTimeSeconds()}"
// // //                     + $"&to={DateTimeOffset.UtcNow.ToUnixTimeSeconds()}"
// // //                     + $"&token=d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0";
// // var url = $"https://finnhub.io/api/v1/quote?symbol={symbol}&token=d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0";

// // var response = await _http.GetAsync(url);
// // var content = await response.Content.ReadAsStringAsync();
// // Console.WriteLine($"API Response: {content}"); 

// // response.EnsureSuccessStatusCode();  
// // var candle = await _http.GetFromJsonAsync<CandleResponse>(url);
 
// // var prices = new List<DailyPrice>();
// //  for (int i = 0; i < candle.t.Length; i++)
// // {
// //                 prices.Add(new DailyPrice
// //                 {
// //                     Date = DateTimeOffset.FromUnixTimeSeconds(candle.t[i]).DateTime,
// //                     Price = candle.c[i]
// //                 });
// //             }
 
// //             // 2. Load into IDataView
// //             var data = _mlContext.Data.LoadFromEnumerable(prices);
 
// //             // 3. Create the spike detection pipeline
// //             var pipeline = _mlContext.Transforms.DetectIidSpike(
// //                 outputColumnName: nameof(SpikePrediction.Prediction),
// //                 inputColumnName: nameof(DailyPrice.Price),
// //                 confidence: 0.95,
// //                 pvalueHistoryLength: 30);
 
// //             // 4. Fit and transform
// // var model = pipeline.Fit(data);
// //             var transformed = model.Transform(data);
 
// //             var preds = _mlContext.Data
// //                 .CreateEnumerable<SpikePrediction>(transformed, reuseRowObject: false)
// //                 .ToList();
 
// //             // 5. Map back to dates
// //             var results = prices
// // .Zip(preds, (dp, p) => (dp.Date, IsSpike: p.Prediction[0] == 1))
// //                 .ToList();
 
// //             return results;
// //         }
 
// //         // Private helper for deserializing Finnhub response
// //         private class CandleResponse
// //         {
// //             public long[] t { get; set; }  // timestamps
// //             public float[] c { get; set; } // close prices
// //         }
// //     }
// // }
// using Microsoft.ML;
// using Microsoft.ML.TimeSeries;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Net.Http;
// using System.Net.Http.Json;
// using System.Threading.Tasks;
// using EquityManagement.Models;
// using EquityManagement.Services;

// namespace EquityManagement.Services
// {
//     public class AnomalyService : IAnomalyService
//     {
//         private readonly MLContext _mlContext;
//         private readonly HttpClient _http;

//         public AnomalyService(HttpClient http, MLContext mlContext)
//         {
//             _http = http;
//             _mlContext = mlContext;
//             _http.DefaultRequestHeaders.Add("X-API-Key", "d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0"); // ✅ Ensure API Key is set
//         }

//         public async Task<List<(DateTime Date, bool IsSpike)>> DetectSpikesAsync(string symbol)
//         {
//             // 1️⃣ Fetch real-time quote prices from Finnhub
//             var url = $"https://finnhub.io/api/v1/quote?symbol={symbol}&token=d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0"; // ✅ Using quote API instead of candle
//             Console.WriteLine($"Requesting: {url}");
//             var response = await _http.GetAsync(url);
//             var content = await response.Content.ReadAsStringAsync();
//             Console.WriteLine($"Finnhub API Response: {content}"); // ✅ Debug Log

//             if (!response.IsSuccessStatusCode)
//             {
//                 throw new Exception($"Finnhub API request failed. Status Code: {response.StatusCode}, Response: {content}");
//             }

//             var quote = await response.Content.ReadFromJsonAsync<QuoteResponse>();

//             // 2️⃣ Process data into list format for ML processing
//             var prices = new List<DailyPrice>
//             {
//                 new DailyPrice { Date = DateTime.UtcNow, Price = quote.c } // ✅ Adjusted to use `c` (current price)
//             };

//             // 3️⃣ Load into IDataView for ML processing
//             var data = _mlContext.Data.LoadFromEnumerable(prices);

//             // 4️⃣ Create ML pipeline for spike detection
//             var pipeline = _mlContext.Transforms.DetectIidSpike(
//                 outputColumnName: nameof(SpikePrediction.Prediction),
//                 inputColumnName: nameof(DailyPrice.Price),
//                 confidence: 0.95, // ✅ Fix deprecated integer confidence value
//                 pvalueHistoryLength: 30);

//             // 5️⃣ Train and apply anomaly detection model
//             var model = pipeline.Fit(data);
//             var transformed = model.Transform(data);

//             var preds = _mlContext.Data
//                 .CreateEnumerable<SpikePrediction>(transformed, reuseRowObject: false)
//                 .ToList();

//             // 6️⃣ Map anomaly detection results back to timestamps
//             var results = prices.Zip(preds, (dp, p) => (dp.Date, IsSpike: p.Prediction[0] == 1)).ToList();

//             return results;
//         }

//         // Helper class for deserializing Finnhub quote response
//         private class QuoteResponse
//         {
//             public float c { get; set; }  // ✅ current price (instead of `candle.c`)
//         }
//     }
// }
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using EquityManagement.Models;
using System.IO;
using System.Text.Json;

// using Data;
namespace EquityManagement.Services
{
    public class AnomalyService : IAnomalyService
    {
        private readonly HttpClient _http;
 private const float Threshold = 0.15f; // 15% threshold for anomaly detection
        private readonly IFinnhubService _finnhubService;
        public AnomalyService(HttpClient http, IFinnhubService finnhubService)
        {
            _finnhubService = finnhubService;
        
            _http = http;
        }
 
        public async Task<Anomaly> CheckAnomalyAsync(string emp_Id, string symbol)
        {
            // 1. Load employee data from db.json
var json = File.ReadAllText(Path.Combine("Data", "db.json"));
// _users = JsonConvert.DeserializeObject<List<User>>(json);
         var employees = JsonSerializer.Deserialize<List<Employee>>(json);



           var emp = employees.FirstOrDefault(e => e.emp_id == emp_Id);

            if (emp == null) throw new Exception("Employee not found");
 
            // 2. Find the grant price for this symbol
            var awardSymbol = emp.awards
                .SelectMany(a => a.symbols)
                .FirstOrDefault(s => s.symbol.Equals(symbol, StringComparison.OrdinalIgnoreCase));
            if (awardSymbol == null)
                throw new Exception("Symbol not found for employee");
 
            float grantPrice = (float)awardSymbol.award_price; // ✅ Explicitly cast double to float

 
            // 3. Fetch current quote
var url = $"https://finnhub.io/api/v1/quote?symbol={symbol}&token=d0a5rt1r01qus8rgqhigd0a5rt1r01qus8rgqhj0";
            var quote = await _http.GetFromJsonAsync<QuoteResponse>(url);
 
            // 4. Compute deviation from grant price
            // float deviation = ((quote.c - grantPrice) / grantPrice) * 100;
            double deviation = ((quote.Current - grantPrice) / grantPrice) * 100; // ✅ Use `Current` instead of `c`

            // 5. Anomaly if > ±10%
            bool isAnomaly = Math.Abs(deviation) >= 10;
 
            return new Anomaly
            {
                Symbol = symbol,
                CheckedAt = DateTime.UtcNow,
                GrantPrice = grantPrice,
               CurrentPrice =(float) quote.Current,

                DeviationPercent = (float)Math.Round(deviation, 2),
                // IsAnomaly = isAnomaly
                IsAnomaly = Math.Abs(deviation) > 10
                //  // ✅ Use Math.Abs for anomaly check
                //   if (DeviationPercent > Threshold)
                //     return "Anomaly Detected";
                // else
                //     return "No Anomaly";
    
            };
        }
         
    // public async Task<string> CheckAnomalyAsync(AnomalyInput input)
    // {
    //     if (input == null || string.IsNullOrEmpty(input.Symbol))
    //         return "Invalid input";
 
    //     float currentPrice = await _finnhubService.GetCurrentStockPriceAsync(input.Symbol);
 
    //     Console.WriteLine($"[DEBUG] Current Price: {currentPrice}, Grant Price: {input.GrantPrice}");
 
    //     float difference = Math.Abs(currentPrice - input.GrantPrice);
    //     float deviation = difference / currentPrice;
 
    //     if (deviation > Threshold)
    //         return "Anomaly Detected";
    //     else
    //         return "No Anomaly";
    // }

 
        // Root class for db.json
     public class Root
{
    public List<Employee> Employees { get; set; }  // ✅ Ensure correct type & naming
}

    }
}