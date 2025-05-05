// Services/IEsopService.cs
using EquityManagement.Models;
using System.Threading.Tasks;

namespace EquityManagement.Services
{
    public interface IRsuService
    {
        Task<RsuViewModel> CalculateRsuInfo(Employee employee);
    }
}