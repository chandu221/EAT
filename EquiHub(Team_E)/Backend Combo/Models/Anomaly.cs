using System;
 
namespace EquityManagement.Models
{
    public class Anomaly
    {
        public string? Symbol { get; set; }
        public DateTime CheckedAt { get; set; }
        public float GrantPrice { get; set; }
        public float CurrentPrice { get; set; }
        public float DeviationPercent { get; set; }
        public bool IsAnomaly { get; set; }
    }
}