namespace EquityManagement.Models

{

    public class TaxInfo

    {

        public int federal_tax_rate { get; set; }

        public int state_tax_rate { get; set; }

        public int local_tax_rate { get; set; }

    }
 
    public class User

    {

        public string emp_id { get; set; }

        public string name { get; set; }
        
        public string email { get; set; }
    
        public string pwd { get; set; }

        public TaxInfo taxes { get; set; }

    }

}

 