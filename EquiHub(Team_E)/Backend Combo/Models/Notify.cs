
namespace EquityManagement.Models
{
    public class Notify
    {
         public string EmployeeId { get; set; }
        public string Symbol { get; set; }
        public double PercentChange { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public EquityData RSU { get; set; } = new EquityData();
        public EquityData ESOP { get; set; } = new EquityData();
    }

    public class EquityData
    {
        public int RecentVested { get; set; }
        public string DateOfVested { get; set; }
    }
}