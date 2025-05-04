using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeStockApi.Models
{
    public class Employee
    {
        public string EmpId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Pwd { get; set; } = string.Empty;
        public TaxInfo Taxes { get; set; } = new TaxInfo();
        public List<Award> Awards { get; set; } = new List<Award>();
    }

    public class TaxInfo
    {
        public int FederalTaxRate { get; set; }
        public int StateTaxRate { get; set; }
        public int LocalTaxRate { get; set; }
    }

    public class Award
    {
        public string Type { get; set; } = string.Empty;
        public List<Symbol> Symbols { get; set; } = new List<Symbol>();
    }

    public class Symbol
    {
        public string SymbolName { get; set; } = string.Empty;
        public decimal AwardPrice { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public int Granted { get; set; }
        public DateTime GrantDate { get; set; }
        public int? Exercisable { get; set; }
    }
}

