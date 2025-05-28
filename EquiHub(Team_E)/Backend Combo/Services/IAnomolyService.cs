// using Microsoft.ML;
// using Microsoft.ML.TimeSeries;
// using System.Net.Http.Json;

// namespace EquityManagement.Services
// {
// public interface IAnomalyService
// {
//     Task<List<(DateTime Date, bool IsSpike)>> DetectSpikesAsync(string symbol);

// }
// }
using System.Threading.Tasks;
using EquityManagement.Models;
 
namespace EquityManagement.Services
{
    public interface IAnomalyService
    {
        Task<Anomaly> CheckAnomalyAsync(string empId, string symbol);
    }
}