// Models/EsopViewModel.cs

namespace EquityManagement.Models

{

    public class EsopViewModel

    {

        public string StockSymbol { get; set; }

        public double CurrentStockPrice { get; set; }

        public double DiscountedPrice { get; set; }

        public int TotalStocksGranted { get; set; }

        public int TotalVestedStocks { get; set; }

        public int RemainingUnvestedStocks { get; set; }

        public double CurrentMarketValue { get; set; }

        public string NextVestingDate { get; set; }

        public string TimeToFullVesting { get; set; }

        public int VestingProgressPercentage { get; set; }

        public int ExercisedStocks { get; set; }

        public int RemainingStocksToExercise { get; set; }

        public TaxRates TaxRates { get; set; }

        public string Username { get; set; }

    }

}
 