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
            string filePath = "C:/Users/navachandu.n/Documents/5_02_25/EmployeeStockApi/db.json"; // Ensure this file exists in your project directory

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

        public Employee? GetEmployeeByEmail(string email)
        {
            return _employees.FirstOrDefault(e => e.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }

        public Employee? ValidateCredentials(string email, string password)
        {
            return _employees.FirstOrDefault(e => 
                e.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && 
                e.Pwd == password);
        }
    }
}
