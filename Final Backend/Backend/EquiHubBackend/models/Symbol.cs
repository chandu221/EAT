using Newtonsoft.Json;
using System;
 
namespace EquiHubBackend.Models
{
    public class Symbol
    {
        [JsonProperty("symbol")]
        public string Ticker { get; set; }
 
        [JsonProperty("award_price")]
        public decimal AwardPrice { get; set; }
 
        [JsonProperty("discounted_price")]
        public decimal? DiscountedPrice { get; set; }
 
        [JsonProperty("granted")]
        public int Granted { get; set; }
 
        [JsonProperty("grant_date")]
        public DateTime GrantDate { get; set; }
 
        [JsonProperty("exercisable")]
        public int? Exercisable { get; set; }
    }
}