using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeStockApi.Models
{
   public class RsuInfo
    {
        public int Granted { get; set; }
        public int Vested { get; set; }
        public int Unvested { get; set; }
        public decimal CurrentValue { get; set; }
        public DateTime NextVestingDate { get; set; }
        public double VestingProgressPercentage { get; set; }
        public List<VestingEvent> VestHistory { get; set; } = new List<VestingEvent>();
        public TimeSpan TimeToFullVest { get; set; }
    }

    public class VestingEvent
    {
        public DateTime VestDate { get; set; }
        public int SharesVested { get; set; }
        public decimal ValueAtVest { get; set; }
    }
}



