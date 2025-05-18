using System.Text.Json.Serialization;
 
namespace EquityManagement.Models{
 
public class QuoteResponse
{
    [JsonPropertyName("c")] public double Current { get; set; }
    [JsonPropertyName("d")] public double Change { get; set; }
    [JsonPropertyName("dp")] public double PercentChange { get; set; }
    [JsonPropertyName("h")] public double High { get; set; }
    [JsonPropertyName("l")] public double Low { get; set; }
    [JsonPropertyName("o")] public double Open { get; set; }
    [JsonPropertyName("pc")] public double PreviousClose { get; set; }
}
}