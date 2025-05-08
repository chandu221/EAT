// using System.Collections.Generic;
// namespace EquiHubBackend.Models{
// public class TaxInfo
// {
//     public double FederalTaxRate { get; set; }
//     public double StateTaxRate { get; set; }
//     public double LocalTaxRate { get; set; }
// }
using Newtonsoft.Json;
 
namespace EquiHubBackend.Models
{
    public class Tax
    {
        [JsonProperty("federal_tax_rate")]
        public decimal Federal { get; set; }
 
        [JsonProperty("state_tax_rate")]
        public decimal State { get; set; }
 
        [JsonProperty("local_tax_rate")]
        public decimal Local { get; set; }
    }
}