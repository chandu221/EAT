

namespace EquityManagement.Models
{
   public class RsuViewModel
    {
        public int Granted { get; set; }
        public int Vested { get; set; }
        public int Unvested { get; set; }
        public double CurrentValue { get; set; }
        public string NextVestingDate { get; set; }
        public double VestingProgressPercentage { get; set; }
        public List<VestingEvent> VestHistory { get; set; } = new List<VestingEvent>();
        public string TimeToFullVest { get; set; }
    }

    public class VestingEvent
    {
        public string VestDate { get; set; }
        public int SharesVested { get; set; }
        public double ValueAtVest { get; set; }
    }
}



