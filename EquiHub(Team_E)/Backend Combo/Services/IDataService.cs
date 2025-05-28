// Services/IDataService.cs
using EquityManagement.Models;
namespace EquityManagement.Services
{
    public interface IDataService
    {
        Task<List<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeByEmailAsync(string email);
        Task<Employee> GetEmployeeByIdAsync(string id);
    }
}