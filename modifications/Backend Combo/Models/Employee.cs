// Models/Employee.cs

namespace EquityManagement.Models

{

    public class Employee

    {

        public string emp_id { get; set; }

        public string name { get; set; }

        public string email { get; set; }

        public string pwd { get; set; }

        public TaxRates taxes { get; set; }

        public List<Award> awards { get; set; }

    }
 
    public class TaxRates

    {

        public double federal_tax_rate { get; set; }

        public double state_tax_rate { get; set; }

        public double local_tax_rate { get; set; }

    }
 
    public class Award

    {

        public string type { get; set; } // "rsu" or "esop"

        public List<Symbol> symbols { get; set; }

    }
 
    public class Symbol

    {

        public string symbol { get; set; }

        public double award_price { get; set; }

        public double? discounted_price { get; set; } // Only for ESOP

        public int granted { get; set; }

        public string grant_date { get; set; }

        public int? exercisable { get; set; } // Only for ESOP

    }

}