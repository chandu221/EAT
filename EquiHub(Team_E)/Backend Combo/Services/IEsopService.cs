// Services/IEsopService.cs
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public interface IEsopService
    {
        Task<EsopViewModel> GetEsopDataForEmployeeAsync(string employeeId);

        Task<double> CalculateTaxAmount(string employeeId, string taxType, int stocksToExercise);
    }
}
