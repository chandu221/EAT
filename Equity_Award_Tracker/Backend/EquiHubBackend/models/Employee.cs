using Newtonsoft.Json;
using System.Collections.Generic;
 
namespace EquiHubBackend.Models
{
    public class Employee
    {
        [JsonProperty("empid")]
        public string EmpId { get; set; }
 
        [JsonProperty("name")]
        public string Name { get; set; }
 
        [JsonProperty("email")]
        public string Email { get; set; }
 
        [JsonProperty("pwd")]
        public string Password { get; set; }
 
        [JsonProperty("taxes")]
        public Tax Taxes { get; set; }
 
        [JsonProperty("awards")]
        public List<Award> Awards { get; set; }
    }
}