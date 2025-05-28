using EquityManagement.Models;

namespace EquityManagement.Services
{
    public interface INotificationService
    {
        Task<Notify> GetNotificationAsync(string employeeId);
    }
}