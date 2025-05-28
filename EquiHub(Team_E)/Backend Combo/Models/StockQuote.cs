// Models/StockQuote.cs

namespace EquityManagement.Models

{

    public class StockQuote

    {

        public double c { get; set; } // Current price

        public double h { get; set; } // High price of the day

        public double l { get; set; } // Low price of the day

        public double o { get; set; } // Open price of the day

        public double pc { get; set; } // Previous close price

        public double t { get; set; } // Timestamp

    }

}
 