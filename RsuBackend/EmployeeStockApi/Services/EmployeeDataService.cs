using System.IO;
using System.Text.Json;
using EmployeeStockApi.Models;

namespace EmployeeStockApi.Services
{
    public class EmployeeDataService
    {
        private List<Employee> _employees;

        public EmployeeDataService()
        {
            string filePath = "db.json"; // Ensure this file exists in your project directory

            if (File.Exists(filePath))
            {
                string jsonData = File.ReadAllText(filePath);

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
                };

                _employees = JsonSerializer.Deserialize<List<Employee>>(jsonData, options) ?? new List<Employee>();
            }
            else
            {
                _employees = new List<Employee>();
            }
        }

        public Employee? GetEmployeeByEmpId(string emp_id)
        {
            return _employees.FirstOrDefault(e => e.EmpId.Equals(emp_id, StringComparison.OrdinalIgnoreCase));
        }

        public Employee? ValidateCredentials(string email, string password)
        {
            return _employees.FirstOrDefault(e => 
                e.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && 
                e.Pwd == password);
        }
    }
}
