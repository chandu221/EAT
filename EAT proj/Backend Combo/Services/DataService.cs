// Services/DataService.cs
using System.Text.Json;
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public class DataService : IDataService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<DataService> _logger;

        private string JsonFilePath => Path.Combine(_environment.ContentRootPath, "Data", "db.json");

        public DataService(IWebHostEnvironment environment, ILogger<DataService> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        private async Task<List<Employee>> ReadEmployeesFromFileAsync()
        {
            try
            {
                if (!File.Exists(JsonFilePath))
                {
                    _logger.LogError("db.json file not found at path: {path}", JsonFilePath);
                    return new List<Employee>();
                }

                string jsonData = await File.ReadAllTextAsync(JsonFilePath);
                var employees = JsonSerializer.Deserialize<List<Employee>>(jsonData,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                return employees ?? new List<Employee>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading employees from JSON file");
                return new List<Employee>();
            }
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await ReadEmployeesFromFileAsync();
        }

        public async Task<Employee> GetEmployeeByEmailAsync(string email)
        {
            var employees = await ReadEmployeesFromFileAsync();
            return employees.FirstOrDefault(e => e.email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Employee> GetEmployeeByIdAsync(string id)
        {
            var employees = await ReadEmployeesFromFileAsync();
            return employees.FirstOrDefault(e => e.emp_id == id);
        }
    }
}
