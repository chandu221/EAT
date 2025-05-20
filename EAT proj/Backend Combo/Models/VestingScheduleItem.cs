namespace EquityManagement.Models
{
    public class VestingScheduleItem
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string AwardType { get; set; }
        public string Symbol { get; set; }
        public double AwardPrice { get; set; }
        public int Granted { get; set; }
        public string VestDate { get; set; }
        public string CliffDate { get; set; }
        public string FinalVestingDate { get; set; }
        public string VestedDate { get; set; }
        public int VestedShares { get; set; }
        public int Remaining { get; set; }
        public double CurrentPrice { get; set; }
        public double VestedValue { get; set; }
        public string Status { get; set; }
    }
}
