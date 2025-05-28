using EquityManagement.Models;
using EquityManagement.Services;
namespace EquityManagement.Models
{
    public class AnomalyInput
    {
        public string Symbol { get; set; }
        public double GrantPrice { get; set; }
        public string EmployeeId { get; set; }
    }
}
