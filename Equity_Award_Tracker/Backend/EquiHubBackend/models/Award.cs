using Newtonsoft.Json;
using System.Collections.Generic;
 
namespace EquiHubBackend.Models
{
    public class Award
    {
        [JsonProperty("type")]
        public string Type { get; set; }   // "rsu" or "esop"
 
        [JsonProperty("symbols")]
        public List<Symbol> Symbols { get; set; }
    }
}